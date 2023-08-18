import Web3 from 'web3';
import erc20Token from '../contracts/ERC20.json';

const erc20TokenABI = erc20Token.abi;
const PRIVATE_KEY = "59dfb0a880436ed805b2b661825b3cdef863ea923483c676e72bd3031a09356a";
const web3 = new Web3(Web3.givenProvider);

async function sendTokens(quantity, tokenID, recipient) {
  if (quantity === '' || tokenID === '') {
    console.log('Error arguments');
    return null; // Return null if there's an error
  }

  try {
    const senderAddress = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;
    const tokenContract = new web3.eth.Contract(erc20TokenABI, tokenID);
    const recipientAddress = '0x302c84d8104488ED724d55E369DF4585F104b48d';
    const amountToSend = web3.utils.toWei(quantity, 'ether');

    const options = {
      from: senderAddress,
    };

    // Call the transfer function to send tokens to the recipient
    const transactionReceipt = await tokenContract.methods.transfer(recipient, amountToSend).send(options);

    console.log('Transaction Hash:', transactionReceipt.transactionHash);
    console.log('Tokens Sent Successfully!');

    return transactionReceipt.transactionHash; // Return the transaction hash
  } catch (error) {
    console.error('Error sending tokens:', error);
    return null; // Return null if there's an error
  }
}

export default sendTokens;

