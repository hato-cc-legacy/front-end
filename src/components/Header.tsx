import { useNavigate } from "react-router-dom";
import "./styles/Header.css";
import { useAppContext, useAppDispatchContext } from "../AppContextConst";
import * as sessionApi from "../api/session";

const Header = () => {
  const useAppState = useAppContext();
  const setAppState = useAppDispatchContext();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await sessionApi.logout();
    setAppState({});
    navigate("/");
  };

  return (
    <>
      <section className="header">
        <h1 className="title_header" onClick={() => navigate("/")}>
          Message In A Bottle 📨
        </h1>
        <div>
          {!useAppState.user ? (
            <button className="login_button" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <div className="users_buttons">
              <button
                className="login_button"
                onClick={() => navigate("/user")}
              >
                User Page
              </button>
              <button className="login_button" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Header;
