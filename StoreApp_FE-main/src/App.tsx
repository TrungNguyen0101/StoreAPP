import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Menu from "./layouts/menu/Menu";
import { gapi } from "gapi-script";
import DetailAccount from "./pages/DetailAccount";
import AddressAccount from "./layouts/account/AddressAccount";
import InfoAccount from "./layouts/account/InfoAccount";
import Manage from "./pages/Manage";
import AddProduct from "./layouts/manage/AddProduct";
import ListProduct from "./layouts/manage/ListProduct";
import UpdateProduct from "./layouts/manage/UpdateProduct";
import StorageProduct from "./layouts/manage/StorageProduct";
import Cart from "./pages/Cart";

function App() {
  window.gapi.load("client:auth2", () => {
    window.gapi.client.init({
      clientId:
        "879686866490-h6lrohu4tol65rg2m4d23j92d17gd1an.apps.googleusercontent.com",
      scope: "email",
      plugin_name: "App Name that you used in google developer console API",
    });
  });

  window.Buffer = window.Buffer || require("buffer").Buffer;
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route element={<Menu></Menu>}>
        <Route path="/signin" element={<SignInPage></SignInPage>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route element={<DetailAccount></DetailAccount>}>
          <Route path="/account" element={<InfoAccount></InfoAccount>}></Route>
          <Route
            path="/account/address"
            element={<AddressAccount></AddressAccount>}
          ></Route>
        </Route>
        <Route element={<Manage></Manage>}>
          <Route path="/manage" element={<AddProduct></AddProduct>}></Route>
          <Route
            path="/manage/list"
            element={<ListProduct></ListProduct>}
          ></Route>
          <Route
            path="/manage/list-storage"
            element={<StorageProduct></StorageProduct>}
          ></Route>
          <Route
            path="/manage/update/:id"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
        </Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
