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
    if (progress < 33) return '#FF4136'; // Bright red
    if (progress < 66) return '#FFDC00'; // Bright yellow
    return '#2ECC40'; // Bright green
  };

  const getHeight = () => {
    switch (level) {
      case 'overall': return 56;
      case 'category': return 36;
      case 'feature': return 24;
    }
  };

  return {
    height: getHeight(),
    borderRadius: 4, // Slightly rounded edges
    backgroundColor: theme.palette.grey[200],
    '& .MuiLinearProgress-bar': {
      borderRadius: 4, // Matching rounded edges for the progress
      backgroundColor: getColor(value),
    },
  };
});

const ProgressText = styled(Typography)<{ level: 'overall' | 'category' | 'feature' }>(({ theme, level }) => {
  const getFontSize = () => {
    switch (level) {
      case 'overall': return '1.5rem';
      case 'category': return '1rem';
      case 'feature': return '0.875rem';
    }
  };

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    fontWeight: 'bold',
    fontSize: getFontSize(),
    fontFamily: 'Roboto, sans-serif',
  };
});

const ExpandButton = styled(IconButton)<{ expanded: boolean }>(({ expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s',
}));

const FeatureProgress: React.FC<{ feature: string; progress: number }> = ({ feature, progress }) => (
  <Box sx={{ mt: 1, ml: 6 }}>
    <Typography variant="body2" fontWeight='bold' fontFamily="Roboto, sans-serif">{feature}</Typography>
    <Box sx={{ position: 'relative' }}>
      <ProgressBar variant="determinate" value={progress} level="feature" />
      <ProgressText level="feature">{`${Math.round(progress)}%`}</ProgressText>
    </Box>
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
        <Typography variant="subtitle1" fontWeight="bold" fontFamily="Roboto, sans-serif">{category.name}</Typography>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <ProgressBar variant="determinate" value={category.progress} level="category" />
        <ProgressText level="category">{`${Math.round(category.progress)}%`}</ProgressText>
      </Box>
      <Typography variant="caption" sx={{ ml: 1 }} fontFamily="Roboto, sans-serif">
        {`(${category.tasksCompleted}/${category.totalTasks} tasks)`}
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
          <Typography variant="h6" fontFamily="Roboto, sans-serif">Overall Release Progress</Typography>
          <ExpandButton
            onClick={() => setExpanded(!expanded)}
            expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandButton>
        </Box>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <ProgressBar variant="determinate" value={data.progress} level="overall" />
          <ProgressText level="overall">{`${Math.round(data.progress)}%`}</ProgressText>
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