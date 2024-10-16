import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import instagramIcon from "../../assets/icons/instagram.svg";
import whatsappIcon from "../../assets/icons/whatsapp.svg";
import mapImage from "../../assets/images/map.png";

function Footer() {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <h2>Contact</h2>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <p>Phone</p>
            <Link to="tel:+493091588492">+49 30 915-88492</Link>
          </div>
          <div className={styles.gridItem}>
            <p>Socials</p>
            <div className={styles.iconsContainer}>
              <Link to="https://www.instagram.com/" target="_blank">
                <img
                  src={instagramIcon}
                  alt="Instagram Icon"
                  className={styles.iconItem}
                />
              </Link>
              <Link to="https://web.whatsapp.com/" target="_blank">
                <img
                  src={whatsappIcon}
                  alt="WhatsApp Icon"
                  className={styles.iconItem}
                />
              </Link>
            </div>
          </div>
          <div className={styles.gridItem}>
            <p>Address</p>
            <address>Wallstraẞe 9-13, 10179 Berlin, Deutschland</address>
          </div>
          <div className={styles.gridItem}>
            <p>Working Hours</p>
            <p>24 hours a day</p>
          </div>
        </div>
        <div>
          <img src={mapImage} alt="Map" className={styles.mapContainer} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
