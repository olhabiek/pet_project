import React from "react";
import styles from "./styles.module.css";

import mainImage from "../../assets/images/mainImage.png";
import CheckOutBtn from "../../components/Buttons/CheckOutBtn";
import CategoriesBlock from "../../components/CategoriesBlock";
import DiscountForm from "../../components/DiscountForm";
import SaleBlock from "../../components/SaleBlock";

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <div>
        <div className={styles.content}>
          <h1>
            Amazing Discounts <br /> on Pets Products!
          </h1>
          <CheckOutBtn />
        </div>
      </div>
      <div>
        <img src={mainImage} alt="Main" className={styles.bgStyle} />
      </div>
      <CategoriesBlock />
      <DiscountForm />
      <SaleBlock />
    </div>
  );
}

export default HomePage;
