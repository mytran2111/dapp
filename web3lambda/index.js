/** 
 * Licensed under GNU Lesser General Public License: 
 * You can redistribute and/or modify it under the terms of 
 * the GNU Lesser General Public License as published by the 
 * Free Software Foundation, either version 3 of the License, 
 * or (at your option) any later version.
 * 
 * Author: Aaron Sempf
 * Global Principal Solution Architect
 * Global Systems Integrators, AWS 
 */

const Web3 = require('web3');
const SignedHttpProvider = require('./signedHttpProvider.js');
const endpoint = process.env.AMB_HTTP_ENDPOINT
const options = {
  keepAlive: true,
  timeout: 20000, // milliseconds,
  headers: [{name: 'Access-Control-Allow-Origin', value: '*'}]
};
const web3 = new Web3(new SignedHttpProvider(endpoint, options));

const NOT_FOUND = "Not Found";

const eth = {
  'getBalance': async (params) => {
    return await web3.eth.getBalance(...Object.values(params));
  }
  //... other /eth functions here
}

const net = {
  'getNetworkType': async (params) => {
    return await web3.eth.net.getNetworkType();
  }
  //... other /net functions here
}
  
const contract = {
  'getOwner': async (params) => {
    const contract = new web3.eth.Contract(...Object.values(params))
    return await contract.methods.owner().call();
  }  
  //... other /contract functions here
}

const broker = {};
broker['/eth/'] = (method, params) => eth[method](params);
broker['/eth/net/'] = (method, params) => net[method](params);
broker['/eth/contract/'] = (method, params) => contract[method](params);

const sendRes = (status, body) => {
  return {
      'statusCode': status,
      'multiValueHeaders': {},
      'isBase64Encoded': false,
      'headers': {
          "Content-Type" : "application/json",
          "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Methods" : "OPTIONS,POST,GET",
          "Access-Control-Allow-Origin" : "*",
          "Cache-Control": "max-age=0, no-store, must-revalidate",
          "X-Requested-With" : "*",
          Pragma: "no-cache",
          Expires: 0
      },
      'body': JSON.stringify(body)
  };
};

exports.handler = async (event) => {
    console.log('request:', JSON.stringify(event, undefined, 2));
   
    if(event.httpMethod === 'OPTIONS' || event.httpMethod === 'GET') {
      return sendRes(200, { message: "healthy" }); 
    } else {
      try {
        const { path } = event
        const { method, params } = JSON.parse(event.body)

        let response = (broker[path]) ? await broker[path](method, params) : NOT_FOUND;
        let status = (response == NOT_FOUND) ? 404 : 200;
        let bodyRes = status == 404 ? { "error": response } : { "data": response };

        console.log("Response:", JSON.stringify(bodyRes, undefined, 2));
        return sendRes(status, bodyRes);
      } catch(err) {
        console.log("Error:", err);
        return sendRes(500, { error: err.message ?? err });
      }
    }  
}
