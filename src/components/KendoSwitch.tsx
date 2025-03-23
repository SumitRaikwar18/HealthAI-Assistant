
import React from 'react';
import { Switch } from '@progress/kendo-react-inputs';

interface KendoSwitchProps {
  checked: boolean;
  onChange: (event: any) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const KendoSwitch: React.FC<KendoSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  className = ''
}) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      label={label}
      className={className}
    />
  );
};

export default KendoSwitch;
