const axios = require('axios');

exports.handler = async (event) => {
    // Replace YOUR_API_KEY with your Etherscan API keyc
    console.log(event);
    const etherscanApiKey = 'VIDQ44ZZVFYW2PRVDCJSCFEBBI8JHNX1I9';
    let tokenContractAddress = (event.body.tokenID).replace(/"/g, "'");;

    console.log(tokenContractAddress, typeof(tokenContractAddress));
    
    let targetTransactionHash = (event.body.transactionHash).replace(/"/g, "'");;
    console.log(targetTransactionHash, typeof(targetTransactionHash));
    
    // const tokenContractAddress = '0xe707cD6283b7aD5269696BF73b37E3F430Cc4b6E';
    // let targetTransactionHash = '0x30de92a64cbbe4644d86488f41747c18a0f43b519c8d972468dc8fcc92aaaebc'; // event{}{}
    const network = 'goerli';

    try {
        const response = await axios.get(`https://api-${network}.etherscan.io/api`, {
            params: {
                module: 'account',
                action: 'tokentx',
                contractaddress: tokenContractAddress,
                apikey: etherscanApiKey
            }
        });

    console.log(response);

    const transactions = response.data.result;
        // Find the transaction that matches the targetTransactionHash
        const matchingTransaction = transactions.find(
            (transaction) => transaction.hash === targetTransactionHash
        );

        if (!matchingTransaction) {
            // Return an error if the target transaction is not found
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Transaction not found' }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
        }

        // Process the matching transaction as needed
        console.log(matchingTransaction);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Transaction succeed' }),
            transactionHash: targetTransactionHash,
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        console.error('Error fetching token transactions:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching token transactions' }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
};
