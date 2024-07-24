import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Collapse, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Category } from '../../types';

interface OverallProgressProps {
  progress: number;
  categories: Category[];
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  fontFamily: 'Roboto, sans-serif',
}));

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

const ExpandMore = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  cursor: 'pointer',
}));

const CategoryName = styled(Typography)({
  fontWeight: 'bold',
});

const CategoryProgress: React.FC<{ category: Category }> = ({ category }) => {
  const [expanded, setExpanded] = useState(false);
  const progress = (category.tasksCompleted / category.totalTasks) * 100;

  return (
    <Box sx={{ mt: 2 }}>
      <CategoryName variant="subtitle1" onClick={() => setExpanded(!expanded)}>
        {category.name}
      </CategoryName>
      <ProgressBar variant="determinate" value={progress} />
      <Typography variant="caption" sx={{ ml: 1 }}>
        {`${Math.round(progress)}%`}
      </Typography>
      <ExpandMore onClick={() => setExpanded(!expanded)}>
        <ExpandMoreIcon />
      </ExpandMore>
      <Collapse in={expanded}>
        <Typography variant="body2">
          Tasks completed: {category.tasksCompleted} / {category.totalTasks}
        </Typography>
      </Collapse>
    </Box>
  );
};

const OverallProgress: React.FC<OverallProgressProps> = ({ progress, categories }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>Overall Release Progress</Typography>
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
        <ExpandMore onClick={() => setExpanded(!expanded)}>
          <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded}>
          {categories.map((category, index) => (
            <CategoryProgress key={index} category={category} />
          ))}
        </Collapse>
      </CardContent>
    </StyledCard>
  );
};

export default OverallProgress;