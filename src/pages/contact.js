import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://formspree.io/f/xvgkpqad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      const result = await response.json();
      if (result.ok) {
        setSuccess('Your message has been sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message. Please check your input.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your name"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your email"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your message"
                rows="5"
                required
                disabled={isSubmitting}
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Contact Information */}
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-400">Email: rahulrathor@crowdpulse.com</p>
            <p className="text-gray-400">Phone: +91 8279460578</p>
            <p className="text-gray-400">Address: 123 Izzat Nagar , Smart City, Bareilly</p>
          </div>
        </div>
      </div>
    </div>
  );
}