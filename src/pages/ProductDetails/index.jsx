import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";

import AddBlueButton from "../../components/Buttons/AddBlueButton/index";
import Breadcrumbs from "../../components/Breadcrumbs/index";
import Counter from "../../components/Counter/index";
import { addToCart } from "../../redux/cartSlice";

const API_URL = "https://pet-shop-backend.slavab.kz";

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productResponse = await axios.get(
          `${API_URL}/products/${productId}`
        );
        if (productResponse.data && productResponse.data.length > 0) {
          setProduct(productResponse.data[0]);
        } else {
          setProduct(null);
          setError("Product not found.");
        }
        const categoriesResponse = await axios.get(`${API_URL}/categories/all`);
        setCategories(categoriesResponse.data);
      } catch (error) {
        setError(
          "An error occurred while fetching product details. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndCategories();
  }, [productId]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.title : "Unknown Category";
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <div
        style={{
          color: "red",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        {error}
      </div>
    );

  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <div className={styles.productDetailsPage}>
        <Breadcrumbs
          items={[
            { path: "/", label: "Main page" },
            { path: "/categories", label: "Categories" },
            {
              path: `/categories/${product.categoryId}`,
              label: getCategoryName(product.categoryId),
            },
            {
              path: `/products/${productId}`,
              label: product.title,
              isActive: true,
            },
          ]}
        />
        <div className={styles.productContainer}>
          <div className={styles.productImageContainer}>
            <img
              src={`${API_URL}${product.image}`}
              alt={product.title}
              className={styles.productImage}
            />
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.title}</h2>
            <div className={styles.productPrice}>
              <span className={styles.currentPrice}>
                ${product.discont_price || product.price}
              </span>
              {product.discont_price && (
                <>
                  <span className={styles.originalPrice}>${product.price}</span>
                  <span className={styles.discountFlag}>
                    -
                    {Math.round(
                      ((product.price - product.discont_price) /
                        product.price) *
                        100
                    )}
                    %
                  </span>
                </>
              )}
            </div>
            <div className={styles.counterAndButton}>
              <Counter quantity={quantity} setQuantity={setQuantity} />
              <AddBlueButton onClick={handleAddToCart} />
            </div>
            <div className={styles.productDescription}>
              <h3>Description</h3>
              <p
                className={`${styles.productDescriptionText} ${
                  isExpanded ? styles.expanded : styles.collapsed
                }`}
              >
                {product.description}
              </p>
              <button
                className={styles.readMoreButton}
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ display: product.description ? "block" : "none" }}
              >
                {isExpanded ? "Close" : "More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
