import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FeaturesProgressProps {
  features: string[];
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
  // This is a placeholder function. In a real scenario, you'd want to fetch or calculate the actual progress.
  const getRandomProgress = () => Math.floor(Math.random() * 100);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>Progress by Features</Typography>
        {features.map((feature, index) => {
          const progress = getRandomProgress();
          return (
            <Tooltip key={index} title={`${progress}% complete`} arrow placement="left">
              <FeatureItem>
                <Typography variant="body2" gutterBottom>{feature}</Typography>
                <ProgressBar variant="determinate" value={progress} />
              </FeatureItem>
            </Tooltip>
          );
        })}
      </CardContent>
    </StyledCard>
  );
};

export default FeaturesProgress;