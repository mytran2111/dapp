import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

const UserCard = (weiUnit, hoistAccount) => {
    const [network, setNetwork] = useState('');
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const loadUserDetails = async () => {
            try {
                // Get the network ID
                const networkId = await web3.eth.getChainId();
                const networkName = getNetworkName(networkId);
                
                // Get the user account address
                const accounts = await web3.eth.getAccounts();
                const userAccount = accounts[0];

                // Update the state variables
                setNetwork(networkName);
                setAccount(userAccount);
                hoistAccount(userAccount);

                // Get the user account balance
                const balanceWei = await web3.eth.getBalance(userAccount);
                setBalance(balanceWei / weiUnit);
            } catch (error) {
                console.error('Error loading user details:', error);
            }
        };

        loadUserDetails();
    }, []);

    const getNetworkName = (networkId) => {
        switch (networkId) {
            case 1:
                return 'Mainnet';
            case 3:
                return 'Ropsten';
            case 4:
                return 'Rinkeby';
            case 5:
                return 'Goerli';
            case 42:
                return 'Kovan';
            default:
                return 'Unknown Network';
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">User's Wallet</h5>
                <p className="card-text">
                    network: {network} <br />
                    account: {account} <br />
                    balance: {balance}
                </p>
            </div>
        </div>
    );
};

export default UserCard;

