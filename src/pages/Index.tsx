
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';

const features = [
  {
    title: "Symptom Analysis",
    description: "Get instant analysis of your symptoms with AI-powered insights",
    icon: "activity",
    colSpan: 1,
    rowSpan: 1
  },
  {
    title: "Healthcare Chat",
    description: "Chat with our AI assistant about any health concerns or questions",
    icon: "message-circle",
    colSpan: 1,
    rowSpan: 1
  },
  {
    title: "Privacy Focused",
    description: "Your health data stays private and secure with our advanced protection",
    icon: "shield",
    colSpan: 1,
    rowSpan: 1
  },
  {
    title: "24/7 Availability",
    description: "Access health insights anytime, anywhere with our always-on service",
    icon: "clock",
    colSpan: 1,
    rowSpan: 1
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E6F0FA] to-white">
      <Navbar />
      
      {/* Hero Section with improved design */}
      <div className="container mx-auto px-4 py-10 md:py-20 text-center">
        <div className="inline-block mb-6 bg-blue-100 rounded-full px-3 py-1 text-blue-600 text-sm font-medium">
          AI-Powered Health Assistant
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0057FF] to-[#5B9CFF]">
          Your Personal Health Assistant
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Powered by advanced AI technology to help you understand your health better. 
          Get instant analysis and personalized health advice.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/symptom-analyzer">
            <button className="bg-[#0057FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0046CC] transition-colors">
              Analyze Symptoms
            </button>
          </Link>
          <Link to="/chat-assistant">
            <button className="border border-[#0057FF] text-[#0057FF] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Chat with AI
            </button>
          </Link>
        </div>

        {/* Popular Health Topics */}
        <div className="mt-8">
          <p className="text-gray-600 mb-2">Popular Health Topics:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Allergies", "Stress", "Sleep", "Nutrition", "Fitness"].map((topic, index) => (
              <span 
                key={index} 
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition-colors"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features for Mobile */}
      <div className="container mx-auto px-4 py-10 md:hidden">
        <h2 className="text-3xl font-bold text-center mb-6">Why Choose HealthAI?</h2>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features Section with Grid for desktop */}
      <div className="container mx-auto px-4 py-10 bg-white rounded-t-3xl shadow-inner hidden md:block">
        <h2 className="text-3xl font-bold text-center mb-3">Why Choose HealthAI Assistant?</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Our AI-powered platform provides accurate, personalized health insights when you need them most.
        </p>
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="p-2">
              <FeatureCard 
                title={feature.title}
                description={feature.description}
                icon={feature.icon as any}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trust section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-blue-50 max-w-4xl mx-auto shadow-md p-6 rounded-lg">
          <div className="flex items-center justify-center mb-4">
            <Shield size={24} className="text-[#0057FF] mr-2" />
            <h3 className="text-2xl font-semibold">Your Health Data Stays Private</h3>
          </div>
          <p className="text-gray-600 mb-6">
            We prioritize your privacy. Your health information is never stored, and all analyses are performed in real-time.
          </p>
          <p className="text-sm text-gray-500">
            Note: HealthAI Assistant is not a replacement for professional medical advice.
            Always consult with healthcare providers for medical concerns.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
