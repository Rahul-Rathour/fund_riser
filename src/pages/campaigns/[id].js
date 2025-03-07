import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getContract } from '@/src/blockchain/contract';
import { CATEGORIES } from '@/src/utils/categories';
import { ethers } from 'ethers';

export default function CampaignDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchCampaign = async () => {
      try {
        const contract = await getContract();
        const campaignData = await contract.campaigns(id);
        setCampaign({
          ...campaignData,
          id: parseInt(id),
        });
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

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
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
      </div>
    </div>
  );
}