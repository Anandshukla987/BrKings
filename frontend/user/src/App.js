import { Route, Routes } from "react-router-dom";
import { React } from "react";
import Home from "./Component/Header/Home";
import "./app.scss";
import Navbar from "../src/Navbar/Navbar";
import Cart from "./Component/Cart/Cart";
import Error from "./Component/Error";
import Footer from "./Component/Footer";
import ProductPage from "./Component/Product/ProductPage";
import ForgotPass from "./Component/ForgotPass";
import ResetPass from "./Component/ResetPass";
import ProtectedRoute from "./Component/ProtectedRoute";
import Brownies from "./Component/Header/Brownies";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute/>}>
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
