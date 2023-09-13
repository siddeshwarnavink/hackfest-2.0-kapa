const Points = artifacts.require("Points");

module.exports = async function (deployer) {
  await deployer.deploy(Points);
  const points = await Points.deployed();

  console.log("Points Contract Address:", points.address);
};
