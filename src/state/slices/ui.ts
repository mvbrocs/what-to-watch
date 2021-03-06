import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'src/state/root-reducer';

type VideoPlayerFullscreenData = {
  background_image: string;
  background_color: string;
  name: string;
  video_link: string;
};

type VideoPlayerFullscreen = {
  visible: boolean;
  data: VideoPlayerFullscreenData | null;
};

type State = {
  isAuthorizationRequired: boolean;
  videoPlayerFullscreen: VideoPlayerFullscreen;
};

export const ALL_GENRES = 'All genres';

export const uiInitialState = {
  isAuthorizationRequired: false,
  videoPlayerFullscreen: {
    visible: false,
    data: null,
  },
} as State;

const slice = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers: {
    toggleAuthorizationRequired(state) {
      state.isAuthorizationRequired = !state.isAuthorizationRequired;
    },
    toggleVideoPlayerFullscreenVisible(state) {
      state.videoPlayerFullscreen.visible = !state.videoPlayerFullscreen.visible;
    },
    updateVideoPlayerFullscreenData(
      state,
      action: PayloadAction<VideoPlayerFullscreenData | null>,
    ) {
      state.videoPlayerFullscreen.data = action.payload;
    },
  },
});

export const {
  toggleAuthorizationRequired,
  toggleVideoPlayerFullscreenVisible,
  updateVideoPlayerFullscreenData,
} = slice.actions;

export const uiReducer = slice.reducer;

export const selectIsAuthorizationRequired = (state: RootState) =>
  state.ui.isAuthorizationRequired;
export const selectVideoPlayerFullscreen = (state: RootState) =>
  state.ui.videoPlayerFullscreen;
