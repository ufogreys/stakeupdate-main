import React from "react";
import { Routes , Route } from "react-router-dom";
import Staking from "./routes/Staking";
import WalletModal from "./components/WalletModal";

function App() {
  return (
    <div>
      <WalletModal />
      <Routes>
        <Route path="/" element={<Staking/>}/>
      </Routes>
    </div>
  );
}

export default App;
