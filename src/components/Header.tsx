import "./styles/Header.css";

const Header = () => {
  return (
    <>
      <section className="header">
        <h1 className="title_header">Message In A Bottle</h1>
        <div>
          <button className="login_button">Login</button>
          <button className="set_home">Home</button>
        </div>
      </section>
    </>
  );
};

export default Header;
