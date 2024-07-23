import { useState, useEffect, useCallback } from 'react';
import { releaseData, releases } from '../data/MockData';
import { ReleaseData, Milestone } from '../types';

export const useReleaseData = () => {
  const [selectedRelease, setSelectedRelease] = useState<string>(releases[0]);
  const [data, setData] = useState<ReleaseData>(releaseData[selectedRelease]);

  const fetchData = useCallback(async (releaseId: string) => {
    // Simulate an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (releaseData[releaseId]) {
      setData(releaseData[releaseId]);
    } else {
      throw new Error('Release data not found');
    }
  }, []);

  const updateDate = useCallback((updatedMilestone: Milestone) => {
    setData(prevData => ({
      ...prevData,
      milestones: prevData.milestones.map(milestone =>
        milestone.id === updatedMilestone.id ? updatedMilestone : milestone
      )
    }));
  }, []);

  // Update data when selectedRelease changes
  useEffect(() => {
    fetchData(selectedRelease);
  }, [selectedRelease, fetchData]);

  return { selectedRelease, setSelectedRelease, data, updateDate, fetchData };
};