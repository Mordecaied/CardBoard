import React, { useState, useMemo } from 'react';
import { Typography, Paper, Box, Grid, Collapse } from '@mui/material';
import { TaskData } from '../../pages/DataManagementView';

interface GanttChartProps {
  tasks: Record<string, TaskData>;
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const { startDate, endDate, monthsAndWeeks } = useMemo(() => {
    const start = new Date(Math.min(...Object.values(tasks).map(t => new Date(t.startDate).getTime())));
    const end = new Date(Math.max(...Object.values(tasks).map(t => new Date(t.endDate).getTime())));
    return {
      startDate: start,
      endDate: end,
      monthsAndWeeks: getMonthsAndWeeks(start, end)
    };
  }, [tasks]);

  const getColor = (category: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    return colors[Object.keys(tasks).indexOf(category) % colors.length];
  };

  const handlePillClick = (category: string) => {
    setExpandedCategory(prevCategory => prevCategory === category ? null : category);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom>Timeline Summary</Typography>
      <Box position="relative" mt={4} mb={2}>
        <Grid container>
          <Grid item xs={2}>
            <Typography variant="subtitle2">Categories</Typography>
          </Grid>
          <Grid item xs={10}>
            <Box display="flex">
              {monthsAndWeeks.map(({ month, weeks }) => (
                <Box key={month} flexGrow={1} textAlign="center">
                  <Typography variant="subtitle2">{month}</Typography>
                  <Box display="flex">
                    {weeks.map((week, index) => (
                      <Box key={index} flexGrow={1}>
                        <Typography variant="caption">{week}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        {/* Faint gridlines */}
        <Box position="absolute" top={24} bottom={0} left="16.67%" right={0}>
          {monthsAndWeeks.flatMap(({ weeks }) => 
            weeks.map((_, index) => (
              <Box 
                key={index} 
                position="absolute" 
                left={`${(index / weeks.length) * 100}%`} 
                width="1px" 
                height="100%" 
                bgcolor="#ddd"
              />
            ))
          )}
        </Box>

        {/* Task bars */}
        <Box mt={2}>
          {Object.entries(tasks).map(([category, data]) => (
            <Box key={category} mb={2}>
              <Box display="flex" alignItems="center" height={30}>
                <Typography variant="body2" style={{ width: '16.67%', paddingRight: '8px' }} noWrap>
                  {category}
                </Typography>
                <Box flexGrow={1} height="100%" position="relative">
                  <Box
                    position="absolute"
                    left={`${getLeftPosition(startDate, new Date(data.startDate), endDate)}%`}
                    width={`${getWidth(new Date(data.startDate), new Date(data.endDate), startDate, endDate)}%`}
                    height="100%"
                    bgcolor={getColor(category)}
                    borderRadius={15}
                    onClick={() => handlePillClick(category)}
                    style={{ cursor: 'pointer' }}
                  />
                </Box>
              </Box>
              <Collapse in={expandedCategory === category}>
                <Box ml="16.67%" mt={1} p={2} bgcolor="#f5f5f5" borderRadius={1}>
                  <Typography variant="body2">Start Date: {data.startDate}</Typography>
                  <Typography variant="body2">End Date: {data.endDate}</Typography>
                  <Typography variant="body2">Total Tasks: {data.total}</Typography>
                  <Typography variant="body2">Completed Tasks: {data.completed}</Typography>
                  <Typography variant="body2">Working Days: {data.workingDays}</Typography>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

function getMonthsAndWeeks(startDate: Date, endDate: Date) {
  const result = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const weeks = getWeeksInMonth(currentDate, endDate);
    result.push({ month, weeks });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return result;
}

function getWeeksInMonth(date: Date, endDate: Date) {
  const weeks = [];
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let currentWeek = 1;
  for (let d = firstDay; d <= lastDay && d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 1 || d.getDate() === 1) {
      weeks.push(`W${currentWeek}`);
      currentWeek++;
    }
  }
  return weeks;
}

function getLeftPosition(startDate: Date, itemStartDate: Date, endDate: Date) {
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const daysFromStart = (itemStartDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  return (daysFromStart / totalDays) * 100;
}

function getWidth(itemStartDate: Date, itemEndDate: Date, startDate: Date, endDate: Date) {
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const itemDays = (itemEndDate.getTime() - itemStartDate.getTime()) / (1000 * 3600 * 24);
  return (itemDays / totalDays) * 100;
}

export default GanttChart;