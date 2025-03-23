
import React from 'react';
import { Label } from '@progress/kendo-react-labels';

interface KendoLabelProps {
  text: string;
  htmlFor?: string;
  className?: string;
}

const KendoLabel: React.FC<KendoLabelProps> = ({ 
  text, 
  htmlFor,
  className = ''
}) => {
  return (
    <Label 
      htmlFor={htmlFor} 
      className={className}
    >
      {text}
    </Label>
  );
};

export default KendoLabel;
