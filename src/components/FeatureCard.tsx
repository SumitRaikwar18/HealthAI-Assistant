
import React from 'react';
import { Card } from '@progress/kendo-react-layout';
import { Activity, MessageCircle, Shield, Clock } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: 'activity' | 'message-circle' | 'shield' | 'clock';
  isNew?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'activity':
        return <Activity size={32} className="text-[#0057FF]" />;
      case 'message-circle':
        return <MessageCircle size={32} className="text-[#0057FF]" />;
      case 'shield':
        return <Shield size={32} className="text-[#0057FF]" />;
      case 'clock':
        return <Clock size={32} className="text-[#0057FF]" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-lg">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 relative">
          {renderIcon()}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  );
};

export default FeatureCard;
