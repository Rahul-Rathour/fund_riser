import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CampaignForm from '../../components/Campaign/CampaignForm';
import Link from 'next/link';

export default function CreateCampaign() {
  const { currentAccount, userRole, setUserRole } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    story: '',
    goal: '',
    category: 0,
    deadline: '',
    location: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCampaignCreated = () => {
    if (userRole !== 'admin') setUserRole('creator');
  };

  if (!currentAccount) {
    return (
      <div className="bg-gray-900 min-h-screen p-4 text-center text-white">
        <p className="text-lg text-gray-400 mb-4">Please connect your wallet to create a campaign.</p>
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
      <h1 className="text-2xl font-bold mb-6">Start a Campaign</h1>
      <CampaignForm
        currentAccount={currentAccount}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        onCampaignCreated={handleCampaignCreated}
      />
      {successMessage && (
        <Link href="/campaigns">
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            View All Campaigns
          </button>
        </Link>
      )}
    </div>
  );
}