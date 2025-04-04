import * as SQLite from "expo-sqlite";
import { UserDatabaseWriteType } from "../../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CURRENT_USER = "current_user";

export const setCurrentUserIdInStorage = async (id: number) => {
  try {
    await AsyncStorage.setItem(CURRENT_USER, `${id}`);
  } catch (error) {
    console.log(error);
  }
};
export const getCurrentUserIdInStorage = async () => {
  try {
    return await AsyncStorage.getItem(CURRENT_USER);
  } catch (error) {
    console.log(error);
  }
};

const db = SQLite.openDatabaseSync("finTrack.db");

export const createUserTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL,
        date TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
  try {
    await db.execAsync(query);
  } catch (error) {
    console.log(error);
  }
};

export const addUserToDatabase = async (user: UserDatabaseWriteType) => {
  const { fullName, date, email, password } = user;
  const query = `
      INSERT INTO users (fullName, date, email, password)
      VALUES (?, ?, ?, ?);
    `;
  try {
    const result = await db.runAsync(query, [fullName, date, email, password]);
    return result.lastInsertRowId;
  } catch (error) {
    return undefined;
  }
};
