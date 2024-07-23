import React from 'react';
import { Card, CardContent, Typography, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { Milestone } from '../../types';

interface ReleaseTimelineProps {
  milestones: Milestone[];
  onEditDate: (milestone: Milestone) => void;
}

export const ReleaseTimeline: React.FC<ReleaseTimelineProps> = ({ milestones, onEditDate }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>Release Timeline</Typography>
      <Stepper orientation="vertical">
        {milestones.map((milestone) => (
          <Step key={milestone.id} active={true}>
            <StepLabel onClick={() => onEditDate(milestone)}>{milestone.name}</StepLabel>
            <StepContent>{milestone.date.toDateString()}</StepContent>
          </Step>
        ))}
      </Stepper>
    </CardContent>
  </Card>
);

export default ReleaseTimeline;