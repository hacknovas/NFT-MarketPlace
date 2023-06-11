const hre = require("hardhat");

async function main() {
  const lock = await hre.ethers.deployContract("Lock");
  const add = await lock.getAddress();

  console.log("Token address:", add);
}

main()
  .then(() => {
    console.log("Deployed Successfully");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
