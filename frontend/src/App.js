import './App.css';
import { IconContext } from "react-icons";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
//import Navigation from './components/shared/Navigation/Navigation'
import Wellcome from './screens/Wellcome/Wellcome';
import Home from './screens/Home/Home';
import Chats from './screens/Chats/Chats';
import Authenticate from './screens/AuthSteps/Authenticate/Authenticate';
import ProfileSetup from './screens/AuthSteps/Activate/ProfileSetup/ProfileSetup';
// import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
       import Loader from './components/Loader/Loader';


// const isAuth = true;
// const user = {
//   activated: true,
// }; 

function App() {
  const { loading } = useLoadingWithRefresh();

  return loading ? (
        <Loader message="Loading, please wait.." />
    ) : (<BrowserRouter>
          <IconContext.Provider value={{ color: "#fff", className: "icon" }}>

            <Switch>
              <GuestRoute path="/" exact><Wellcome /></GuestRoute>
              <GuestRoute path="/authenticate"><Authenticate /></GuestRoute>
              {/* <Route path="/register"><Register /></Route> */}

              <SemiProtectedRoute path="/activate"><ProfileSetup /></SemiProtectedRoute>
              <ProtectedRoute path="/Home"><Home /></ProtectedRoute>
              <ProtectedRoute path="/Chats/Users"><Chats /></ProtectedRoute>


            </Switch>
            </IconContext.Provider>
         </BrowserRouter>)
}

const GuestRoute = ({ children, ...rest }) =>{
    const { isAuth } = useSelector((state) => state.auth);
  return(
      <Route {...rest}
      render={({ location }) => {
      return isAuth ? (          
          <Redirect 
          to={{
            pathname: '/Home',
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
         const { isAuth, user } = useSelector((state) => state.auth);
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
            pathname: '/Home',
            state: { from: location },
             }}
             />
        )
      }}
      ></Route>
    );}
  const ProtectedRoute = ({ children, ...rest }) =>{
           const { isAuth, user } = useSelector((state) => state.auth);

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

