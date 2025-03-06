import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserProfile from '../components/Profile/UserProfile';
import Link from 'next/link';

export default function Profile() {
  const { currentAccount } = useContext(AuthContext);

  if (!currentAccount) {
    return (
      <div className="bg-gray-900 min-h-screen p-4 text-center text-white">
        <p className="text-lg text-gray-400 mb-4">Please connect your wallet to view your profile.</p>
        <Link href="/login">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
            Connect Wallet
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 text-white">
      <UserProfile />
    </div>
  );
}