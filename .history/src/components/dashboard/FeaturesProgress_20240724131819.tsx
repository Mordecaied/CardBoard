import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Feature } from '../../types';

interface FeaturesProgressProps {
  features: Feature[];
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  fontFamily: 'Roboto, sans-serif',
}));

const ProgressBar = styled(LinearProgress)<{ value: number }>(({ theme, value }) => {
  const getColor = (progress: number) => {
    if (progress < 33) {
      return theme.palette.error.main;
    } else if (progress < 66) {
      return theme.palette.warning.main;
    } else {
      return theme.palette.success.main;
    }
  };

  return {
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.palette.grey[200],
    '& .MuiLinearProgress-bar': {
      borderRadius: 5,
      backgroundColor: getColor(value),
    },
  };
});

const FeatureItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const FeaturesProgress: React.FC<FeaturesProgressProps> = ({ features }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>Progress by Features</Typography>
        {features.map((feature, index) => (
          <Tooltip key={index} title={`${feature.progress}% complete`} arrow placement="left">
            <FeatureItem>
              <Typography variant="body2" gutterBottom>{feature.name}</Typography>
              <ProgressBar variant="determinate" value={feature.progress} />
            </FeatureItem>
          </Tooltip>
        ))}
      </CardContent>
    </StyledCard>
  );
};

export default FeaturesProgress;