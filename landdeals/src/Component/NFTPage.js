import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils";
import axios from "axios";
import Marketplace from "../NFTMarket.json";
import { RotatingLines } from "react-loader-spinner";

export default function NFTPage() {
  const params = useParams();
  const id = params.id;

  const [data, updateData] = useState({});
  const [fetch, setFetch] = useState(false);
  const [currAddress, updateCurrAddress] = useState("0x");

  async function getNFTData(tokenId) {
    const ethers = require("ethers");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    let contract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );

    var tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedforTokenId(tokenId);
    tokenURI = GetIpfsUrlFromPinata(tokenURI);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };
    console.log(item);

    updateData(item);
  }

  async function buyNFT(tokenId) {
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );
      const salePrice = ethers.parseUnits(data.price, "ether");
      //   updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      alert("You successfully bought the NFT!");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  useEffect(() => {
    return () => {
      setFetch(true);
      getNFTData(id);
      setFetch(false);
    };
  }, [id]);

  return (
    <>
      {fetch ? (
        <div>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <div
          className="container d-flex flex-wrap flex-row m-5 "
          style={{ alignItems: "center", justifyContent: "space-evenly" }}
        >
          <div>
            <img src={data.image} alt="NA" className="w-50" />
          </div>
          <div className="">
            <div>Name: {data.name}</div>
            <div>Description: {data.description}</div>
            <div>
              Price: <span className="">{data.price + " ETH"}</span>
            </div>
            <div>
              Owner: <span className="text-sm">{data.owner}</span>
            </div>
            <div>
              Seller: <span className="text-sm">{data.seller}</span>
            </div>
            <div>
              {currAddress != data.owner && currAddress != data.seller ? (
                <button className="" onClick={() => buyNFT(id)}>
                  Buy this NFT
                </button>
              ) : (
                <div className="">You are the owner of this NFT</div>
              )}

              <div className="">{"message"}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
