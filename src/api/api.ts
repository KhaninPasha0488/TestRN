import axios from 'axios';
import {Platform} from 'react-native';

const BASE_URL =
  Platform.OS === 'ios' ? 'http://localhost:5050' : 'http://10.0.2.2:5050';

const instance = axios.create({
  baseURL: BASE_URL,
});

export type TaskItemType = {
  _id: string;
  title: string;
  description: string;
  is_done: boolean;
  is_important: boolean;
};
export type TaskItemUpType = {
  _id: string;
  is_done: boolean;
};

export const api = {
  getAllTasks() {
    return instance.get<{todo: TaskItemType[]}>(BASE_URL);
  },

  refreshAllTasks() {
    return instance.get<{todo: TaskItemType[]}>(BASE_URL);
  },

  creatCurrentTask(item: TaskItemType) {
    return instance.post<{todo: TaskItemType[]}>(`${BASE_URL}/todo`, {item});
  },
  aditCurrentTask(item: TaskItemType) {
    return instance.post<{todo: TaskItemType[]}>(
      `${BASE_URL}/todo/${item._id}`,
      {item},
    );
  },
  deleteCurrentTask(item: TaskItemType) {
    return instance.delete<{todo: TaskItemType[]}>(
      `${BASE_URL}/todo/${item._id}`,
    );
  },
  updateCurrentTask(item: TaskItemUpType) {
    return instance.put<{todo: TaskItemType[]}>(
      `${BASE_URL}/todo/${item._id}`,
      {
        item,
      },
    );
  },
};
