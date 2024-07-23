import React from 'react';
import { useSelector } from 'react-redux';
import {
   Paper,
   Typography,
   Grid,
   List,
   ListItem,
   ListItemText,
   Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { RootState } from '../../store/store';
import { Team } from '../../types';

const ReleaseSummaryReport: React.FC = () => {
  const { progress, teams, timeline } = useSelector((state: RootState) => state.release);

  const calculateOverallProgress = () => {
    const total = progress.businessAnalysis + progress.development + progress.testing;
    return Math.round(total / 3);
  };

  const getUpcomingMilestones = () => {
    const now = new Date();
    return timeline
      .filter(item => new Date(item.end) > now)
      .sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime())
      .slice(0, 3);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, my: 3 }}>
      <Typography variant="h5" gutterBottom>Release Summary Report</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Overall Progress</Typography>
          <Typography variant="h3">{calculateOverallProgress()}%</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Business Analysis" secondary={`${progress.businessAnalysis}%`} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Development" secondary={`${progress.development}%`} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Testing" secondary={`${progress.testing}%`} />
            </ListItem>
          </List>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Team Overview</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Team</TableCell>
                  <TableCell>Members</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team: Team) => (
                  <TableRow key={team.id}>
                    <TableCell>{team.name}</TableCell>
                    <TableCell>{team.members.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Upcoming Milestones</Typography>
      <List>
        {getUpcomingMilestones().map(milestone => (
          <ListItem key={milestone.id}>
            <ListItemText
               primary={milestone.task}
              secondary={`Due: ${new Date(milestone.end).toLocaleDateString()} - ${milestone.category}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ReleaseSummaryReport;