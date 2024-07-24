import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Collapse, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Category } from '../../types';

interface OverallProgressProps {
  progress: number;
  categories: Category[];
}

const ProgressBar = styled(LinearProgress)<{ value: number }>(({ theme, value }) => {
  const getColor = (progress: number) => {
    if (progress < 50) {
      return `linear-gradient(90deg, 
        ${theme.palette.error.main} ${progress * 2}%, 
        ${theme.palette.warning.main} ${progress * 2}%)`;
    } else {
      return `linear-gradient(90deg, 
        ${theme.palette.warning.main} ${(progress - 50) * 2}%, 
        ${theme.palette.success.main} ${(progress - 50) * 2}%)`;
    }
  };

  return {
    height: 24,
    borderRadius: 12,
    border: `2px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[200],
    '& .MuiLinearProgress-bar': {
      borderRadius: 10,
      background: getColor(value),
    },
  };
});

const CategoryProgress: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2">{category.name}</Typography>
      <ProgressBar variant="determinate" value={category.progress} />
      <Typography variant="caption" sx={{ ml: 1 }}>
        {`${Math.round(category.progress)}% (${category.tasksCompleted}/${category.totalTasks} tasks)`}
      </Typography>
    </Box>
  );
};

const OverallProgress: React.FC<OverallProgressProps> = ({ progress, categories }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Overall Release Progress</Typography>
          <IconButton onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Box sx={{ position: 'relative', height: 24, mb: 2 }}>
          <ProgressBar variant="determinate" value={progress} />
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
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
        <Collapse in={expanded}>
          {categories.map((category, index) => (
            <CategoryProgress key={index} category={category} />
          ))}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default OverallProgress;