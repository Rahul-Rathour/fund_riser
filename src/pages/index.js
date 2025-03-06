import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { currentAccount } = useContext(AuthContext);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Venture Crowdfunding</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
          Empower your dreams or support meaningful causes with our decentralized platform.
        </p>
        {!currentAccount ? (
          <Link href="/login">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
              Connect Now
            </button>
          </Link>
        ) : (
          <Link href="/campaigns">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
              Explore Campaigns
            </button>
          </Link>
        )}
      </section>
    </div>
  );
}