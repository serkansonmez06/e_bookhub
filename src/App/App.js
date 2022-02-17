import HomeComponent from "../Components/HomeComponent";
import "./App.css";
import WelcomeScreen from "../Components/WelcomeScreen";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { logout, login, selectUser } from "../Components/redux/userSlice";
import { useSelector } from "react-redux";
import NavBarComponent from "../Components/NavBarComponent";
import FooterComponent from "../Components/FooterComponent";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //will listen any authentication, if you refresh your page it will
  //store info so you dont need to log in each time when ur page is refresh
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      {!user ? (
        <WelcomeScreen />
      ) : (
        <>
          <NavBarComponent />
          <HomeComponent />
          <FooterComponent />
        </>
      )}
    </div>
  );
}

export default App;
