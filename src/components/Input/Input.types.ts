import React from 'react';

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  clearable?: boolean;
}
