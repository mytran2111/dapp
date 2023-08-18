import { useState, useEffect } from 'react';

export function useEtherConfirmation(transactionHash, tokenID, ownerID) {
  const [responseData, setResponseData] = useState('');

  useEffect(() => {
    // Function to fetch data from API Gateway
    const fetchDataFromAPI = async () => {
      try {
        const apiKey = 'IuebQ3lnpy96y291g0ec54xwKN2W9ox7ZiblGi50'; // need to move this to SecretManager
        const apiUrl = 'https://arpgfkhguj.execute-api.us-east-1.amazonaws.com/testing/eth';

        const requestBody = {
          body: {
            transactionHash,
            tokenID,
            ownerID,
          },
          name: 'Hello',
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromAPI();
  }, [transactionHash, tokenID, ownerID]);

  return responseData;
}



