import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReleaseState {
  progress: {
    businessAnalysis: number;
    development: number;
    testing: number;
  };
  teams: {
    id: number;
    name: string;
    members: { id: number; name: string; role: string }[];
  }[];
  timeline: {
    id: number;
    task: string;
    start: string;
    end: string;
    category: string;
  }[];
}

const initialState: ReleaseState = {
  progress: {
    businessAnalysis: 0,
    development: 0,
    testing: 0,
  },
  teams: [],
  timeline: [],
};

const releaseSlice = createSlice({
    name: 'release',
    initialState,
    reducers: {
    updateProgress: (state, action: PayloadAction<ReleaseState['progress']>) => {
      state.progress = action.payload;
    },
    setTeams: (state, action: PayloadAction<ReleaseState['teams']>) => {
        state.teams = action.payload;
    },
    setTimeline: (state, action: PayloadAction<ReleaseState['timeline']>) => {
      state.timeline = action.payload;
    },
  },
});

export const { updateProgress, setTeams, setTimeline } = releaseSlice.actions;
export default releaseSlice.reducer;