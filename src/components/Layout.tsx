import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <section className="app">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </section>
  );
};

export default Layout;
