
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="bg-white shadow-sm py-2 px-4 flex justify-center">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#0057FF] flex items-center">
              <span className="mr-2">🩺</span>
              HealthAI Assistant
            </Link>
          </div>
          
          <div>
            {isMobile ? (
              <button 
                onClick={toggleMenu} 
                className="text-gray-700 p-2"
              >
                <Menu size={24} />
              </button>
            ) : (
              <div className="flex space-x-6 justify-center">
                <Link to="/" className={`px-3 py-2 transition-colors ${isActive('/') ? 'text-[#0057FF] font-medium' : 'text-gray-700 hover:text-[#0057FF]'}`}>
                  Home
                </Link>
                <Link to="/symptom-analyzer" className={`px-3 py-2 transition-colors ${isActive('/symptom-analyzer') ? 'text-[#0057FF] font-medium' : 'text-gray-700 hover:text-[#0057FF]'}`}>
                  Symptom Analyzer
                </Link>
                <Link to="/chat-assistant" className={`px-3 py-2 transition-colors ${isActive('/chat-assistant') ? 'text-[#0057FF] font-medium' : 'text-gray-700 hover:text-[#0057FF]'}`}>
                  Chat Assistant
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="py-2 space-y-1">
              <Link 
                to="/" 
                className={`block py-2 transition-colors ${isActive('/') ? 'text-[#0057FF] font-medium' : 'text-gray-700 hover:text-[#0057FF]'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/symptom-analyzer" 
                className={`block py-2 transition-colors ${isActive('/symptom-analyzer') ? 'text-[#0057FF] font-medium' : 'text-gray-700 hover:text-[#0057FF]'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Symptom Analyzer
              </Link>
              <Link 
                to="/chat-assistant" 
                className={`block py-2 transition-colors ${isActive('/chat-assistant') ? 'text-[#0057FF] font-medium' : 'text-gray-700 hover:text-[#0057FF]'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Chat Assistant
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
