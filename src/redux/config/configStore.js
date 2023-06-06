import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
import workspaceSlice from "../slackSlice";

// Redux 미들웨어 설정
const middleware = [...getDefaultMiddleware(), thunk, logger];

// 스토어 설정
const store = configureStore({
  reducer: {
    workspace: workspaceSlice,
  },
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

// workspaceId를 가져오고 API 호출을 수행하는 비동기 작업
export const fetchWorkspaceId = () => async dispatch => {
  try {
    // workspaceId를 가져오는 API 엔드포인트로 요청 보내기
    const response = await axios.get("your-endpoint-to-get-workspaceId");
    const workspaceId = response.data;

    // workspaceId를 설정하는 액션을 디스패치
    dispatch(workspaceSlice.actions.setWorkspaceId(workspaceId));

    // workspaceId를 사용하여 추가 API 호출 필요한 경우
    const apiResponse = await axios.post(`https://api.swaglack.site/workspace/${workspaceId}/channel`);

    // apiResponse를 처리하는 또 다른 액션 디스패치
    // dispatch(anotherAction(apiResponse.data));
  } catch (err) {
    console.error(err);
    // 오류를 처리하는 액션 디스패치
    // dispatch(errorAction());
  }
};

export default store;
