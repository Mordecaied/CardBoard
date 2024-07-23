import React, { useState, useCallback } from 'react';
import { Paper, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReleaseSelection from '../components/datamanagement/ReleaseSelection';
import ReleaseManagement from '../components/datamanagement/ReleaseManagement';
import TeamManagement from '../components/datamanagement/TeamManagement';
import TaskManagement from '../components/datamanagement/TaskManagement';
import GanttChart from '../components/datamanagement/GanttChart';
import Summary from '../components/datamanagement/Summary';

const steps = ['Release Details', 'Team Management', 'Task Management', 'Summary'];

export interface ReleaseData {
  releaseName: string;
  team?: string;
  teamMembers?: Record<string, string[]>;
  tasks?: Record<string, TaskData>;
}

export interface TaskData {
  total: number;
  completed: number;
  startDate: string;
  endDate: string;
  workingDays: number;
}

const DataManagementView: React.FC = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [releaseData, setReleaseData] = useState<ReleaseData>({ releaseName: '' });
  const [isNewRelease, setIsNewRelease] = useState(true);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReleaseDataUpdate = useCallback((data: Partial<ReleaseData>) => {
    setReleaseData(prevData => ({ ...prevData, ...data }));
  }, []);

  const handleCreateNew = useCallback(() => {
    setIsNewRelease(true);
    setActiveStep(0);
  }, []);

  const handleUpdateExisting = useCallback(() => {
    setIsNewRelease(false);
    setActiveStep(0);
  }, []);

  const handleEdit = useCallback(() => {
    setActiveStep(0);
  }, []);

  const handleApprove = useCallback(() => {
    console.log('Saving release data:', releaseData);
    navigate('/dashboard');
  }, [releaseData, navigate]);

  const getStepContent = useCallback((step: number) => {
    switch (step) {
      case -1:
        return <ReleaseSelection onSelectNew={handleCreateNew} onSelectExisting={handleUpdateExisting} />;
      case 0:
        return <ReleaseManagement onComplete={handleNext} onDataUpdate={handleReleaseDataUpdate} existingData={releaseData} isNewRelease={isNewRelease} />;
      case 1:
        return <TeamManagement onComplete={handleNext} onBack={handleBack} onDataUpdate={handleReleaseDataUpdate} existingData={releaseData.teamMembers} />;
      case 2:
        return <TaskManagement onComplete={handleNext} onBack={handleBack} onDataUpdate={handleReleaseDataUpdate} existingData={releaseData.tasks} />;
      case 3:
        return (
          <>
            <Summary 
              releaseData={releaseData} 
              onEdit={handleEdit} 
              onApprove={handleApprove}
            />
            {releaseData.tasks && <GanttChart tasks={releaseData.tasks} />}
          </>
        );
      default:
        return 'Unknown step';
    }
  }, [releaseData, isNewRelease, handleNext, handleBack, handleReleaseDataUpdate, handleCreateNew, handleUpdateExisting, handleEdit, handleApprove]);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {isNewRelease ? 'Create New Release' : 'Update Existing Release'}
      </Typography>
      {activeStep >= 0 && (
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      <div style={{ marginTop: '20px' }}>
        {getStepContent(activeStep)}
      </div>
    </Paper>
  );
};

export default DataManagementView;