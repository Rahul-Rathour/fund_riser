import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import { getContract } from '../../blockchain/contract';

const CampaignList = ({ isAdmin = false, refreshTrigger }) => {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    try {
      const contract = await getContract();
      const count = await contract.campaignCount();
      const campaignArray = [];
      for (let i = 1; i <= count.toNumber(); i++) {
        const campaign = await contract.campaigns(i);
        campaignArray.push({ ...campaign, id: i });
      }
      setCampaigns(campaignArray);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      const contract = await getContract();
      const tx = await contract.deleteCampaign(id);
      await tx.wait();
      setCampaigns(campaigns.map(c => 
        c.id === id ? { ...c, active: false } : c
      ));
    } catch (err) {
      console.error('Error deleting campaign:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {campaigns.length === 0 ? (
        <p className="text-gray-400">There are no campaigns.</p>
      ) : (
        campaigns.map((campaign) => (
          <CampaignCard 
            key={campaign.id} 
            campaign={campaign} 
            id={campaign.id}
            onDelete={isAdmin ? handleDelete : null}
          />
        ))
      )}
    </div>
  );
};

export default CampaignList;