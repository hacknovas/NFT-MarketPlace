import MarketPlace from "./Component/MarketPlace";
import NFTPage from "./Component/NFTPage";
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
          <Route path="/nftPage/:id" element={<NFTPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
