import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `anecdote '${action.payload}' voted`
    case "CREATE":
      return `anecdote '${action.payload}' created`;
    case "CLEAR":
      return ''
    case "ERROR":
      return "too short anecdote, must have length 5 or more";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
