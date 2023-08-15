import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import CryptoPage from "./pages/CryptoPage/CryptoPage";
import CurrencyTypeProvider from "./context/selectContext";

function App() {
  return (
    <CurrencyTypeProvider>
      <main className="app">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="crypto/:id" element={<CryptoPage />} />
          </Route>
        </Routes>
      </main>
    </CurrencyTypeProvider>
  );
}

export default App;
