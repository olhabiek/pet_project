import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import CategoriesPage from "./pages/Categories";
import ProductsByCategoryPage from "./pages/Products/ByCategory";
import AllProductsPage from "./pages/Products/All";
import DiscountedProductsPage from "./pages/Products/Discounted";
import ProductDetailsPage from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import NotFoundPage from "./pages/NotFound";
import ConnectedModal from "./components/Modal/ConnectedModal";

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route
            path="categories/:categoryId"
            element={<ProductsByCategoryPage />}
          />
          <Route path="products" element={<AllProductsPage />} />
          <Route
            path="discounted-products"
            element={<DiscountedProductsPage />}
          />
          <Route path="products/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <ConnectedModal />
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
