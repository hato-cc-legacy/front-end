import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppProvider from "./AppContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import UserPage from "./pages/UserPage";
import Admin from "./pages/Admin";

const App = () => {
  return (
    // <Admin />
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<Index></Index>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/user" element={<UserPage></UserPage>}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
