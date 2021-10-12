const otpservice = require("../services/otp-service");
const hashservices = require("../services/hash-services");
const otpService = require("../services/otp-service");
const userServices = require("../services/user-services");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/userDtos");


class Authcontroller {
  async sendOtp(req, res) {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "phone number is required..!" });
    }

    const otp = await otpservice.generateOtp();

    const ttl = 1000 * 60 * 2;
    const expires = Date.now() + ttl;
    const data = `${email}.${otp}.${expires}`;
    // const data = "fhghdydty";
    const hash = await hashservices.hashotp(data);
    // const hash = 'pranav';

     try {
       //await otpService.sendBySms(phone, otp);
        await otpService.sendByEmail(email, otp);
       return res.json({
         hash: `${hash}.${expires}`,
         email,
         otp,
       });
     } catch (err) {
       console.log(err);
       res.status(500).json({ message: "message sending failed" });
     }
    res.json({
      hash: `${hash}.${expires}`,
    });
  }
  async verifyOtp(req, res) {
    const { otp, hash, email } = req.body;
    if (!otp || !hash || !email) {
      res.status(400).json({ message: "All fields are required!" });
    }

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > expires) {
      res.status(400).json({ message: "otp expired..!" });
    }

    const data = `${email}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (isValid) {
      res.status(400).json({ message: "invalid otp..!" });
    }

    let user;

    try {
      user = await userServices.findUser({ email });
      if(!user){
        user = await userServices.createUser({ email })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'database error'})    
    }

     const { accessToken, refreshToken } = tokenService.generateTokens({ 
       _id: user._id,
       activated: false,
     });

     await tokenService.storeRefreshToken(refreshToken, user._id);

     res.cookie( 'refreshToken', refreshToken, {
       maxAge: 1000 * 60 * 60 * 24 * 30,
       httpOnly: true,
     });
     res.cookie( 'accessToken', accessToken, {
       maxAge: 1000 * 60 * 60 * 24 * 30,
       httpOnly: true,
     });



     const userDto = new UserDto(user)

     res.send({ user: userDto, auth: true });

  }
  async refresh(req, res) {
        // get refresh token from cookie
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        // check if token is valid
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(
                refreshTokenFromCookie
            );
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token1' });
        }
        // Check if token is in db
        try {
            const token = await tokenService.findRefreshToken(
                userData._id,
                refreshTokenFromCookie
            );
            if (!token) {
                return res.status(401).json({ message: 'Invalid token2' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        // check if valid user
        const user = await userServices.findUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: 'No user' });
        }
        // Generate new tokens
        const { refreshToken, accessToken } = tokenService.generateTokens({
            _id: userData._id,
        });

        // Update refresh token
        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        // put in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        // response
        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
    }

}

module.exports = new Authcontroller();
