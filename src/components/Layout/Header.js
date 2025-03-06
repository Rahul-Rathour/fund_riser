import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';
import { FaSearch, FaUser, FaCog } from 'react-icons/fa';

const Header = () => {
  const { currentAccount, userRole, connectWallet } = useContext(AuthContext);

  return (
    <header className="bg-gray-200 text-gray-800 p-4 shadow-md flex justify-between items-center relative z-10">
      <div className="ml-64">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer text-gray-900">Venture Crowdfunding</h1>
        </Link>
      </div>

      <nav className="flex items-center space-x-4">
        {currentAccount ? (
          <>
            <Link href="/profile" className="hover:text-green-600 flex items-center">
              <FaUser className="mr-1" /> Profile
            </Link>
            {userRole === 'admin' && (
              <Link href="/admin" className="hover:text-green-600 flex items-center">
                <FaCog className="mr-1" /> Admin
              </Link>
            )}
            <span className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800">
              {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
            </span>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-green-600">
              Login
            </Link>
            <button
              onClick={connectWallet}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Connect Wallet
            </button>
          </>
        )}
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          <Link href="/campaigns/create">Create a Campaign</Link>
        </button>
      </nav>
    </header>
  );
};

export default Header;