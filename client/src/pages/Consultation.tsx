import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ConsultationFormData {
  title: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

export default function Consultation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<ConsultationFormData>({
    title: '',
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleInputChange = (field: keyof ConsultationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          title: '',
          fullName: '',
          phone: '',
          email: '',
          message: '',
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-red-500">Pride Advisory</Link>
          <Link to="/" className="text-gray-600 hover:text-red-500">← Back to Home</Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Left Side - Contact Info */}
        <div className="bg-gray-50 p-8 lg:p-16 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">CONTACT US</h1>
          <p className="text-gray-600 mb-12 text-lg">
            Got questions or need help? We're here for you!<br />
            Drop us a message and we'll get back to you as soon as possible.
          </p>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-5 shadow-md flex-shrink-0">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Message or Call us via</h3>
                <a href="tel:0700MERISTEM" className="text-gray-600 hover:text-red-500 transition-colors">
                  0700MERISTEM
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-5 shadow-md flex-shrink-0">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email</h3>
                <a href="mailto:capital@meristemng.com" className="text-gray-600 hover:text-red-500 transition-colors">
                  capital@meristemng.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-5 shadow-md flex-shrink-0">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Address</h3>
                <p className="text-gray-600">20A Gerrard Road, Ikoyi 106104, Lagos</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-semibold text-lg mb-4">Follow us</h3>
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { name: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01' },
                { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-gradient-to-br from-red-400 via-red-500 to-pink-500 p-8 lg:p-16 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-8 lg:p-10 max-w-lg w-full">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">How Can We Assist You?</h2>
            <p className="text-gray-600 mb-6">
              Your satisfaction is our priority. Contact us today, and let's make sure you have the best experience with us.
            </p>

            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 animate-fade-in">
                <p className="font-medium">✓ Thank you!</p>
                <p className="text-sm">Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Mr, Mrs, Miss, etc"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="text-sm">
          © 2023 Copyright: Meristem | All Rights Reserved | 
          <a href="#" className="text-red-400 hover:underline ml-1">Terms and Conditions</a> | 
          <a href="#" className="text-red-400 hover:underline ml-1">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}