import React, { useEffect, useState } from "react";
import styles from "../styles/homeStyle.module.css";
import LoginStyles from "../styles/Login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/action/Action";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

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

    if (data && data.email === user.email && data.password === user.password) {
      dispatch(login(username));
      navigate("/user");
      toast.success('Login Successful')
    } else {
      toast.warning('Invalid Login or Password')
    }

    setUser({
      name: "",
      email: "",
      password: "",
    });
    setUserName("");
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
