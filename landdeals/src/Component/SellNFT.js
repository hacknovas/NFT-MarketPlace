import React, { useEffect, useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../src/pinata";
import Marketplace from "../NFTMarket.json";
const ethers = require("ethers");

export default function SellNFT() {
  const [fileURL, setFileURL] = useState(null);
  const [formPara, setformPara] = useState({
    name: "",
    description: "",
    price: "",
  });

  const changeFile = async (e) => {
    var file = e.target.files[0];
    //check for file extension
    try {
      const response = await uploadFileToIPFS(file);

      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  };

  async function uploadMetadataToIPFS() {
    const { name, description, price } = formPara;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) {
      return -1;
    }

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  const listNFT = async (e) => {
    e.preventDefault();

    try {
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      //Pull the deployed contract i
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      //massage the params to be sent to the create NFT request

      const price = ethers.parseUnits(formPara.price, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      //actually create the NFT
      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      await transaction.wait();

      alert("Successfully listed your NFT!");
      setformPara({ name: "", description: "", price: "" });
      // window.location.replace("/");
    } catch (e) {
      alert("Upload error" + e);
    }
  };

  return (
    <>
      <div className="text-center w-50 container border mt-5">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            name="Name"
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name"
            value={formPara.name}
            onChange={(e) => setformPara({ ...formPara, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            name="Description"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={formPara.description}
            onChange={(e) =>
              setformPara({ ...formPara, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Price
          </label>
          <input
            name="Price"
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Price"
            value={formPara.price}
            onChange={(e) =>
              setformPara({ ...formPara, price: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Image of NFT
          </label>
          <input
            name="ImageNFT"
            className="form-control"
            type="file"
            id="formFile"
            onChange={changeFile}
          />
        </div>
        <button
          onClick={listNFT}
          className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
          id="list-button"
        >
          List NFT
        </button>
      </div>
    </>
  );
}
