
import React from 'react';
import { Chip } from '@progress/kendo-react-buttons';

interface KendoChipProps {
  text: string;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const KendoChip: React.FC<KendoChipProps> = ({
  text,
  removable = false,
  onRemove,
  className = ''
}) => {
  return (
    <Chip
      text={text}
      removable={removable}
      onRemove={onRemove}
      className={className}
    />
  );
};

export default KendoChip;
