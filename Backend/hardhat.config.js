require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const Alchemy_key = "V3Wwi7HAu-QTvrLEOISW_Zi4GfgcaMde";
const sepolia_key ="8e3e6175e88b98c07ba0364a415cf2b05f0e36840a123bac9f5806ce72a41593";
module.exports = {
  solidity: "0.8.18",

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${Alchemy_key}`,
      accounts: [`${sepolia_key}`],
    },
  },
};

// npx hardhat run scripts/deploy.js --network sepolia
