import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getContract } from '@/src/blockchain/contract';
import { ethers } from 'ethers';
import { CATEGORIES } from '@/src/utils/categories';

export default function Home() {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCampaigns = async () => {
      try {
        const contract = await getContract();
        const count = await contract.campaignCount();
        const campaigns = [];
        for (let i = 1; i <= count.toNumber() && campaigns.length < 3; i++) {
          const campaign = await contract.campaigns(i);
          if (campaign.active) {
            campaigns.push({ ...campaign, id: i });
          }
        }
        setFeaturedCampaigns(campaigns);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setLoading(false);
      }
    };

    fetchFeaturedCampaigns();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 animate-fadeIn">Fund Dreams with CrowdPulse</h1>
          <p className="text-xl text-gray-300 mb-8 animate-fadeIn animation-delay-200">
            A decentralized crowdfunding platform built on Ethereum. Support projects you believe in, securely and transparently.
          </p>
          <div className="space-x-4">
            <Link href="/campaigns">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium animate-fadeIn animation-delay-400">
                Explore Campaigns
              </button>
            </Link>
            <Link href="/campaigns/create">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium animate-fadeIn animation-delay-400">
                Start a Campaign
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Campaigns</h2>
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCampaigns.length === 0 ? (
              <p className="text-center text-gray-400 col-span-3">No active campaigns yet.</p>
            ) : (
              featuredCampaigns.map((campaign) => {
                const raised = parseFloat(ethers.utils.formatEther(campaign.raised));
                const goal = parseFloat(ethers.utils.formatEther(campaign.goal));
                const progress = Math.min((raised / goal) * 100, 100);

                return (
                  <div key={campaign.id} className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                    {campaign.imageUrl && (
                      <img
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                    <p className="text-gray-400 mb-4 truncate">{campaign.description}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Raised: {raised.toFixed(2)} ETH / {goal.toFixed(2)} ETH</p>
                    <Link href={`/campaigns/${campaign.id}`}>
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="bg-gray-800 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300 italic mb-4">
              "CrowdPulse helped me fund my education project with ease. The transparency of the blockchain gave my backers confidence!"
            </p>
            <p className="text-gray-400 font-medium">— Sarah K., Creator</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300 italic mb-4">
              "I love supporting projects on CrowdPulse. It’s secure, and I can see exactly where my funds are going."
            </p>
            <p className="text-gray-400 font-medium">— Michael T., Backer</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-gray-300 mb-8">Join our community and start funding or creating impactful projects today.</p>
        <Link href="/campaigns">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
}