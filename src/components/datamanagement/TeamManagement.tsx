import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Typography, Grid, Chip } from '@mui/material';
import { ReleaseData } from '../../pages/DataManagementView';

interface TeamManagementProps {
  onComplete: () => void;
  onBack: () => void;
  onDataUpdate: (data: Partial<ReleaseData>) => void;
  existingData?: Record<string, string[]>;
}

const roles = ['Service Manager', 'Release Lead', 'Technical Lead', 'Business Analyst', 'UI Design', 'DevOps', 'Frontend Developer', 'Backend Developer', 'Tester'];

const TeamManagement: React.FC<TeamManagementProps> = ({ onComplete, onBack, onDataUpdate, existingData }) => {
  const [teamMembers, setTeamMembers] = useState<Record<string, string[]>>(existingData || {});
  const [currentRole, setCurrentRole] = useState(roles[0]);
  const [currentMember, setCurrentMember] = useState('');

  useEffect(() => {
    if (existingData) {
      setTeamMembers(existingData);
    }
  }, [existingData]);

  const handleAddMember = useCallback(() => {
    if (currentMember) {
      setTeamMembers(prev => {
        const newTeamMembers = {
          ...prev,
          [currentRole]: [...(prev[currentRole] || []), currentMember]
        };
        onDataUpdate({ teamMembers: newTeamMembers });
        return newTeamMembers;
      });
      setCurrentMember('');
    }
  }, [currentRole, currentMember, onDataUpdate]);

  const handleRemoveMember = useCallback((role: string, member: string) => {
    setTeamMembers(prev => {
      const newTeamMembers = {
        ...prev,
        [role]: prev[role].filter(m => m !== member)
      };
      onDataUpdate({ teamMembers: newTeamMembers });
      return newTeamMembers;
    });
  }, [onDataUpdate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Team Management</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Role"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Team Member Name"
            value={currentMember}
            onChange={(e) => setCurrentMember(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleAddMember} variant="outlined">
            Add Team Member
          </Button>
        </Grid>
        {Object.entries(teamMembers).map(([role, members]) => (
          <Grid item xs={12} key={role}>
            <Typography variant="subtitle1">{role}</Typography>
            {members.map((member) => (
              <Chip
                key={member}
                label={member}
                onDelete={() => handleRemoveMember(role, member)}
                style={{ margin: '2px' }}
              />
            ))}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button onClick={onBack} variant="outlined" style={{ marginRight: '10px' }}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TeamManagement;