import './App.css';
import { IconContext } from "react-icons";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
//import Navigation from './components/shared/Navigation/Navigation'
import Wellcome from './screens/guestScreens/Wellcome/Wellcome';
// import Rooms from './pages/Rooms/Rooms';
import Authenticate from './screens/guestScreens/phoneOtpScreen/Authenticate';
// import Activate from './pages/Activate/Activate';
// import userEvent from '@testing-library/user-event';
//import { useSelector } from 'react-redux';
// import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
// import Loader from './components/shared/Loader/Loader';


 const isAuth = false;
 const user = {
   activated: false,
 }; 

function App() {
  return <BrowserRouter>
          <IconContext.Provider value={{ color: "#000", className: "icon" }}>

            <Switch>
              <GuestRoute path="/" exact><Wellcome /></GuestRoute>
              <GuestRoute path="/authenticate"><Authenticate /></GuestRoute>
              {/* <Route path="/register"><Register /></Route> */}

              <GuestRoute path="/activate">Activate </GuestRoute>
              <ProtectedRoute path="/rooms">Rooms</ProtectedRoute>


            </Switch>
            </IconContext.Provider>
         </BrowserRouter>;
}

const GuestRoute = ({ children, ...rest }) =>{
  return(
      <Route {...rest}
      render={({ location }) => {
      return isAuth ? (          
          <Redirect 
          to={{
            pathname: '/rooms',
            state: { from: location },
             }}
             />
        ) : (
          children
        )
      }}
      ></Route>
    );
  }


  const SemiProtectedRoute = ({ children, ...rest }) =>{
      return(
      <Route {...rest}
      render={({ location }) => {
      return !isAuth ? (          
          <Redirect 
          to={{
            pathname: '/',
            state: { from: location },
             }}
             />
        ) : isAuth && !user.activated ? (children) : (          
          <Redirect 
          to={{
            pathname: '/rooms',
            state: { from: location },
             }}
             />
        )
      }}
      ></Route>
    );}
  const ProtectedRoute = ({ children, ...rest }) =>{
        return(
      <Route {...rest}
      render={({ location }) => {
      return !isAuth ? (          
          <Redirect 
          to={{
            pathname: '/',
            state: { from: location },
             }}
             />
        ) : isAuth && !user.activated ?
        (          
          <Redirect 
          to={{
            pathname: '/activate',
            state: { from: location },
             }}
             />
        )
       : (children)
      }}
      ></Route>
    );}


export default App;

