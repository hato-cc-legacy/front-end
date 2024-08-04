import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppProvider from "./AppContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { useAppContext } from "./AppContextConst";
import UserPage from "./pages/UserPage";

const App = () => {
  const useAppState = useAppContext();

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<Index></Index>}></Route>
            <Route
              path="/login"
              element={!useAppState.user ? <Login></Login> : <Index></Index>}
            ></Route>
            <Route path="/user" element={<UserPage></UserPage>} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
