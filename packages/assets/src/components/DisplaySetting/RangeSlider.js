import React from 'react';
import {RangeSlider, TextField} from '@shopify/polaris';

export default function RangeSliders({
  label,
  helpText,
  suffix,
  input,
  handleRangeSliderChange
}) {
  const suffixStyles = {
    maxWidth: '120px'
  };

  return (
    <RangeSlider
      output
      label={label}
      min={1}
      max={60}
      value={input}
      onChange={handleRangeSliderChange}
      helpText={helpText}
      suffix={
        <div style={suffixStyles}>
          <TextField
            type="number"
            value={String(input)}
            onChange={handleRangeSliderChange}
            suffix={suffix}
            readOnly
          />
        </div>
      }
    />
  );
}
