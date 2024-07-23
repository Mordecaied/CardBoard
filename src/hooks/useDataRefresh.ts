// src/hooks/useDataRefresh.ts
import { useEffect, useCallback } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useDispatch } from 'react-redux';
import { updateProgress, setTeams, setTimeline } from '../store/releaseSlice';
import { fetchReleaseData } from '../services/api';

export const useDataRefresh = () => {
  const { settings } = useSettings();
  const dispatch = useDispatch();

  const refreshData = useCallback(async () => {
    try {
      const data = await fetchReleaseData();
      dispatch(updateProgress(data.progress));
      dispatch(setTeams(data.teams));
      dispatch(setTimeline(data.timeline));
    } catch (error) {
      console.error('Failed to refresh data:', error);
      // Here you might want to dispatch an action to set an error state
      // dispatch(setErrorState(error));
    }
  }, [dispatch]);

  useEffect(() => {
    refreshData(); // Initial fetch
    const interval = setInterval(refreshData, settings.refreshInterval * 60 * 1000);
    return () => clearInterval(interval);
  }, [settings.refreshInterval, refreshData]);

  return { refreshData };
};