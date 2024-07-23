import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { ProgressBox } from './ProgressBox';

interface DevelopmentProgressProps {
  development: { [key: string]: number };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const DevelopmentProgress: React.FC<DevelopmentProgressProps> = ({ development }) => {
  const totalTasks = Object.values(development).reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Development Progress</Typography>
        <Grid container spacing={2}>
          {Object.entries(development).map(([key, value], index) => (
            <Grid item xs={6} sm={3} key={key}>
              <ProgressBox 
                label={key}
                value={value}
                total={totalTasks}
                backgroundColor={COLORS[index % COLORS.length]}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DevelopmentProgress;