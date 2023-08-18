# Decentralized Application demo 
Reference: https://catalog.workshops.aws/web3dev/en-US

The website is hosted in CloudFront:  https://d1my8e6yxh8tnh.cloudfront.net

The purpose of this git repository is to build a decentralization application demo using Goeril Test Net, Amazon Managed 
Blockchain and React for frontend

## Prerequisite
Download the truffle framework:
```
npm install -g truffle

```
Navigate to the truffle folder and deploy the contract, an example of contract is truffleApp/contracts/MyToken.sol:
```
truffle compile
truffle migrate --network goerli
truffle console --network goerli
contract = await FundProjectForOwner.deployed()
```
Check for contract address, this would be used to the address needed to put in as token for the app:
```
contract.address
```
## Run the react app:
You can run the react app locally using:
```
cd dapp/
npm run start
```

Trouble shooting: check port if it is running on localhost3000:/
