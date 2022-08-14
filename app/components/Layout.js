import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => (
  <div>
    <Header />
    <div className="bg-slate-100">
      {props.children}
    </div>
    <Footer />
  </div>
);

export default Layout;