
import React from 'react';
import { Badge } from '@progress/kendo-react-indicators';

interface KendoBadgeProps {
  themeColor?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
  rounded?: 'small' | 'medium' | 'large' | 'full';
}

const KendoBadge: React.FC<KendoBadgeProps> = ({
  themeColor = 'primary',
  children,
  className = '',
  rounded = 'medium'
}) => {
  return (
    <Badge
      themeColor={themeColor}
      className={className}
      rounded={rounded}
    >
      {children}
    </Badge>
  );
};

export default KendoBadge;
