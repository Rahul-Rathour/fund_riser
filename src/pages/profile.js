import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getContract } from '../blockchain/contract';
import { CATEGORIES } from '../utils/categories';
import { ethers } from 'ethers';
import Link from 'next/link';

export default function Profile() {
  const { currentAccount } = useContext(AuthContext);
  const [createdCampaigns, setCreatedCampaigns] = useState([]);
  const [contributedCampaigns, setContributedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentAccount) return;

    const fetchProfileData = async () => {
      try {
        const contract = await getContract();

        // Fetch created campaigns using the new getUserCampaigns function
        const campaignIds = await contract.getUserCampaigns(currentAccount);
        const created = [];
        for (let i = 0; i < campaignIds.length; i++) {
          const id = campaignIds[i].toNumber();
          const campaign = await contract.campaigns(id);
          created.push({ id, ...campaign });
        }
        setCreatedCampaigns(created);

        // Fetch contributed campaigns
        const campaignCount = await contract.campaignCount();
        const contributed = [];
        for (let id = 1; id <= campaignCount.toNumber(); id++) {
          const amount = await contract.contributions(currentAccount, id);
          if (amount > 0) {
            const campaign = await contract.campaigns(id);
            contributed.push({
              id,
              ...campaign,
              contributedAmount: ethers.utils.formatEther(amount),
            });
          }
        }
        setContributedCampaigns(contributed);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentAccount]);

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

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Wallet Address</h2>
        <p className="text-gray-400">{currentAccount}</p>
      </div>

      {/* Created Campaigns Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Created Campaigns</h2>
        {createdCampaigns.length === 0 ? (
          <p className="text-gray-400">You have not created any campaigns.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {createdCampaigns.map((campaign) => {
              const raised = parseFloat(ethers.utils.formatEther(campaign.raised));
              const goal = parseFloat(ethers.utils.formatEther(campaign.goal));
              const progress = Math.min((raised / goal) * 100, 100);

              return (
                <div key={campaign.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold text-white">{campaign.title}</h3>
                  <p className="text-gray-300 truncate">{campaign.description.substring(0, 50)}...</p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 mt-1">
                    Raised: {raised.toFixed(2)} ETH / {goal.toFixed(2)} ETH ({progress.toFixed(2)}%)
                  </p>
                  <p className="text-gray-400">Category: {CATEGORIES[campaign.category]}</p>
                  <p className="text-gray-400">
                    Deadline: {new Date(campaign.deadline * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400">Location: {campaign.location}</p>
                  <Link href={`/campaigns/${campaign.id}`}>
                    <button className="mt-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
                      View Details
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Contributed Campaigns Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Contributed Campaigns</h2>
        {contributedCampaigns.length === 0 ? (
          <p className="text-gray-400">You have not contributed to any campaigns.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributedCampaigns.map((campaign) => {
              const raised = parseFloat(ethers.utils.formatEther(campaign.raised));
              const goal = parseFloat(ethers.utils.formatEther(campaign.goal));
              const progress = Math.min((raised / goal) * 100, 100);

              return (
                <div key={campaign.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold text-white">{campaign.title}</h3>
                  <p className="text-gray-300 truncate">{campaign.description.substring(0, 50)}...</p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 mt-1">
                    Raised: {raised.toFixed(2)} ETH / {goal.toFixed(2)} ETH ({progress.toFixed(2)}%)
                  </p>
                  <p className="text-gray-400">Contributed: {parseFloat(campaign.contributedAmount).toFixed(2)} ETH</p>
                  <p className="text-gray-400">Category: {CATEGORIES[campaign.category]}</p>
                  <p className="text-gray-400">
                    Deadline: {new Date(campaign.deadline * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400">Location: {campaign.location}</p>
                  <Link href={`/campaigns/${campaign.id}`}>
                    <button className="mt-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
                      View Details
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}