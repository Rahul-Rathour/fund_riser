import React from 'react';
import { ethers } from 'ethers';
import { getContract } from '../../blockchain/contract';
import { CATEGORIES } from '../../utils/categories';

const CampaignForm = ({
  currentAccount,
  formData,
  setFormData,
  errors,
  setErrors,
  isSubmitting,
  setIsSubmitting,
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
  onCampaignCreated,
}) => {
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Title is required';
    if (!formData.story.trim()) newErrors.story = 'Story is required';
    if (!formData.goal || parseFloat(formData.goal) <= 0) newErrors.goal = 'Goal must be a positive number';
    if (formData.category === null || formData.category === undefined) newErrors.category = 'Category is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install it to proceed.');
      }

      const contract = await getContract();
      const combinedDescription = `${formData.description}\n\n${formData.story}`;
      const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);
      const tx = await contract.createCampaign(
        formData.title,
        combinedDescription,
        ethers.utils.parseEther(formData.goal),
        formData.category,
        deadlineTimestamp,
        formData.location
      );
      await tx.wait();
      setSuccessMessage('Campaign created successfully!');
      setFormData({
        title: '',
        description: '',
        story: '',
        goal: '',
        category: 0,
        deadline: '',
        location: '',
      });
      if (onCampaignCreated) onCampaignCreated();
    } catch (err) {
      let errorMsg = 'Failed to create campaign.';
      if (err.code === 4001) errorMsg = 'Transaction rejected by user.';
      else if (err.message.includes('MetaMask')) errorMsg = err.message;
      else if (err.reason) errorMsg = err.reason;
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      story: '',
      goal: '',
      category: 0,
      deadline: '',
      location: '',
    });
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Start a Campaign</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 font-medium mb-1">Your Name *</label>
          <input
            type="text"
            placeholder="John Doe"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.title ? 'ring-red-500' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-1">Campaign Title *</label>
          <input
            type="text"
            placeholder="Write a Title..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.description ? 'ring-red-500' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-1">Story *</label>
          <textarea
            placeholder="Write your Story..."
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            className={`w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.story ? 'ring-red-500' : ''
            }`}
            rows="4"
            disabled={isSubmitting}
          />
          {errors.story && <p className="text-red-500 text-sm mt-1">{errors.story}</p>}
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-1">Goal Amount (ETH) *</label>
          <input
            type="number"
            placeholder="Enter funding goal"
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            className={`w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.goal ? 'ring-red-500' : ''
            }`}
            step="0.01"
            min="0"
            disabled={isSubmitting}
          />
          {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal}</p>}
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-1">Deadline *</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className={`w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.deadline ? 'ring-red-500' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-1">Location *</label>
          <input
            type="text"
            placeholder="Enter location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={`w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.location ? 'ring-red-500' : ''
            }`}
            disabled={isSubmitting}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: Number(e.target.value) })}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            {CATEGORIES.map((cat, index) => (
              <option key={index} value={index} className="text-black">{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={!currentAccount || isSubmitting}
            className={`w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-600 transition-colors`}
          >
            {isSubmitting ? 'Creating...' : 'Start a Campaign'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 disabled:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;