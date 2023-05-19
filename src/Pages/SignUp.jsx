import React, { useState } from "react";
import styles from "../styles/homeStyle.module.css";
import LoginStyles from "../styles/Login.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [user, setUser] = useState([
    {
      name: "",
      email: "",
      password: "",
    },
  ]);

  const formHandler = (e) => {
    e.preventDefault();
    if (user.name && user.email && user.password) {
      localStorage.setItem(`Qoute-${user.name}`, JSON.stringify(user));
      toast.success("Account successfully created!");
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } else {
      if (user.name.length <= 4) {
        toast.warning("Name should have more than 4 characters");
      } else if (!user.email.includes("@")) {
        toast.warning("Email is invalid");
      } else if (user.password.length <= 5) {
        toast.warning("Password should have more than 5 characters");
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
          <div className={LoginStyles.loginHeading}>Sign up</div>

          <form className={LoginStyles.formBox}>
            <label htmlFor="name" className={LoginStyles.inptLabel}>
              Name
            </label>
            <input
              type="name"
              name="name"
              value={user.name}
              onChange={dataHandler}
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
              value="Sign up"
              onClick={formHandler}
              className={LoginStyles.formBtn}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
