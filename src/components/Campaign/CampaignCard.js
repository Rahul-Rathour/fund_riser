import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getContract } from '../../blockchain/contract';
import { ethers } from 'ethers';
import { CATEGORIES } from '../../utils/categories';

const CampaignCard = ({ campaign, id, onDelete }) => {
  const { currentAccount } = useContext(AuthContext);
  const [donation, setDonation] = useState('');
  const [isDonating, setIsDonating] = useState(false);

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

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-white">{campaign.title}</h3>
      <p className="text-gray-300">{campaign.description}</p>
      <p className="text-gray-400">Goal: {ethers.utils.formatEther(campaign.goal)} ETH</p>
      <p className="text-gray-400">Raised: {ethers.utils.formatEther(campaign.raised)} ETH</p>
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
          disabled={isDonating || !campaign.active}
        />
        <button
          onClick={handleDonate}
          disabled={isDonating || !campaign.active}
          className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-600 transition-colors"
        >
          {isDonating ? 'Donating...' : 'Donate'}
        </button>
      </div>
      {onDelete && campaign.active && (
        <button
          onClick={() => onDelete(id)}
          className="mt-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CampaignCard;