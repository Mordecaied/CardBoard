import React from 'react';
import { Grid, Card, CardContent, Skeleton } from '@mui/material';

const SkeletonLoader: React.FC = () => (
  <Grid container spacing={3}>
    {[...Array(6)].map((_, index) => (
      <Grid item xs={12} md={index < 2 ? 12 : 6} key={index}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="rectangular" height={118} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default SkeletonLoader;