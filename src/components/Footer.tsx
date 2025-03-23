
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0057FF] text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-white/80">
          <p>© {currentYear} HealthAI Assistant. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This application is for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
