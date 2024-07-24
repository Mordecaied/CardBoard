import React, { useState, useEffect } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
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
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState<ReactGridLayout.Layout[]>([]);

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

  useEffect(() => {
    // Initialize layout
    setLayout([
      { i: 'header', x: 0, y: 0, w: 12, h: 2, static: true },
      { i: 'overall-progress', x: 0, y: 2, w: 6, h: 4 },
      { i: 'release-timeline', x: 6, y: 2, w: 6, h: 4 },
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
    setIsDateDialogOpen(false);
    setEditingDate(null);
  };

  const handleLayoutChange = (newLayout: ReactGridLayout.Layout[]) => {
    setLayout(newLayout);
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
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Release Management Dashboard
        </Typography>
        <ReleaseSelector
          releases={releases}
          selectedRelease={selectedRelease}
          onReleaseChange={(e) => setSelectedRelease(e.target.value)}
        />
      </Box>

      <Box key="overall-progress">
        <OverallProgress progress={data.progress} categories={data.categories} />
      </Box>

      <Box key="release-timeline">
        <ReleaseTimeline milestones={data.milestones} onEditDate={handleEditDate} />
      </Box>

      <Box key="features-progress">
        <FeaturesProgress features={data.features.map(feature => ({ name: feature, progress: Math.random() * 100 }))} />
      </Box>

      <Box key="bug-resolution">
        <BugResolution bugs={data.bugs} />
      </Box>

      <Box key="development-progress">
        <DevelopmentProgress development={data.development} />
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
    </Box>
  );
};

export default DashboardView;