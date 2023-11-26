import mongoose from "mongoose";
import { BD } from "../config/Axios";

const conn = {
  isConnected: false,
};

export const ConeccionBD = async () => {
  if (conn.isConnected) return;

  const db = await mongoose.connect("mongodb://localhost:27017/sistemaescolar");
  console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
};

mongoose.connection.on("connected", (connection) => {
  console.log("mongoose connection connected");
});

mongoose.connection.on("error", (connection) => {
  console.log("mongoose connection error");
});
