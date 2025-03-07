import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <div className="max-w-5xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">About CrowdPulse</h1>
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <p className="text-gray-300 leading-relaxed mb-6">
            CrowdPulse is a decentralized crowdfunding platform built on the Ethereum blockchain, empowering creators to bring their ideas to life while providing backers with a transparent and secure way to support meaningful projects. Our mission is to democratize funding, connecting passionate creators with a global community of supporters.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            Founded in 2025, CrowdPulse leverages blockchain technology to ensure every transaction is secure, immutable, and trustless. Whether you're raising funds for education, health, environmental initiatives, or social causes, our platform provides the tools you need to succeed.
          </p>
          <div className="text-center">
            <Link href="/campaigns">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium">
                Explore Campaigns
              </button>
            </Link>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src="https://via.placeholder.com/150" alt="Team Member" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Rahul</h3>
              <p className="text-gray-400">Founder & CEO</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src="https://via.placeholder.com/150" alt="Team Member" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Deepanshu</h3>
              <p className="text-gray-400">CTO</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <img src="https://via.placeholder.com/150" alt="Team Member" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Harshita</h3>
              <p className="text-gray-400">Community Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}