import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../src/Navbar/Navbar";
import Cart from "./Component/Cart/Cart";
import Error from "./Component/Error";
import Footer from "./Component/Footer";
import ForgotPass from "./Component/ForgotPass";
import Brownies from "./Component/Header/Brownies";
import Home from "./Component/Header/Home";
import ProductPage from "./Component/Product/ProductPage";
import ProtectedRoute from "./Component/ProtectedRoute";
import ResetPass from "./Component/ResetPass";
import "./app.scss";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route path="/brownies" element={<Brownies />} />
        <Route path="*" element={<Error />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/Product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routing />
      <Footer />
    </div>
  );
}

export default App;
