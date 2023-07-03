import Footer from "./Component/Footer";
import MarketPlace from "./Component/MarketPlace";
import Navbar from "./Component/Navbar";
import SellNFT from "./Component/SellNFT";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MarketPlace />} />
          <Route path="/sell" element={<SellNFT />} exact />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
