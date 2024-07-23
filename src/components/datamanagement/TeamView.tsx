import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { RootState } from '../../store/store';
import { setTeams } from '../../store/releaseSlice';

const TeamView: React.FC = () => {
  const teams = useSelector((state: RootState) => state.release.teams);
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulating API call to fetch team data
    const fetchTeams = () => {
      const mockTeams = [
        {
          id: 1,
          name: 'Frontend Team',
          members: [
            { id: 1, name: 'John Doe', role: 'Lead Developer' },
            { id: 2, name: 'Jane Smith', role: 'UI/UX Designer' },
          ],
        },
        {
          id: 2,
          name: 'Backend Team',
          members: [
            { id: 3, name: 'Bob Johnson', role: 'Backend Developer' },
            { id: 4, name: 'Alice Brown', role: 'Database Administrator' },
          ],
        },
      ];
      dispatch(setTeams(mockTeams));
    };

    fetchTeams();
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" style={{ padding: '16px' }}>
        Teams Working on Release
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team Name</TableCell>
            <TableCell>Members</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.name}</TableCell>
              <TableCell>
                <ul>
                  {team.members.map((member) => (
                    <li key={member.id}>
                      {member.name} - {member.role}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamView;