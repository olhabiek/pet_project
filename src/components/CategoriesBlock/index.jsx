import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function CategoriesBlock() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://pet-shop-backend.slavab.kz/products/all"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <div className={styles.categoriesBlock}>
        <div className="titleBlock">
          <h2>Categories</h2>
          <div className="titleBlockLine"></div>
          <Link to="./categories" className="titleBlockBtn">
            All categories
          </Link>
        </div>
        <ul className={styles.gridContainer}>
          {}
          {categories.slice(0, 4).map((category) => (
            <li key={category.id} className={styles.gridItem}>
              <Link
                to={`/categories/${category.id}`}
                className={styles.categoryItem}
              >
                <img
                  src={`https://pet-shop-backend.slavab.kz/${category.image}`}
                  alt={category.title}
                  className={styles.categoryImage}
                />
                <h3 className={styles.categoryName}>{category.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoriesBlock;
