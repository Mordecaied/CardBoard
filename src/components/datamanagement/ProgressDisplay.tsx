import React, { useState } from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  Switch, 
  FormControlLabel 
} from '@mui/material';

interface ProgressData {
  businessAnalysis: { completed: number; total: number };
  development: { completed: number; total: number };
  testing: { completed: number; total: number };
}

interface ProgressDisplayProps {
  data: ProgressData;
  onChange: (data: ProgressData) => void;
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({ data, onChange }) => {
  const [showPercentage, setShowPercentage] = useState(true);

  const handleInputChange = (category: keyof ProgressData, field: 'completed' | 'total') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10) || 0;
    onChange({
      ...data,
      [category]: {
        ...data[category],
        [field]: value
      }
    });
  };

  const calculatePercentage = (completed: number, total: number) => 
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      <FormControlLabel
        control={<Switch checked={showPercentage} onChange={() => setShowPercentage(!showPercentage)} />}
        label={showPercentage ? "Show Percentage" : "Show Numerical"}
      />
      {Object.entries(data).map(([category, { completed, total }]) => (
        <Grid container spacing={2} key={category}>
          <Grid item xs={4}>
            <Typography>{category}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Completed"
              type="number"
              value={completed}
              onChange={handleInputChange(category as keyof ProgressData, 'completed')}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Total"
              type="number"
              value={total}
              onChange={handleInputChange(category as keyof ProgressData, 'total')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {showPercentage 
                ? `${calculatePercentage(completed, total)}%` 
                : `${completed} / ${total}`}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default ProgressDisplay;