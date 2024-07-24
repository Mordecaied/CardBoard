import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Collapse, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ReleaseData, Category } from '../../types';

interface OverallProgressProps {
  data: ReleaseData;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    height: 2,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
  },
}));

const TitleBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -2,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0, 2),
  zIndex: 2,
}));

const ProgressBar = styled(LinearProgress)<{ value: number }>(({ theme, value }) => {
  const getColor = (progress: number) => {
    if (progress < 33) return theme.palette.error.main;
    if (progress < 66) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return {
    height: 24,
    borderRadius: 2,
    backgroundColor: theme.palette.grey[200],
    '& .MuiLinearProgress-bar': {
      borderRadius: 2,
      backgroundColor: getColor(value),
    },
  };
});

const ProgressText = styled(Typography)<{ level: 'overall' | 'category' | 'feature' }>(({ theme, level }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: theme.palette.getContrastText(theme.palette.primary.main),
  fontWeight: 'bold',
  fontSize: level === 'overall' ? '0.9rem' : '0.8rem',
}));

const ExpandButton = styled(IconButton)<{ expanded: boolean }>(({ expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s',
}));

const FeatureProgress: React.FC<{ feature: string; progress: number }> = ({ feature, progress }) => (
  <Box sx={{ mt: 1, ml: 4, display: 'flex', alignItems: 'center' }}>
    <Typography variant="body2" sx={{ width: '30%', mr: 1 }}>{feature}</Typography>
    <Box sx={{ position: 'relative', flexGrow: 1 }}>
      <ProgressBar variant="determinate" value={progress} />
      <ProgressText level="feature">{`${Math.round(progress)}%`}</ProgressText>
    </Box>
  </Box>
);

const CategoryProgress: React.FC<{ category: Category; features: string[] }> = ({ category, features }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" sx={{ width: '30%', mr: 1 }}>{category.name}</Typography>
        <Box sx={{ position: 'relative', flexGrow: 1 }}>
          <ProgressBar variant="determinate" value={category.progress} />
          <ProgressText level="category">{`${Math.round(category.progress)}%`}</ProgressText>
        </Box>
        <ExpandButton
          size="small"
          onClick={() => setExpanded(!expanded)}
          expanded={expanded}
          sx={{ ml: 1 }}
        >
          <KeyboardArrowDownIcon />
        </ExpandButton>
      </Box>
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
    <StyledCard>
      <TitleBox>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Overall Progress
        </Typography>
      </TitleBox>
      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <ProgressBar variant="determinate" value={data.progress} />
          <ProgressText level="overall">{`${Math.round(data.progress)}%`}</ProgressText>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2">Categories</Typography>
          <ExpandButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            expanded={expanded}
          >
            <KeyboardArrowDownIcon />
          </ExpandButton>
        </Box>
        <Collapse in={expanded}>
          {data.categories.map((category, index) => (
            <CategoryProgress key={index} category={category} features={data.features} />
          ))}
        </Collapse>
      </CardContent>
    </StyledCard>
  );
};

export default OverallProgress;