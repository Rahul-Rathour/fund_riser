import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getContract } from '../../blockchain/contract';
import { ethers } from 'ethers';
import { CATEGORIES } from '@/src/utils/categories';
import Link from 'next/link';

const CampaignCard = ({ campaign, id }) => {
  const { currentAccount } = useContext(AuthContext);
  const [donation, setDonation] = useState('');
  const [isDonating, setIsDonating] = useState(false);
  const [isGoalMet, setIsGoalMet] = useState(false);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  useEffect(() => {
    const raised = parseFloat(ethers.utils.formatEther(campaign.raised));
    const goal = parseFloat(ethers.utils.formatEther(campaign.goal));
    const currentTime = Math.floor(Date.now() / 1000);
    setIsGoalMet(raised >= goal);
    setIsDeadlinePassed(currentTime > campaign.deadline);
  }, [campaign.raised, campaign.goal, campaign.deadline]);

  const handleDonate = async () => {
    if (!donation || parseFloat(donation) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    setIsDonating(true);
    try {
      const contract = await getContract();
      const tx = await contract.donate(id, {
        value: ethers.utils.parseEther(donation),
      });
      await tx.wait();
      alert('Donation successful!');
      setDonation('');
    } catch (err) {
      console.error('Donation error:', err);
      alert('Failed to donate: ' + (err.message || err.reason || 'Try again.'));
    } finally {
      setIsDonating(false);
    }
  };

  const raised = parseFloat(ethers.utils.formatEther(campaign.raised));
  const goal = parseFloat(ethers.utils.formatEther(campaign.goal));
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-white">{campaign.title}</h3>
      <p className="text-gray-300 truncate">{campaign.description.substring(0, 50)}...</p>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-400 mt-1">Raised: {raised.toFixed(2)} ETH / {goal.toFixed(2)} ETH ({progress.toFixed(2)}%)</p>
      <p className="text-gray-400">Category: {CATEGORIES[campaign.category]}</p>
      <p className="text-gray-400">Deadline: {new Date(campaign.deadline * 1000).toLocaleDateString()}</p>
      <p className="text-gray-400">Location: {campaign.location}</p>
      <div className="mt-2 flex space-x-2">
        <input
          type="number"
          placeholder="Amount in ETH"
          value={donation}
          onChange={(e) => setDonation(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={isDonating || isGoalMet || isDeadlinePassed || !campaign.active}
        />
        <button
          onClick={handleDonate}
          disabled={isDonating || isGoalMet || isDeadlinePassed || !campaign.active}
          className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-600 transition-colors"
        >
          {isDonating ? 'Donating...' : 'Donate'}
        </button>
      </div>
      {isGoalMet && <p className="text-green-400 mt-2">Goal met!</p>}
      {isDeadlinePassed && <p className="text-red-400 mt-2">Campaign ended</p>}
      <Link href={`/campaigns/${id}`}>
        <button className="mt-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default CampaignCard;