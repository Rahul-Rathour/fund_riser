import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import { FaList, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { currentAccount, logout } = useContext(AuthContext); // Access logout directly
  const router = useRouter();

  const navItems = [
    { href: '/campaigns', label: 'All Campaigns', icon: <FaList /> },
    { href: '/profile', label: 'Profile', icon: <FaUser /> },
    { href: '/admin', label: 'Admin', icon: <FaCog /> },
    { action: () => logout(), label: 'Logout', icon: <FaSignOutAlt /> },
  ];

  return (
    <div
      className={`bg-gradient-to-b from-gray-800 to-gray-900 w-64 min-h-screen p-4 text-white fixed top-0 left-0 transform transition-transform duration-300 z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:shadow-lg`}
    >
      {/* User Profile Section */}
      {currentAccount && (
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold">Welcome</h2>
          <p className="text-gray-400 text-sm truncate">
            {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
          </p>
        </div>
      )}

      {/* Navigation Links */}
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href || item.label}>
            {item.href ? (
              <Link href={item.href}>
                <div
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                    router.pathname === item.href
                      ? 'bg-green-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-green-400'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ) : (
              <button
                onClick={item.action}
                className="w-full flex items-center space-x-2 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;