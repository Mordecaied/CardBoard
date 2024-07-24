import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Feature } from '../../types';

interface FeaturesProgressProps {
  features: Feature[];
}

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
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Progress by Features</Typography>
          <IconButton onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Collapse in={expanded}>
          {features.map((feature, index) => (
            <FeatureItem key={index}>
              <Typography variant="body2" gutterBottom>{feature.name}</Typography>
              <ProgressBar variant="determinate" value={feature.progress} />
              <Typography variant="caption" sx={{ ml: 1 }}>
                {`${Math.round(feature.progress)}%`}
              </Typography>
            </FeatureItem>
          ))}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default FeaturesProgress;