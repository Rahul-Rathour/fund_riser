import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getContract } from '../../blockchain/contract';
import { ethers } from 'ethers';
import { CATEGORIES } from '../../utils/categories';
import Link from 'next/link';
import { FaClock, FaMapMarkerAlt, FaTag, FaWallet } from 'react-icons/fa';

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
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
      {/* Image Section with Overlay */}
      {campaign.imageUrl && (
        <div className="relative">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-48 object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      {/* Badges for Campaign Status */}
      <div className="absolute top-4 right-4 flex space-x-2">
        {isGoalMet && (
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Goal Met
          </span>
        )}
        {isDeadlinePassed && (
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Ended
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{campaign.title}</h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{campaign.description}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400 text-sm">Progress</span>
            <span className="text-green-400 text-sm font-semibold">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-gray-400 text-sm">
          <div className="flex items-center">
            <FaTag className="mr-1 text-gray-500" />
            <span>{CATEGORIES[campaign.category]}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1 text-gray-500" />
            <span>{campaign.location}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1 text-gray-500" />
            <span>{new Date(campaign.deadline * 1000).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <FaWallet className="mr-1 text-gray-500" />
            <span>Raised: {raised.toFixed(2)} ETH</span>
          </div>
          <div className="flex items-center col-span-2">
            <FaWallet className="mr-1 text-gray-500" />
            <span>Desired Fund: {goal.toFixed(2)} ETH</span>
          </div>
        </div>

        {/* Donation Input and Button */}
        <div className="flex space-x-2 mb-4">
          <input
            type="number"
            placeholder="Amount in ETH"
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            disabled={isDonating || isGoalMet || isDeadlinePassed || !campaign.active}
          />
          <button
            onClick={handleDonate}
            disabled={isDonating || isGoalMet || isDeadlinePassed || !campaign.active}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isDonating ? 'Donating...' : 'Donate'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link href={`/campaigns/${id}`}>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
              View Details
            </button>
          </Link>
          {currentAccount === campaign.creator && (
            <Link href={`/campaigns/${id}/update`}>
              <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-2 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300">
                Post Update
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;