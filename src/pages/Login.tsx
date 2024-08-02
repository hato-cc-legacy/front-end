import { useAppContext, useAppDispatchContext } from "../AppContext";

const Login = () => {
  const useAppState = useAppContext();
  const setAppState = useAppDispatchContext();
  return (
    <section className="login">
      Login
      <button onClick={() => setAppState({ ...useAppState, isLoggedIn: true })}>
        Click Me
      </button>
    </section>
  );
};

export default Login;
