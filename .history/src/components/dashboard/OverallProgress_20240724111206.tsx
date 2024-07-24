// src/components/OverallProgress.tsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Collapse } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ExpandMore } from './ExpandMore';
import { Category } from '../../types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface OverallProgressProps {
  progress: number;
  categories: Category[];
}

const OverallProgress: React.FC<OverallProgressProps> = ({ progress, categories }) => {
  const [expanded, setExpanded] = useState(false);
  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Overall Release Progress</Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value={progress} size={100} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {`${Math.round(progress)}%`}
            </Typography>
          </Box>
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categories} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#8884d8">
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default OverallProgress;