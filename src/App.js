import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserCard from './components/userCard';
import TokenCard from './components/tokenCard';
import EtherscanCard from './components/etherscanCard';

const weiUnit = 1000000000000000000;
const transactionHash = '0x30de92a64cbbe4644d86488f41747c18a0f43b519c8d972468dc8fcc92aaaebc';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState({});
  const [transactionHashFromTokenCard, setTransactionHashFromTokenCard] = useState('');
  const [tokenID, setTokenID] = useState('');

  // This function will be called from the UserCard component to set the account
  const handleSetAccount = (userAccount) => {
    setAccount(userAccount);
  };
  const handleTransactionHash = (txHash) => {
    // This function will be passed to TokenCard and called with the transaction hash
    setTransactionHashFromTokenCard(txHash);
  };

  const handleTokenID = (receivedTokenID) => {
    // Do whatever you want to do with the tokenID, for example, you can set it in state
    setTokenID(receivedTokenID);
    console.log('Received tokenID:', tokenID);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex justify-content-center">
          <div id="content">
            <h1>BlockChain Demo</h1>
            {UserCard(weiUnit, handleSetAccount)}
            {account && ( // Wait until account is set
              <TokenCard account={account} hoistContract={setContract} onTransactionHash={handleTransactionHash} onTokenID={handleTokenID}/>
            )}
            {transactionHashFromTokenCard && ( // Wait until transactionHashFromTokenCard is available
              <EtherscanCard transactionHash={transactionHashFromTokenCard} tokenID={tokenID} ownerID={account}/>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
