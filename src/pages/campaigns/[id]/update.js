import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getContract } from '@/src/blockchain/contract';

export default function PostUpdate() {
  const router = useRouter();
  const { id } = router.query;
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!message) {
        throw new Error('Update message is required.');
      }

      const contract = await getContract();
      const tx = await contract.addUpdate(id, message);
      await tx.wait();
      alert('Update posted successfully!');
      router.push(`/campaigns/${id}`);
    } catch (err) {
      console.error('Error posting update:', err);
      setError('Failed to post update: ' + (err.message || 'Try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Post Update for Campaign #{id}</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Update Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your update message"
            rows="6"
            disabled={isSubmitting}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 disabled:bg-gray-600 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Update'}
        </button>
      </form>
    </div>
  );
}