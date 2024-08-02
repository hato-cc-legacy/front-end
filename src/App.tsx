import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppProvider from "./AppContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<Index></Index>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
