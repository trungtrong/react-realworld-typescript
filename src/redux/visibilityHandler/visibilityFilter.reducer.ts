import { createSlice } from '@reduxjs/toolkit'
import { AppStateKeyFeatureEnum } from '../app-feature-key.enums';

export const VISIBILITY_FILTERS: Record<string, string> = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
};

export const VisibilityFilterSlice = createSlice({
  name: AppStateKeyFeatureEnum.VisibilityFilter,
  initialState: VISIBILITY_FILTERS.ALL,
  reducers: {
      setFilter: (state, action) => {
          return action.payload;
      },
  }
})

export default VisibilityFilterSlice.reducer;