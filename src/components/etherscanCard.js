import React, { useState, useEffect } from 'react';
import { useEtherConfirmation } from './etherConfirmation.js'; // Import the named export

const EtherscanCard = ({ transactionHash, tokenID, ownerID }) => {
  console.log(transactionHash)
  console.log(tokenID)
  console.log(ownerID)

  const responseData = useEtherConfirmation(transactionHash, tokenID, ownerID);
  const [showStatus, setShowStatus] = useState(false);

  const handleCheckEtherscan = async () => {
    try {
      await responseData; // Await the response data to make sure it is fetched before showing the status
      setShowStatus(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // // Delay the API call by 10 seconds using setTimeout
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     handleCheckEtherscan();
  //   }, 8000);

  //   return () => clearTimeout(timer); // Cleanup function to clear the timeout if the component is unmounted before the delay ends
  // }, []);

  return (
    <div className="card">
      <div className="card-body">
        {!showStatus ? (
          <>
            <h5 className="card-title">Check Etherscan for transaction confirmation</h5>
            <button className="btn btn-primary" onClick={handleCheckEtherscan}>
              Check Etherscan
            </button>
          </>
        ) : (
          responseData && responseData.status && responseData.status === 'SUCCEEDED' ? (
            <>
              <h2>Status:</h2>
              <p>{responseData.status}</p>
              {responseData.input && responseData.input.length > 0 ? (
                <>
                  <h2>Transaction ID:</h2>
                  <p>{JSON.parse(responseData.input).body.transactionHash}</p>
                  {/* Display the cat.jpeg picture */}
                  {/* <img src="/home/ec2-user/web3-workshop/dapp/src/cat.jpeg" alt="Cat" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}



                </>
              ) : (
                <p>Transaction ID not available.</p>
              )}
            </>
          ) : (
            <p>Querying transaction data.</p>
          )
        )}
      </div>
    </div>
  );
  
}

export default EtherscanCard;
