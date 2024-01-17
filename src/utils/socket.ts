import { Socket, io } from "socket.io-client";
import { store } from "../Store";
import { setUserList } from "../Store/auth/authSlice";
import { env } from "../env";

const URL = env.VITE_SOCKET_URL;

let socket: Socket;

export const connectSocket = () => {
  const state: any = store.getState();
  const persistedReducer: any = state.persistedReducer;
  socket = io(URL, {
    transports: ["websocket"],
    withCredentials: true,
    auth: {
      token: `Bearer ${persistedReducer.auth.token}`,
    },
  });

  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.on("user list", (value: any) => {
    store.dispatch(setUserList({ userList: value }));
  });
};

export const getSocket = () => socket;
