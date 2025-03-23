
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';

interface KendoButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const KendoButton: React.FC<KendoButtonProps> = ({ 
  primary = true, 
  children, 
  onClick,
  className = ''
}) => {
  return (
    <Button
      themeColor={primary ? 'primary' : 'base'}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default KendoButton;
