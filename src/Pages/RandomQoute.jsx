import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/RandomQoute.module.css";
import Loader from "./Loader";
import { SocialIcon } from "react-social-icons";
import { toast } from "react-toastify";

export default function RandomQoute() {
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(true);
  const [qoute, setMyQoute] = useState(true);
  const [num, setNum] = useState("");

  useEffect(() => {
    let randomQouteData = localStorage.getItem("Qoutations");
    randomQouteData = JSON.parse(randomQouteData);
    if (randomQouteData) {
      setProduct([
        randomQouteData[Math.floor(Math.random() * randomQouteData.length)],
      ]);
      setLoader(false);
    } else {
      axios.get("https://type.fit/api/quotes").then((res) => {
        localStorage.setItem("Qoutations", JSON.stringify(res.data));
        setProduct([res.data[Math.floor(Math.random() * res.data.length)]]);
        setLoader(false);
      });
    }
  }, [qoute]);

  const changeQoute = () => {
    setMyQoute(!qoute);
  };
  const changeQoutetimes = () => {
    if (num === "") {
      toast.warning("input field can't be empty");
    } else if (num > 30) {
      toast.warning("Cannot Exceed 30");
    } else {
      const randomData = [];
      let randomQouteData = localStorage.getItem("Qoutations");
      randomQouteData = JSON.parse(randomQouteData);
      for (let i = 0; i < num; i++) {
        randomData.push(
          randomQouteData[Math.floor(Math.random() * randomQouteData.length)]
        );
      }
      setProduct(randomData);
      setNum("");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      position: "bottom-center",
    });
  };
  return (
    <div className={styles.cardBox}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className={styles.controlPanel}>
            <button className={styles.newBtn} onClick={changeQoute}>
              New Quote
            </button>
            <div className={styles.inputContainer}>
              <input
                type="number"
                value={num}
                placeholder="Enter Number to Generate"
                onChange={(e) => {
                  setNum(e.target.value);
                }}
                className={styles.inputField}
              />
              <button className={styles.newBtn} onClick={changeQoutetimes}>
                {num} Generate
              </button>
            </div>
          </div>
          <div className={styles.cardContainer}>
            {product.map((item) => {
              return (
                <div key={item.text} className={styles.qouteBox}>
                  <div className={styles.qouteBox1}>
                    <div className={styles.mainQoute}>{item.text}</div>
                    <div className={styles.Author}>
                      <div className={styles.icon}>
                        <SocialIcon url="https://twitter.com/jaketrent" />
                        <SocialIcon url="https://facebook.com/jaketrent" />
                      </div>
                      <div>
                        <b> ~{item.author ? item.author : "UnKnown"}</b>
                        <div></div>
                      </div>
                      <button
                        className={styles.copyBtn}
                        onClick={() => {
                          copyToClipboard(item.text);
                        }}
                      >
                        Copy to Clipboard
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
