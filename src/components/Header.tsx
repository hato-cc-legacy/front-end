import { useNavigate } from "react-router-dom";
import "./styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="header">
        <h1 className="title_header">Message In A Bottle</h1>
        <div>
          <button className="login_button" onClick={() => navigate("/login")}>Login</button>
          <button className="set_home" onClick={(() => navigate("/"))}>Home</button>
        </div>
      </section>
    </>
  );
};

export default Header;
