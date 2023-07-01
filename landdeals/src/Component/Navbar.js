import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { conApp } from "../StateManager/ContextAPI";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { userAdd, setUserAdd } = useContext(conApp);

  const connectWallet = async () => {
    if (window.ethereum) {
      const Provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await Provider.getSigner();

      setUserAdd(signer.address);
    } else {
      alert("Metamask Not Installed");
    }
  };

  useEffect(() => {
    return () => {
      connectWallet();
    };
  }, []);

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand ">
            AvtarNFT
          </Link>
          <div className="d-flex" role="search">
            <button
              className="btn btn-outline-primary"
              type="submit"
              onClick={connectWallet}
            >
              {userAdd === "" ? (
                <b>connect to wallet</b>
              ) : (
                <b>
                  {userAdd.substring(0, 4) +
                    ".." +
                    userAdd.substring(userAdd.length - 5, userAdd.length)}
                </b>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
