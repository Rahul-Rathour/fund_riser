import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CampaignList from '../Campaign/CampaignList';

const AdminDashboard = () => {
  const { userRole } = useContext(AuthContext);

  if (userRole !== 'admin') {
    return <div className="p-4 text-red-500 bg-gray-900 text-white">Access Denied</div>;
  }

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <CampaignList isAdmin={true} />
    </div>
  );
};

export default AdminDashboard;