import React from 'react';
import Link from 'next/link';
import { FaList, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 w-64 min-h-screen p-4 text-white fixed">
      <ul className="space-y-2">
        <li>
          <Link href="/campaigns" className="flex items-center text-gray-300 hover:text-green-400">
            <FaList className="mr-2" /> All Campaigns
          </Link>
        </li>
        <li>
          <Link href="/profile" className="flex items-center text-gray-300 hover:text-green-400">
            <FaUser className="mr-2" /> Profile
          </Link>
        </li>
        <li>
          <Link href="/admin" className="flex items-center text-gray-300 hover:text-green-400">
            <FaCog className="mr-2" /> Admin
          </Link>
        </li>
        <li>
          <Link href="/login" className="flex items-center text-gray-300 hover:text-green-400">
            <FaSignOutAlt className="mr-2" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;