import React, { useState } from "react";
import styles from "../styles/homeStyle.module.css";
import LoginStyles from "../styles/Login.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { isEmail, isStrongPassword } from "validator";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    {
      name: "",
      email: "",
      password: "",
    },
  );

  const formHandler = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(
      localStorage.getItem(`Qoute-${user.name}`)
    );
    if (user.name && user.email && user.password) {
      if (!isEmail(user.email)) {
        toast.warning("Please enter a valid email");
      }
      if (!isStrongPassword(user.password)) {
        toast.warning(
          "Password should be at least 8 characters long and contain a mix of uppercase, lowercase, numbers, and symbols"
        );
      } else {
        if (storedUser) {
          console.log(storedUser, "user");
          toast.warning("Username not available");
        } else {
          console.log(storedUser, "userElse");
          localStorage.setItem(`Qoute-${user.name}`, JSON.stringify(user));
          toast.success("Account successfully created!");
          setUser({
            name: "",
            email: "",
            password: "",
          });
          navigate("/login");
        }
      }
    } else {
      if (user.name.length <= 4) {
        toast.warning("Name should have more than 4 characters");
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
              type="text"
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
