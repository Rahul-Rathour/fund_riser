import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const WalletConnect = () => {
  const { connectWallet, currentAccount } = useContext(AuthContext);

  return (
    <div className="p-4">
      {!currentAccount ? (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-sm">Connected: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</p>
      )}
    </div>
  );
};

export default WalletConnect;