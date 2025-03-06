import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import CampaignList from '../components/Campaign/CampaignList';
import Link from 'next/link';

export default function Campaigns() {
  const { currentAccount } = useContext(AuthContext);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (!currentAccount) {
    return (
      <div className="bg-gray-900 min-h-screen p-4 text-center text-white">
        <p className="text-lg text-gray-400 mb-4">Please connect your wallet to view or create campaigns.</p>
        <Link href="/login">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
            Connect Wallet
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold mb-6">All Campaigns (0)</h1>
      <p className="mb-4 text-gray-400">There are no campaigns.</p>
      <CampaignList refreshTrigger={refreshTrigger} />
    </div>
  );
}