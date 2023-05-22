import React, { useEffect, useState } from "react";
import styles from "../styles/homeStyle.module.css";
import LoginStyles from "../styles/Login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/action/Action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
  const [data, setData] = useState({});
  const [username, setUserName] = useState();
  const [user, setUser] = useState([
    {
      email: "",
      password: "",
    },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localLogin = JSON.parse(localStorage.getItem("login"));
  const myName = JSON.parse(localStorage.getItem("myName"));
  useEffect(() => {
    if (localLogin && myName) {
      dispatch(login(myName));
      navigate("/user");
    }
  });

  useEffect(() => {
    let product = localStorage.getItem(`Qoute-${username}`);
    if (product) {
      product = JSON.parse(product);
      setData(product);
    }
  }, [username]);
  const UserHandler = (e) => {
    setUserName(e.target.value);
  };
  const formHandler = (e) => {
    e.preventDefault();
    if (username && user.email && user.password) {
      if (
        data &&
        data.email === user.email &&
        data.password === user.password
      ) {

        dispatch(login(username));
        navigate("/user");
        toast.success("Login Successful");
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("myName", JSON.stringify(username));
        setUser({
          email: "",
          password: "",
        });
        setUserName("");
      } else {
        toast.error("Invalid Login or Password");
      }
    } else {
      if (!username) {
        toast.warning("Please enter a username");
      } else if (!user.email) {
        toast.warning("Please enter an email");
      } else if (!user.password) {
        toast.warning("Please enter a password");
      }
    }
  };
  const dataHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div
        className={styles.main}
        style={{ display: "flex", flexDirection: "column", height: "87vh" }}
      >
        <div className={LoginStyles.loginbox}>
          <div className={LoginStyles.loginHeading}>Login</div>

          <form className={LoginStyles.formBox}>
            <label htmlFor="name" className={LoginStyles.inptLabel}>
              Name
            </label>
            <input
              type="name"
              name="name"
              value={username}
              onChange={UserHandler}
              className={LoginStyles.formInput}
            />
            <label htmlFor="email" className={LoginStyles.inptLabel}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={dataHandler}
              className={LoginStyles.formInput}
            />
            <label htmlFor="password" className={LoginStyles.inptLabel}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={dataHandler}
              className={LoginStyles.formInput}
            />
            <input
              type="submit"
              value="Log In"
              onClick={formHandler}
              className={LoginStyles.formBtn}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
