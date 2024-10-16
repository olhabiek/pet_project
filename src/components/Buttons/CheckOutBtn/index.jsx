import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function CheckOutBtn() {
  return (
    <Link to="/discounted-products" className={styles.btnStyle}>
      Check out
    </Link>
  );
}

export default CheckOutBtn;
