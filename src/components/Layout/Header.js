import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';
import { FaUser, FaCog, FaCopy, FaBars, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const { currentAccount, userRole, connectWallet, logout } = useContext(AuthContext);
  const [isCopied, setIsCopied] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentAccount);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-lg flex justify-between items-center relative z-20">
      {/* Logo/Brand */}
      <div className="flex items-center space-x-3">
        <button onClick={handleToggleSidebar} className="md:hidden text-white text-2xl">
          <FaBars />
        </button>
        <Link href="/">
          <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer hover:text-green-400 transition-colors">
            VentureCrowd
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {currentAccount ? (
          <>
            <Link href="/profile">
              <div className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                <FaUser />
                <span className="font-medium">Profile</span>
              </div>
            </Link>
            {userRole === 'admin' && (
              <Link href="/admin">
                <div className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  <FaCog />
                  <span className="font-medium">Admin</span>
                </div>
              </Link>
            )}
            <div className="flex items-center space-x-2">
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-200">
                {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
              </span>
              <button
                onClick={copyToClipboard}
                className="text-gray-400 hover:text-green-400 transition-colors"
                title="Copy wallet address"
              >
                {isCopied ? (
                  <span className="text-green-400 text-sm">Copied!</span>
                ) : (
                  <FaCopy />
                )}
              </button>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <span className="text-gray-300 hover:text-green-400 font-medium transition-colors cursor-pointer">
                Login
              </span>
            </Link>
            <button
              onClick={connectWallet}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Connect Wallet
            </button>
          </>
        )}
        <Link href="/campaigns/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Create Campaign
          </button>
        </Link>
      </nav>

      {/* Mobile Menu */}
      {isSidebarOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {currentAccount ? (
              <>
                <Link href="/profile">
                  <div className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors">
                    <FaUser />
                    <span className="font-medium">Profile</span>
                  </div>
                </Link>
                {userRole === 'admin' && (
                  <Link href="/admin">
                    <div className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors">
                      <FaCog />
                      <span className="font-medium">Admin</span>
                    </div>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-gray-200">
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {isCopied ? (
                      <span className="text-green-400 text-sm">Copied!</span>
                    ) : (
                      <FaCopy />
                    )}
                  </button>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <span className="text-gray-300 hover:text-green-400 font-medium transition-colors">
                    Login
                  </span>
                </Link>
                <button
                  onClick={connectWallet}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Connect Wallet
                </button>
              </>
            )}
            <Link href="/campaigns/create">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Create Campaign
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;