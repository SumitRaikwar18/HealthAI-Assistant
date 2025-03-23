
import React from 'react';
import { Avatar } from '@progress/kendo-react-layout';

interface KendoAvatarProps {
  src?: string;
  alt?: string;
  type?: 'circle' | 'square';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  initials?: string;
}

const KendoAvatar: React.FC<KendoAvatarProps> = ({
  src,
  alt = 'Avatar',
  type = 'circle',
  size = 'medium',
  className = '',
  initials
}) => {
  return (
    <Avatar
      type={type}
      size={size}
      className={className}
    >
      {src ? <img src={src} alt={alt} /> : (initials || 'U')}
    </Avatar>
  );
};

export default KendoAvatar;
