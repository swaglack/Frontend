import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaceId: "", // initial state of workspaceId is null
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceId: (state, action) => {
      state.workspaceId = action.payload;
    },
  },
});

export const fetchWorkspaceId = workspaceId => async dispatch => {
  dispatch(setWorkspaceId(workspaceId));
};

export const { setWorkspaceId } = workspaceSlice.actions;

export default workspaceSlice.reducer;
