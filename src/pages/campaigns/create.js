import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getContract } from '../../blockchain/contract';
import { CATEGORIES } from '../../utils/categories';
import Link from 'next/link';
import { ethers } from 'ethers';

export default function CreateCampaign() {
  const { currentAccount } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // New state for image URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!title || !description || !goal || !category || !deadline || !location || !imageUrl) {
        throw new Error('All fields are required.');
      }

      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
      if (deadlineTimestamp < Math.floor(Date.now() / 1000)) {
        throw new Error('Deadline must be in the future.');
      }

      const goalInWei = ethers.utils.parseEther(goal);
      const contract = await getContract();
      const tx = await contract.createCampaign(
        title,
        description,
        goalInWei,
        parseInt(category),
        deadlineTimestamp,
        location,
        imageUrl // Pass the image URL
      );
      await tx.wait();

      // Reset form
      setTitle('');
      setDescription('');
      setGoal('');
      setCategory('');
      setDeadline('');
      setLocation('');
      setImageUrl(''); // Reset image URL
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Error creating campaign:', err);
      setError('Failed to create campaign: ' + (err.message || 'Try again.'));
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="bg-gray-900 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Create a New Campaign</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter campaign title"
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter campaign description"
            rows="4"
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Goal (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter goal in ETH"
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat, index) => (
              <option key={index} value={index} className="text-black">
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter campaign location"
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
            disabled={isSubmitting}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-600 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Campaign'}
        </button>
      </form>
    </div>
  );
}