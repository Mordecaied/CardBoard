import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Collapse, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReleaseData, Category } from '../../types';

interface OverallProgressProps {
  data: ReleaseData;
}

const ProgressBar = styled(LinearProgress)<{ value: number; level: 'overall' | 'category' | 'feature' }>(({ theme, value, level }) => {
  const getColor = (progress: number) => {
    if (progress < 33) return theme.palette.error.main;
    if (progress < 66) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getHeight = () => {
    switch (level) {
      case 'overall': return 48;
      case 'category': return 36;
      case 'feature': return 24;
    }
  };

  return {
    height: getHeight(),
    borderRadius: getHeight() / 2,
    backgroundColor: theme.palette.grey[200],
    '& .MuiLinearProgress-bar': {
      borderRadius: getHeight() / 2,
      backgroundColor: getColor(value),
    },
  };
});

const ExpandButton = styled(IconButton)<{ expanded: boolean }>(({ expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s',
}));

const FeatureProgress: React.FC<{ feature: string; progress: number }> = ({ feature, progress }) => (
  <Box sx={{ mt: 1, ml: 6 }}>
    <Typography variant="body2">{feature}</Typography>
    <ProgressBar variant="determinate" value={progress} level="feature" />
    <Typography variant="caption" sx={{ ml: 1 }}>
      {`${Math.round(progress)}%`}
    </Typography>
  </Box>
);

const CategoryProgress: React.FC<{ category: Category; features: string[] }> = ({ category, features }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ExpandButton
          size="small"
          onClick={() => setExpanded(!expanded)}
          expanded={expanded}
        >
          <ExpandMoreIcon />
        </ExpandButton>
        <Typography variant="subtitle1">{category.name}</Typography>
      </Box>
      <ProgressBar variant="determinate" value={category.progress} level="category" />
      <Typography variant="caption" sx={{ ml: 1 }}>
        {`${Math.round(category.progress)}% (${category.tasksCompleted}/${category.totalTasks} tasks)`}
      </Typography>
      <Collapse in={expanded}>
        {features.map((feature, index) => (
          <FeatureProgress 
            key={index} 
            feature={feature} 
            progress={Math.random() * 100} // Replace with actual feature progress
          />
        ))}
      </Collapse>
    </Box>
  );
};

const OverallProgress: React.FC<OverallProgressProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Overall Release Progress</Typography>
          <ExpandButton
            onClick={() => setExpanded(!expanded)}
            expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandButton>
        </Box>
        <Box sx={{ position: 'relative', height: 24, mb: 2 }}>
          <ProgressBar variant="determinate" value={data.progress} level="overall" />
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {`${Math.round(data.progress)}%`}
          </Typography>
        </Box>
        <Collapse in={expanded}>
          {data.categories.map((category, index) => (
            <CategoryProgress key={index} category={category} features={data.features} />
          ))}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default OverallProgress;