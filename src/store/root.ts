import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {api, TaskItemType, TaskItemUpType} from '../api/api';

export const getAllTasks = createAsyncThunk<TaskItemType[] | undefined, void>(
  'root/getAllTasks',
  async (todo, {dispatch, rejectWithValue}) => {
    dispatch(setIsFetching(true));
    try {
      const res = await api.getAllTasks();
      dispatch(setIsFetching(false));
      return res.data.todo;
    } catch (e) {
      const err = e as Error | AxiosError;
      return rejectWithValue(err.message);
    }
  },
);

export const refreshAllTasks = createAsyncThunk<
  TaskItemType[] | undefined,
  void
>('root/refreshAllTasks', async (_, {rejectWithValue}) => {
  try {
    const res = await api.refreshAllTasks();
    return res.data.todo;
  } catch (e) {
    const err = e as Error | AxiosError;
    return rejectWithValue(err.message);
  }
});

export const creatCurrentTask = createAsyncThunk<
  TaskItemType[] | undefined,
  TaskItemType
>('root/creatCurrentTask', async (item, {rejectWithValue}) => {
  try {
    const res = await api.creatCurrentTask(item);
    return res.data.todo;
  } catch (e) {
    const err = e as Error | AxiosError;
    return rejectWithValue(err.message);
  }
});

export const editCurrentTask = createAsyncThunk<
  TaskItemType[] | undefined,
  TaskItemType
>('root/editCurrentTask', async (item, {rejectWithValue}) => {
  try {
    const res = await api.aditCurrentTask(item);
    return res.data.todo;
  } catch (e) {
    const err = e as Error | AxiosError;
    return rejectWithValue(err.message);
  }
});
export const updateCurrentTask = createAsyncThunk<
  TaskItemType[] | undefined,
  TaskItemUpType
>('root/updateCurrentTask', async (itemUp, {rejectWithValue}) => {
  try {
    const res = await api.updateCurrentTask(itemUp);
    return res.data.todo;
  } catch (e) {
    const err = e as Error | AxiosError;
    return rejectWithValue(err.message);
  }
});
export const deleteCurrentTask = createAsyncThunk<
  TaskItemType[] | undefined,
  TaskItemType
>('root/deleteCurrentTask', async (item, {rejectWithValue}) => {
  try {
    const res = await api.deleteCurrentTask(item);
    return res.data.todo;
  } catch (e) {
    const err = e as Error | AxiosError;
    return rejectWithValue(err.message);
  }
});

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    isFetching: false as boolean,
    allTasks: [] as TaskItemType[],
    currentTask: {} as TaskItemType,
  },
  reducers: {
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.allTasks = action.payload
          ? [...action.payload]
          : ([] as TaskItemType[]);
      })
      .addCase(refreshAllTasks.fulfilled, (state, action) => {
        state.allTasks = action.payload
          ? action.payload
          : ([] as TaskItemType[]);
      })
      .addCase(creatCurrentTask.fulfilled, (state, action) => {
        state.allTasks = action.payload
          ? [...action.payload]
          : ([] as TaskItemType[]);
      })
      .addCase(editCurrentTask.fulfilled, (state, action) => {
        state.allTasks = action.payload
          ? [...action.payload]
          : ([] as TaskItemType[]);
      })
      .addCase(deleteCurrentTask.fulfilled, (state, action) => {
        state.allTasks = action.payload
          ? [...action.payload]
          : ([] as TaskItemType[]);
      })
      .addCase(updateCurrentTask.fulfilled, (state, action) => {
        state.allTasks = action.payload
          ? [...action.payload]
          : ([] as TaskItemType[]);
      });
  },
});
export const root = rootSlice.reducer;
export const {setIsFetching} = rootSlice.actions;
