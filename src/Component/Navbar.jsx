import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action/Action";
import { login } from "../redux/action/Action";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myName = JSON.parse(localStorage.getItem("myName"));
  useEffect(() => {
    const myLogin = JSON.parse(localStorage.getItem("login"));
    if(myName){
      if ( myLogin ) {
        dispatch(login(myName));
      }
      else{
        dispatch(logout());
        navigate("/");
      }
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  },[myName]);
  const logOutHandle = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch(logout());
      navigate("/");
      localStorage.removeItem("myName");
      localStorage.removeItem("login");
    }
  };
  let isLogged = useSelector((state) => state.isLoggedIn);
  const username = useSelector((state) => state.username);
  return (
    <nav>
      <div className={styles.navbar}>
        <div>
          <Link to="/" className={styles.navbarDiv}>
            Home
          </Link>
        </div>
        <div>
          <Link to="/randomQoute" className={styles.navbarDiv}>
            Random Qoute
          </Link>
        </div>
        {isLogged ? (
          <>
            <div>
              <Link to="/user" className={styles.navbarDiv}>
                {username ? username : myName} Qoutes
              </Link>
            </div>
            <div className={styles.navbarID1}>
              <div className={styles.navbarDiv}>
                <CgProfile size={28} />
                {!username
                  ? myName
                  : username.charAt(0).toUpperCase() + username.slice(1)}
              </div>
              <div className={styles.BtnDiv}>
                <button onClick={logOutHandle} className={styles.navbarBtn}>
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="/login" className={styles.navbarDiv}>
                Login
              </Link>
            </div>
            <div>
              <Link to="/signup" className={styles.navbarDiv}>
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
