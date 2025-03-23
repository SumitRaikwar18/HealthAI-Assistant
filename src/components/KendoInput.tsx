
import React from 'react';
import { Input } from '@progress/kendo-react-inputs';

interface KendoInputProps {
  value: string;
  onChange: (event: any) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  type?: string;
  className?: string;
}

const KendoInput: React.FC<KendoInputProps> = ({
  value,
  onChange,
  placeholder = '',
  name,
  id,
  type = 'text',
  className = ''
}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      id={id}
      type={type}
      className={className}
    />
  );
};

export default KendoInput;
