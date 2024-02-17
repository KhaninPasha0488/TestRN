import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {api, TaskItemType, PokemonType} from '../api/api';

export const getAllTasks = createAsyncThunk<
  TaskItemType[] | undefined,
  number
>('root/getAllTasks', async (offset: number, {dispatch, rejectWithValue}) => {
  dispatch(setIsFetching(true));
  try {
    const res = await api.getAllTasks(offset);
    dispatch(setIsFetching(false));
    return res.data.results;
  } catch (e) {
    const err = e as Error | AxiosError;
    return rejectWithValue(err.message);
  }
});

export const refreshAllTasks = createAsyncThunk<
  TaskItemType[] | undefined,
  void
>('root/refreshAllTasks', async (_, {rejectWithValue}) => {
  try {
    const res = await api.refreshAllTasks();
    return res.data.results;
  } catch (e) {
    const err = e as Error | AxiosError;
    return rejectWithValue(err.message);
  }
});

export const getCurrentPokemon = createAsyncThunk<
  PokemonType | undefined,
  string
>('root/getCurrentPokemon', async (params, {rejectWithValue}) => {
  try {
    const res = await api.getCurrentPokemon(params);
    return res.data;
  } catch (e) {
    const err = e as Error | AxiosError;
    return rejectWithValue(err.message);
  }
});

export const clearCurrentPokemonAC = createAction('root/clearCurrentPokemonAC');
const rootSlice = createSlice({
  name: 'root',
  initialState: {
    isFetching: false as boolean,
    allTasks: [] as TaskItemType[],
    currentPokemon: {} as PokemonType,
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
          ? [...state.allTasks, ...action.payload]
          : ([] as TaskItemType[]);
      })
      .addCase(refreshAllTasks.fulfilled, (state, action) => {
        state.allTasks = action.payload
          ? action.payload
          : ([] as TaskItemType[]);
      })
      .addCase(getCurrentPokemon.fulfilled, (state, action) => {
        state.currentPokemon = action.payload
          ? action.payload
          : ({} as PokemonType);
      })
      .addCase(clearCurrentPokemonAC, state => {
        state.currentPokemon = {} as PokemonType;
      });
  },
});
export const root = rootSlice.reducer;
export const {setIsFetching} = rootSlice.actions;
