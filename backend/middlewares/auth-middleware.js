const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;
    //console.log(accessToken);
    if (!accessToken) {
      throw new Error();
    }
    const userData = await tokenService.varifyAccessToken(accessToken);
   // console.log(userData);
    if (!userData) {
      throw new Error();
    }
    req.user = userData;
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
   next();
};
