import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// // import { useState } from "react";
// import { instance } from "../mytools/instance";
// import { PostApi } from "../mytools/Instance";

const initialState = {
  slack: [],
  userinfo: {},
  isLoading: false,
  isSuccess: false,
  error: null,
};

// export const __getComments = createAsyncThunk(
//   "comments/getComments",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await instance.get(`/comments/${payload}`);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const __addSlack = createAsyncThunk("slack/addSlack", async (payload, thunkAPI) => {
  console.log(payload);
  try {
    const { data } = await PostApi.postSlack(payload);

    console.log(data);
    return thunkAPI.fulfillWithValue({ data, payload });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const __confirmSlack = createAsyncThunk("slack/confirmSlack", async (payload, thunkAPI) => {
  console.log(payload);
  try {
    const data = await PostApi.postConfirmSlack(payload);
    console.log(data);
    return thunkAPI.fulfillWithValue(data, payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteComment = createAsyncThunk("comments/deleteComment", async (payload, thunkAPI) => {
  try {
    await instance.delete(`comments/${payload.postId}/${payload.commentId}`, {
      headers: {
        Authorization: payload.cookie,
      },
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __editComment = createAsyncThunk("comments/editComment", async (payload, thunkAPI) => {
  try {
    await axios.patch(`https://shrouded-badlands-79466.herokuapp.com/comments/${payload.id}`, payload, {});
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const slackSlice = createSlice({
  name: "slack",
  initialState,
  reducers: {
    clearSlack: (state, action) => {
      state.slack = [];
    },
  },
  extraReducers: {
    // [__getComments.pending]: (state) => {
    //   state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    // },
    // [__getComments.fulfilled]: (state, action) => {
    //   state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.comments = action.payload; // Store에 있는 comments에 서버에서 가져온 comments를 넣습니다.
    // },
    // [__getComments.rejected]: (state, action) => {
    //   state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    // },
    [__addSlack.pending]: state => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [__addSlack.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;

      console.log(action.payload);

      state.slack = action.payload;
    },
    [__addSlack.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__confirmSlack.pending]: state => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [__confirmSlack.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const nic = action.payload.data.data.createMember.profileName;
      localStorage.setItem("nic", nic);
      console.log(action.payload);

      state.userinfo = action.payload;
    },
    [__confirmSlack.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const { clearSlack } = slackSlice.actions;
export default slackSlice.reducer;
