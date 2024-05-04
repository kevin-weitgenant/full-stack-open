import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
    },
    clearNotification: (state) => {
      state.message = null;
    },
  },
});



export const setNotificationThunk = (message,duration) => {
  return async (dispatch) => {
    console.log("message = ", message);
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration*1000); // Clears the notification after 5 seconds
  };
};



export const { setNotification, clearNotification } = notificationSlice.actions;

const notificationReducer = notificationSlice.reducer;


export default notificationReducer;