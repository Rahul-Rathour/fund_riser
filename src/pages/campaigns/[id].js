import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getContract } from '@/src/blockchain/contract';
import { CATEGORIES } from '@/src/utils/categories';
import { ethers } from 'ethers';
import Link from 'next/link';

export default function CampaignDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchCampaign = async () => {
      try {
        const contract = await getContract();
        const campaignData = await contract.campaigns(id);
        const updatesData = await contract.getCampaignUpdates(id);
        setCampaign({
          ...campaignData,
          id: parseInt(id),
        });
        setUpdates(updatesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching campaign:', err);
        setError('Failed to load campaign details.');
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!campaign) return <p className="text-white p-4">Campaign not found.</p>;

  const raised = parseFloat(ethers.utils.formatEther(campaign.raised));
  const goal = parseFloat(ethers.utils.formatEther(campaign.goal));
  const progress = Math.min((raised / goal) * 100, 100);
  const isCreator = campaign.creator === (typeof window !== 'undefined' ? window.ethereum.selectedAddress : null);
  const isEnded = campaign.deadline <= Math.floor(Date.now() / 1000);
  const canWithdraw = isCreator && isEnded && !campaign.fundsWithdrawn && raised >= goal;

  const handleWithdraw = async () => {
    if (window.confirm('Are you sure you want to withdraw funds?')) {
      try {
        const contract = await getContract();
        const tx = await contract.withdrawFunds(id);
        await tx.wait();
        alert('Funds withdrawn successfully!');
        // Refresh the page or update state
        fetchCampaign();
      } catch (err) {
        console.error('Withdrawal error:', err);
        alert('Failed to withdraw funds: ' + (err.message || 'Try again.'));
      }
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {campaign.imageUrl && (
          <div className="mb-6">
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
            />
          </div>
        )}
        <p className="text-gray-300 whitespace-pre-wrap">{campaign.description}</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-400 mt-2">Raised: {raised.toFixed(2)} ETH / {goal.toFixed(2)} ETH ({progress.toFixed(2)}%)</p>
        <p className="text-gray-400">Category: {CATEGORIES[campaign.category]}</p>
        <p className="text-gray-400">Deadline: {new Date(campaign.deadline * 1000).toLocaleDateString()}</p>
        <p className="text-gray-400">Location: {campaign.location}</p>
        <p className="text-gray-400">Status: {campaign.active ? 'Active' : 'Inactive'}</p>

        {/* Updates Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Updates</h2>
          {updates.length === 0 ? (
            <p className="text-gray-400">No updates yet.</p>
          ) : (
            <div className="space-y-4">
              {updates.map((update, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-300">{update.message}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Posted on: {new Date(update.timestamp * 1000).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Withdrawal Button */}
        {canWithdraw && (
          <button
            onClick={handleWithdraw}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Withdraw Funds ({raised.toFixed(2)} ETH)
          </button>
        )}
      </div>
    </div>
  );
}