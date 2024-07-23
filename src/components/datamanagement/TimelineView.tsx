import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Typography, Box } from '@mui/material';
import { RootState } from '../../store/store';
import { setTimeline } from '../../store/releaseSlice';

const TimelineView: React.FC = () => {
  const timeline = useSelector((state: RootState) => state.release.timeline);
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulating API call to fetch timeline data
    const fetchTimeline = () => {
      const mockTimeline = [
        { id: 1, task: 'Planning', start: '2024-07-01', end: '2024-07-15', category: 'Business Analysis' },
        { id: 2, task: 'Development', start: '2024-07-16', end: '2024-08-15', category: 'Development' },
        { id: 3, task: 'Testing', start: '2024-08-16', end: '2024-08-31', category: 'Testing' },
      ];
      dispatch(setTimeline(mockTimeline));
    };

    fetchTimeline();
  }, [dispatch]);

  const getColor = (category: string) => {
    switch (category) {
      case 'Business Analysis':
        return '#8884d8';
      case 'Development':
        return '#82ca9d';
      case 'Testing':
        return '#ffc658';
      default:
        return '#000000';
    }
  };

  const startDate = new Date('2024-07-01');
  const endDate = new Date('2024-08-31');
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>Release Timeline</Typography>
      {timeline.map((item) => {
        const itemStart = new Date(item.start);
        const itemEnd = new Date(item.end);
        const left = ((itemStart.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) / totalDays * 100;
        const width = ((itemEnd.getTime() - itemStart.getTime()) / (1000 * 3600 * 24)) / totalDays * 100;

        return (
          <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ width: '120px' }}>{item.task}</Typography>
            <Box sx={{ flexGrow: 1, height: '20px', position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: `${left}%`,
                  width: `${width}%`,
                  height: '100%',
                  backgroundColor: getColor(item.category),
                  borderRadius: '4px',
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
};

export default TimelineView;