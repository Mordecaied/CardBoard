import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Collapse, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ReleaseData, Category } from '../../types';

interface OverallProgressProps {
  data: ReleaseData;
}

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
}));

const TitleBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.warning.light,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const ProgressBar = styled(LinearProgress)<{ value: number; level: 'overall' | 'category' | 'feature' }>(({ theme, value, level }) => ({
  height: level === 'overall' ? 24 : 16,
  borderRadius: 2,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 2,
    backgroundColor: theme.palette.primary.main,
  },
}));

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

const CategoryProgress: React.FC<{ category: Category }> = ({ category }) => (
  <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
    <Typography variant="body2" sx={{ width: '30%', mr: 1 }}>{category.name}</Typography>
    <Box sx={{ position: 'relative', flexGrow: 1 }}>
      <ProgressBar variant="determinate" value={category.progress} level="category" />
      <ProgressText level="category">{`${Math.round(category.progress)}%`}</ProgressText>
    </Box>
  </Box>
);

const OverallProgress: React.FC<OverallProgressProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledCard>
      <TitleBox>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          Overall Progress
        </Typography>
      </TitleBox>
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <ProgressBar variant="determinate" value={data.progress} level="overall" />
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
            <CategoryProgress key={index} category={category} />
          ))}
        </Collapse>
      </CardContent>
    </StyledCard>
  );
};

export default OverallProgress;