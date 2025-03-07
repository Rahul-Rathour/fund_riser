import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import CampaignList from '../components/Campaign/CampaignList';
import Link from 'next/link';
import { CATEGORIES } from '../utils/categories';

export default function Campaigns() {
  const { currentAccount } = useContext(AuthContext);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [searchTerm, setSearchTerm] = useState(''); // State for search term (e.g., title)

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
      <h1 className="text-3xl font-bold mb-6">All Campaigns</h1>

      {/* Search Bar with Category Filter and Title Search */}
      <div className="mb-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Category Filter */}
        <div className="w-full md:w-1/3">
          <label className="block text-gray-300 font-medium mb-1">Filter by Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((category, index) => (
              <option key={index} value={index} className="text-black">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Title Search */}
        <div className="w-full md:w-1/3">
          <label className="block text-gray-300 font-medium mb-1">Search by Title</label>
          <input
            type="text"
            placeholder="Enter campaign title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <CampaignList
        refreshTrigger={refreshTrigger}
        isAdmin={false}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm} // Pass searchTerm as a prop
      />
    </div>
  );
}