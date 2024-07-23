import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface ReleaseSelectorProps {
  releases: string[];
  selectedRelease: string;
  onReleaseChange: (event: SelectChangeEvent<string>) => void;
}

export const ReleaseSelector: React.FC<ReleaseSelectorProps> = ({ releases, selectedRelease, onReleaseChange }) => (
  <Select value={selectedRelease} onChange={onReleaseChange} fullWidth>
    {releases.map((release) => (
      <MenuItem key={release} value={release}>{release}</MenuItem>
    ))}
  </Select>
);

export default ReleaseSelector;