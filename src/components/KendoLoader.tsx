
import React from 'react';
import { Loader } from '@progress/kendo-react-indicators';

interface KendoLoaderProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'pulsing' | 'infinite-spinner' | 'converging-spinner';
  className?: string;
}

const KendoLoader: React.FC<KendoLoaderProps> = ({
  size = 'medium',
  type = 'infinite-spinner',
  className = ''
}) => {
  return (
    <Loader
      size={size}
      type={type}
      className={className}
    />
  );
};

export default KendoLoader;
