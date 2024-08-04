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
          <div className="title-header__icon">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="100" cy="120" rx="40" ry="50" fill="grey" />
              <circle cx="100" cy="70" r="20" fill="grey" />
              <circle cx="108" cy="65" r="5" fill="white" />
              <circle cx="108" cy="65" r="2" fill="black" />
              <polygon points="110,75 130,80 110,85" fill="orange" />
              <rect
                x="130"
                y="70"
                width="10"
                height="30"
                fill="lightblue"
                stroke="black"
              />
              <polygon
                points="135,60 140,70 130,70"
                fill="lightblue"
                stroke="black"
              />
              <line x1="130" y1="80" x2="140" y2="80" stroke="black" />
              <path
                d="M60,110 Q90,70 100,120 T140,110"
                fill="lightgrey"
                stroke="grey"
              />
              <line
                x1="85"
                y1="170"
                x2="80"
                y2="190"
                stroke="orange"
                stroke-width="4"
              />
              <line
                x1="115"
                y1="170"
                x2="120"
                y2="190"
                stroke="orange"
                stroke-width="4"
              />
            </svg>
          </div>
          Hato - delivering random messages
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
