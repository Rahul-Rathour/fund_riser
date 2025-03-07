import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is CrowdPulse?',
      answer: 'CrowdPulse is a decentralized crowdfunding platform built on Ethereum, allowing creators to fund their projects transparently and securely.',
    },
    {
      question: 'How do I create a campaign?',
      answer: 'Connect your wallet, go to "Create Campaign," fill out the form with your project details, and submit. Your campaign will be live immediately.',
    },
    {
      question: 'How do I donate to a campaign?',
      answer: 'Browse campaigns, select one you like, enter the amount in ETH you wish to donate, and confirm the transaction through your wallet.',
    },
    {
      question: 'What happens if a campaign doesn’t meet its goal?',
      answer: 'If a campaign doesn’t meet its goal by the deadline, it will be marked as inactive, and creators cannot withdraw funds.',
    },
    {
      question: 'How can I contact support?',
      answer: 'Visit our Contact page to reach out to our support team. We’re here to help!',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 text-left text-gray-300 hover:text-green-400 transition-colors flex justify-between items-center"
              >
                <span className="font-medium">{faq.question}</span>
                <span>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-400">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}