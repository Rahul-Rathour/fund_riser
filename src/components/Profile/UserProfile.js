import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getContract } from '../../blockchain/contract';
import CampaignCard from '../Campaign/CampaignCard';

const UserProfile = () => {
  const { currentAccount } = useContext(AuthContext);
  const [createdCampaigns, setCreatedCampaigns] = useState([]);
  const [contributedCampaigns, setContributedCampaigns] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!currentAccount) return;
      try {
        const contract = await getContract();
        
        const campaignIds = await contract.userCampaigns(currentAccount);
        const created = [];
        for (let id of campaignIds) {
          const campaign = await contract.campaigns(id.toNumber());
          created.push({ ...campaign, id: id.toNumber() });
        }
        setCreatedCampaigns(created);

        const count = await contract.campaignCount();
        const contributed = [];
        for (let i = 1; i <= count.toNumber(); i++) {
          const amount = await contract.contributions(currentAccount, i);
          if (amount.toString() !== '0') {
            const campaign = await contract.campaigns(i);
            contributed.push({ ...campaign, id: i, contributedAmount: amount });
          }
        }
        setContributedCampaigns(contributed);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfileData();
  }, [currentAccount]);

  if (!currentAccount) {
    return <div className="p-4 bg-gray-900 text-white">Please connect your wallet</div>;
  }

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p className="mb-4 text-gray-400">Address: {currentAccount}</p>

      <h3 className="text-xl font-semibold mb-2 text-gray-300">Created Campaigns</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {createdCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} id={campaign.id} />
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-2 text-gray-300">Contributed Campaigns</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contributedCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-gray-800 p-4 rounded-lg shadow">
            <CampaignCard campaign={campaign} id={campaign.id} />
            <p className="text-gray-400">Contributed: {ethers.utils.formatEther(campaign.contributedAmount)} ETH</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;