import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updateProgress } from '../../store/releaseSlice';
import ProgressDisplay from './ProgressDisplay';
import TeamView from './TeamView';
import TimelineView from './TimelineView';

interface ReleaseData {
  progress: {
    businessAnalysis: { completed: number; total: number };
    development: { completed: number; total: number };
    testing: { completed: number; total: number };
  };
  teams: any[]; // Use the actual team type from your Redux store
  timeline: any[]; // Use the actual timeline item type from your Redux store
}

interface ReleaseEditorProps {
  releaseId: string;
}

const ReleaseEditor: React.FC<ReleaseEditorProps> = ({ releaseId }) => {
  const dispatch = useDispatch();
  const storeData = useSelector((state: RootState) => state.release);
  const [releaseData, setReleaseData] = useState<ReleaseData>({
    progress: {
      businessAnalysis: { completed: 0, total: 0 },
      development: { completed: 0, total: 0 },
      testing: { completed: 0, total: 0 },
    },
    teams: [],
    timeline: [],
  });

  useEffect(() => {
    // Simulating fetching release data
    // In a real app, this would be an API call
    setReleaseData({
      progress: {
        businessAnalysis: { completed: storeData.progress.businessAnalysis, total: 100 },
        development: { completed: storeData.progress.development, total: 100 },
        testing: { completed: storeData.progress.testing, total: 100 },
      },
      teams: storeData.teams,
      timeline: storeData.timeline,
    });
  }, [releaseId, storeData]);

  const handleProgressChange = (newProgress: ReleaseData['progress']) => {
    setReleaseData({ ...releaseData, progress: newProgress });
    dispatch(updateProgress({
      businessAnalysis: newProgress.businessAnalysis.completed,
      development: newProgress.development.completed,
      testing: newProgress.testing.completed,
    }));
  };

  return (
    <div>
      <ProgressDisplay data={releaseData.progress} onChange={handleProgressChange} />
      <TeamView />
      <TimelineView />
    </div>
  );
};

export default ReleaseEditor;