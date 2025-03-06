import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';

const Login = () => {
  const { currentAccount, connectWallet } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect to Crowdfunding</h2>
        {!currentAccount ? (
          <>
            <p className="text-gray-600 mb-6">
              Connect your wallet to start donating, creating campaigns, or managing as an admin.
            </p>
            <button
              onClick={connectWallet}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Connect Wallet
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Wallet Connected: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
            </p>
            <Link href="/campaigns">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                Go to Campaigns
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;