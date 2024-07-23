import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProgressBoxProps {
  label: string;
  value: number;
  total: number;
  backgroundColor?: string;
}

export const ProgressBox: React.FC<ProgressBoxProps> = ({ label, value, total, backgroundColor }) => {
  const percentage = (value / total) * 100;

  return (
    <Box sx={{ backgroundColor, padding: 2, borderRadius: 1 }}>
      <Typography variant="h4">{value}</Typography>
      <Typography variant="body2">{label}</Typography>
      <Box sx={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 1, mt: 1 }}>
        <Box
          sx={{
            width: `${percentage}%`,
            backgroundColor: 'rgba(255,255,255,0.7)',
            height: 8,
            borderRadius: 1,
          }}
        />
      </Box>
    </Box>
  );
};