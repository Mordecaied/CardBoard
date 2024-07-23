import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField, Button, Typography, Grid, Snackbar,
  Paper, LinearProgress, Box
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { ReleaseData, TaskData } from '../../pages/DataManagementView';

interface TaskManagementProps {
  onComplete: () => void;
  onBack: () => void;
  onDataUpdate: (data: Partial<ReleaseData>) => void;
  existingData?: Record<string, TaskData>;
}

const predefinedCategories = ['Business Analysis', 'Development', 'Testing'];

const TaskManagement: React.FC<TaskManagementProps> = ({ onComplete, onBack, onDataUpdate, existingData }) => {
  const [tasks, setTasks] = useState<Record<string, TaskData>>({});
  const [newCategory, setNewCategory] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (existingData && Object.keys(existingData).length > 0) {
      setTasks(existingData);
    } else {
      const initialTasks = predefinedCategories.reduce((acc, category) => {
        acc[category] = { total: 0, completed: 0, startDate: '', endDate: '', workingDays: 0 };
        return acc;
      }, {} as Record<string, TaskData>);
      setTasks(initialTasks);
    }
  }, [existingData]);

  const calculateWorkingDays = useCallback((start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }, []);

  const handleAddCategory = useCallback(() => {
    if (newCategory && !(newCategory in tasks)) {
      setTasks(prevTasks => {
        const updatedTasks = {
          ...prevTasks,
          [newCategory]: { total: 0, completed: 0, startDate: '', endDate: '', workingDays: 0 }
        };
        onDataUpdate({ tasks: updatedTasks });
        return updatedTasks;
      });
      setNewCategory('');
      setSnackbarMessage('New category added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  }, [newCategory, tasks, onDataUpdate]);

  const handleInputChange = useCallback((category: string, field: keyof TaskData, value: any) => {
    setTasks(prevTasks => {
      const updatedTask = { ...prevTasks[category], [field]: value };
      if (field === 'startDate' || field === 'endDate') {
        if (updatedTask.startDate && updatedTask.endDate) {
          if (new Date(updatedTask.endDate) < new Date(updatedTask.startDate)) {
            setSnackbarMessage('End date cannot be before start date');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return prevTasks;
          }
          updatedTask.workingDays = calculateWorkingDays(updatedTask.startDate, updatedTask.endDate);
        }
      }
      const updatedTasks = { ...prevTasks, [category]: updatedTask };
      onDataUpdate({ tasks: updatedTasks });
      return updatedTasks;
    });
  }, [calculateWorkingDays, onDataUpdate]);

  const calculateProgress = useCallback((category: string): number => {
    const taskData = tasks[category];
    if (!taskData || typeof taskData.total !== 'number' || typeof taskData.completed !== 'number') {
      return 0;
    }
    const { total, completed } = taskData;
    return total > 0 ? (completed / total) * 100 : 0;
  }, [tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Task Management
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Grid>
        </Grid>
      </Box>

      {Object.entries(tasks).map(([category, taskData]) => (
        <Paper key={category} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            {category}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Total Tasks"
                value={taskData.total}
                onChange={(e) => handleInputChange(category, 'total', parseInt(e.target.value, 10))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Completed Tasks"
                value={taskData.completed}
                onChange={(e) => handleInputChange(category, 'completed', parseInt(e.target.value, 10))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={taskData.startDate}
                onChange={(e) => handleInputChange(category, 'startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={taskData.endDate}
                onChange={(e) => handleInputChange(category, 'endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" gutterBottom>
              Working Days: {taskData.workingDays}
            </Typography>
            <LinearProgress variant="determinate" value={calculateProgress(category)} />
          </Box>
        </Paper>
      ))}

      <Box sx={{ marginTop: 2 }}>
        <Button onClick={onBack} sx={{ marginRight: 1 }}>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

export default TaskManagement;