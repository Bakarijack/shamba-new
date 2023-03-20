const Web3 = require('web3');
const contract = require('../build/contracts/LandRegistry.json');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const LandRegistry = new web3.eth.Contract(
  contract.abi,
  '0xccF1AEDdF8E5101f4Cc9001Abe0c829B60E2bceE' // add contract address here
);

exports.registerLandOwnership = async (propertyId, ownerName, ownerContactInfo, landUse, taxAssessmentValue, zoningAndPlanningDetails, legalDetails, landSize, location) => {
  console.log(propertyId)
  console.log(ownerName)
  console.log(ownerContactInfo)
  console.log(landUse)
  console.log(taxAssessmentValue)
  console.log(zoningAndPlanningDetails)
  console.log(legalDetails)
  console.log(landSize)
  console.log(location)
  const accounts = await web3.eth.getAccounts();
  const result = await LandRegistry.methods.registerLandOwnership(propertyId, ownerName, ownerContactInfo, landUse, taxAssessmentValue, zoningAndPlanningDetails, legalDetails, landSize, location)
    .send({ from: accounts[0], gas: '5000000' });
  console.log(result);
}

async function updateLandOwnership(propertyId, ownerName, ownerContactInfo, landUse, taxAssessmentValue, zoningAndPlanningDetails, legalDetails, landSize, location) {
  const accounts = await web3.eth.getAccounts();
  const result = await LandRegistry.methods.updateLandOwnership(propertyId, ownerName, ownerContactInfo, landUse, taxAssessmentValue, zoningAndPlanningDetails, legalDetails, landSize, location)
    .send({ from: accounts[0], gas: '5000000' });
  console.log(result);
}

async function transferLandOwnership(propertyId, newOwnerAddress, newOwnerName, newOwnerContactInfo, thirdParty) {
  const accounts = await web3.eth.getAccounts();
  const result = await LandRegistry.methods.transferLandOwnership(propertyId, newOwnerAddress, newOwnerName, newOwnerContactInfo, thirdParty)
    .send({ from: accounts[0], gas: '5000000' });
  console.log(result);
}

exports.getLandOwnership = async (propertyId) => {
  const landOwnership = await LandRegistry.methods.landOwnerships(propertyId).call();
  console.log(landOwnership);
}

// call functions here
//registerLandOwnership(1, 'Denis Mathenge', '0712345678', Residential, 60000, 'Residential areas', 'legal', 10, 'Nyeri');
//updateLandOwnership(propertyId, ownerName, ownerContactInfo, landUse, taxAssessmentValue, zoningAndPlanningDetails, legalDetails, landSize, location);
//transferLandOwnership(propertyId, newOwnerAddress, newOwnerName, newOwnerContactInfo, thirdParty);
//getLandOwnership(propertyId);
