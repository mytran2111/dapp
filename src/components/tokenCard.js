import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import fundContract from "../contracts/FundProjectForOwner.json";
import sendTokens from './sendToken';

const web3 = new Web3(Web3.givenProvider)

const TokenCard = ({ account, hoistContract, onTransactionHash, onTokenID}) => {
    const [owner, setOwner] = useState('');
    const [quantity, setQuantityVal] = useState(0);
    const [tokenID, setTokenIdVal] = useState('');
    const [showOwner, setShowOwner] = useState(false); // State to toggle showing owner field
    

    useEffect(() => {
        (async () => {
            const contract = new web3.eth.Contract(fundContract.abi, fundContract.networks[5].address);
            let own = await contract.methods.owner().call();
            setOwner(own);
            hoistContract(contract);
        })();
    },[]);

    const setQuantity = (e) => {
        setQuantityVal(e.target.value);
    }

    const setTokenID = (e) => {
        const tokenId = e.target.value;
        setTokenIdVal(tokenId);
        if (tokenId) {
            setShowOwner(true); // Show owner field when a valid token ID is entered
        } else {
            setShowOwner(false); // Hide owner field when the token ID is empty
        }
    }

    const buyToken = async () => {
        try {
          // Call the sendTokens function directly from TokenCard
          const txHash = await sendTokens(quantity, tokenID, account);
          if (txHash) {
            // Call the callback function with the transaction hash if it's not null
            onTransactionHash(txHash);
            // call back the token id
            onTokenID(tokenID);
          }
        } catch (error) {
          console.error('Error sending tokens:', error);
        }
      };
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title"> Buy NFT Token</h5>
                <div className="row">
                    <div className="col-md-9">
                        <label className="form-label">Token ID</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={setTokenID}
                            value={tokenID}
                            placeholder="Enter your Token ID here"
                        />
                        <hr/>
                    </div>
                </div>
                {showOwner && ( // Conditionally render the "Owner" field
                    <p className="card-text">
                        Owner: {owner} <br /> 
                    </p>
                )}
                <div className="row">
                    <div className="col-md-9">
                        <label className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={setQuantity}
                            value={quantity}
                        />
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 text-center">
                        <button type="submit" className="btn btn-primary" onClick={buyToken}>
                            Buy Token
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenCard;

