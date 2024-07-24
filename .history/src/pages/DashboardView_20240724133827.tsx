import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, useTheme } from '@mui/material';
import { useReleaseData } from '../hooks/useReleaseData';
import { ReleaseSelector } from '../components/dashboard/ReleaseSelector';
import OverallProgress from '../components/dashboard/OverallProgress';
import { ReleaseTimeline } from '../components/dashboard/ReleaseTimeline';
import BugResolution from '../components/dashboard/BugResolution';
import DevelopmentProgress from '../components/dashboard/DevelopmentProgress';
import DateEditDialog from '../components/dashboard/DateEditDialog';
import { releases } from '../data/MockData';
import SkeletonLoader from './SkeletonLoader';
import { Milestone } from '../types';

export const DashboardView: React.FC = () => {
  const theme = useTheme();
  const { selectedRelease, setSelectedRelease, data, updateDate, fetchData } = useReleaseData();
  const [editingDate, setEditingDate] = useState<Milestone | null>(null);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchData(selectedRelease);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedRelease, fetchData]);

  const handleEditDate = (milestone: Milestone) => {
    setEditingDate(milestone);
    setIsDateDialogOpen(true);
  };

  const handleSaveDate = (updatedMilestone: Milestone) => {
    updateDate(updatedMilestone);
    setIsDateDialogOpen(false);
    setEditingDate(null);
  };

  const renderDashboardContent = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
              Release Management Dashboard
            </Typography>
            <ReleaseSelector
              releases={releases}
              selectedRelease={selectedRelease}
              onReleaseChange={(e) => setSelectedRelease(e.target.value)}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <OverallProgress data={data} />
      </Grid>

      <Grid item xs={12} md={4}>
        <ReleaseTimeline milestones={data.milestones} onEditDate={handleEditDate} />
      </Grid>

      <Grid item xs={12} md={6}>
        <BugResolution bugs={data.bugs} />
      </Grid>

      <Grid item xs={12} md={6}>
        <DevelopmentProgress development={data.development} />
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      {isLoading ? <SkeletonLoader /> : renderDashboardContent()}

      <DateEditDialog
        open={isDateDialogOpen}
        onClose={() => setIsDateDialogOpen(false)}
        milestone={editingDate}
        onSave={handleSaveDate}
      />
    </Box>
  );
};

export default DashboardView;