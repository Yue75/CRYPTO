import React, { useEffect, useState } from 'react';


const CryptoPrice: React.FC = () => {
  const [prices, setPrices] = useState<{ [key: string]: number }>({});


  return (
    <div>
      <h2>Prix des Cryptos</h2>
      <ul>
        {Object.entries(prices).map(([crypto, price]) => (
          <li key={crypto}>
            {crypto}: ${price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoPrice;
