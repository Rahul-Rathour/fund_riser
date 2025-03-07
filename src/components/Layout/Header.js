import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';
import { FaUser, FaCog, FaCopy, FaBars, FaSignOutAlt, FaCaretDown } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const { currentAccount, userRole, connectWallet, logout } = useContext(AuthContext);
  const [isCopied, setIsCopied] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
      {/* Logo/Brand */}
      <div className="flex items-center space-x-3">
        <button onClick={handleToggleSidebar} className="md:hidden text-white text-2xl">
          <FaBars />
        </button>
        <Link href="/">
          <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer hover:text-green-400 transition-colors">
            CrowdPulse
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/">
          <span className="text-gray-300 hover:text-green-400 font-medium transition-colors cursor-pointer">
            Home
          </span>
        </Link>
        <Link href="/campaigns">
          <span className="text-gray-300 hover:text-green-400 font-medium transition-colors cursor-pointer">
            Campaigns
          </span>
        </Link>
        <Link href="/about">
          <span className="text-gray-300 hover:text-green-400 font-medium transition-colors cursor-pointer">
            About Us
          </span>
        </Link>
        <Link href="/faq">
          <span className="text-gray-300 hover:text-green-400 font-medium transition-colors cursor-pointer">
            FAQ
          </span>
        </Link>
        <Link href="/contact">
          <span className="text-gray-300 hover:text-green-400 font-medium transition-colors cursor-pointer">
            Contact
          </span>
        </Link>

        {currentAccount ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors"
            >
              <FaUser />
              <span className="font-medium">Account</span>
              <FaCaretDown />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 text-gray-400">
                  <span className="block text-sm truncate">
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {isCopied ? (
                      <span className="text-green-400 text-sm">Copied!</span>
                    ) : (
                      <FaCopy className="inline-block" />
                    )}
                  </button>
                </div>
                <Link href="/profile">
                  <span className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors cursor-pointer">
                    Profile
                  </span>
                </Link>
                {userRole === 'admin' && (
                  <Link href="/admin">
                    <span className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors cursor-pointer">
                      Admin
                    </span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors"
                >
                  <FaSignOutAlt className="inline-block mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
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
            <Link href="/">
              <span className="text-gray-300 hover:text-green-400 font-medium transition-colors">
                Home
              </span>
            </Link>
            <Link href="/campaigns">
              <span className="text-gray-300 hover:text-green-400 font-medium transition-colors">
                Campaigns
              </span>
            </Link>
            <Link href="/about">
              <span className="text-gray-300 hover:text-green-400 font-medium transition-colors">
                About Us
              </span>
            </Link>
            <Link href="/faq">
              <span className="text-gray-300 hover:text-green-400 font-medium transition-colors">
                FAQ
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-300 hover:text-green-400 font-medium transition-colors">
                Contact
              </span>
            </Link>
            {currentAccount ? (
              <>
                <Link href="/profile">
                  <span className="text-gray-300 hover:text-green-400 font-medium transition-colors">
                    Profile
                  </span>
                </Link>
                {userRole === 'admin' && (
                  <Link href="/admin">
                    <span className="text-gray-300 hover:text-green-400 font-medium transition-colors">
                      Admin
                    </span>
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