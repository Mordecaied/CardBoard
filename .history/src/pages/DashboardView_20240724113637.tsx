import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Snackbar, Alert, Box, useTheme } from '@mui/material';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useReleaseData } from '../hooks/useReleaseData';
import { ReleaseSelector } from '../components/dashboard/ReleaseSelector';
import OverallProgress from '../components/dashboard/OverallProgress';
import { ReleaseTimeline } from '../components/dashboard/ReleaseTimeline';
import { FeaturesProgress } from '../components/dashboard/FeaturesProgress';
import BugResolution from '../components/dashboard/BugResolution';
import DevelopmentProgress from '../components/dashboard/DevelopmentProgress';
import DateEditDialog from '../components/dashboard/DateEditDialog';
import { releases } from '../data/MockData';
import SkeletonLoader from './SkeletonLoader';
import { Milestone } from '../types';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const DashboardView: React.FC = () => {
  const theme = useTheme();
  const { selectedRelease, setSelectedRelease, data, updateDate, fetchData } = useReleaseData();
  const [editingDate, setEditingDate] = useState<Milestone | null>(null);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState<ReactGridLayout.Layout[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchData(selectedRelease);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSnackbarMessage('Failed to load data. Please try again.');
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedRelease, fetchData]);

  useEffect(() => {
    // Initialize layout
    setLayout([
      { i: 'header', x: 0, y: 0, w: 12, h: 2, static: true },
      { i: 'overall-progress', x: 0, y: 2, w: 8, h: 4 },
      { i: 'release-timeline', x: 8, y: 2, w: 4, h: 4 },
      { i: 'features-progress', x: 0, y: 6, w: 12, h: 4 },
      { i: 'bug-resolution', x: 0, y: 10, w: 6, h: 4 },
      { i: 'development-progress', x: 6, y: 10, w: 6, h: 4 },
    ]);
  }, []);

  const handleEditDate = (milestone: Milestone) => {
    setEditingDate(milestone);
    setIsDateDialogOpen(true);
  };

  const handleSaveDate = (updatedMilestone: Milestone) => {
    updateDate(updatedMilestone);
    setSnackbarMessage('Date updated successfully');
    setSnackbarOpen(true);
    setIsDateDialogOpen(false);
    setEditingDate(null);
  };

  const handleLayoutChange = (newLayout: ReactGridLayout.Layout[]) => {
    setLayout(newLayout);
    // You can save the layout to localStorage or send it to a server here
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
  };

  const renderDashboardContent = () => (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      onLayoutChange={handleLayoutChange}
    >
      <Box key="header" sx={{ gridArea: 'header' }}>
        <Card elevation={3}>
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
      </Box>

      <Box key="overall-progress">
        <Card elevation={3} sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Overall Progress</Typography>
            <OverallProgress progress={data.progress} categories={data.categories} />
          </CardContent>
        </Card>
      </Box>

      <Box key="release-timeline">
        <Card elevation={3} sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Release Timeline</Typography>
            <ReleaseTimeline milestones={data.milestones} onEditDate={handleEditDate} />
          </CardContent>
        </Card>
      </Box>

      <Box key="features-progress">
        <Card elevation={3} sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Features Progress</Typography>
            <FeaturesProgress features={data.features} />
          </CardContent>
        </Card>
      </Box>

      <Box key="bug-resolution">
        <Card elevation={3} sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Bug Resolution</Typography>
            <BugResolution bugs={data.bugs} />
          </CardContent>
        </Card>
      </Box>

      <Box key="development-progress">
        <Card elevation={3} sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Development Progress</Typography>
            <DevelopmentProgress development={data.development} />
          </CardContent>
        </Card>
      </Box>
    </ResponsiveGridLayout>
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

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardView;