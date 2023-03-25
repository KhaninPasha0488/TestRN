import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {api, PokemonItemType, PokemonType} from '../api/api';

export const getAllPokemon = createAsyncThunk<
  PokemonItemType[] | undefined,
  number
>('root/getAllPokemon', async (offset: number, {dispatch, rejectWithValue}) => {
  dispatch(setIsFetching(true));
  try {
    const res = await api.getAllPokemon(offset);
    dispatch(setIsFetching(false));
    return res.data.results;
  } catch (e) {
    const err = e as Error | AxiosError;
    return rejectWithValue(err.message);
  }
});

export const refreshAllPokemon = createAsyncThunk<
  PokemonItemType[] | undefined,
  void
>('root/refreshAllPokemon', async (_, {rejectWithValue}) => {
  try {
    const res = await api.refreshAllPokemon();
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
    allPokemon: [] as PokemonItemType[],
    currentPokemon: {} as PokemonType,
  },
  reducers: {
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllPokemon.fulfilled, (state, action) => {
        state.allPokemon = action.payload
          ? [...state.allPokemon, ...action.payload]
          : ([] as PokemonItemType[]);
      })
      .addCase(refreshAllPokemon.fulfilled, (state, action) => {
        state.allPokemon = action.payload
          ? action.payload
          : ([] as PokemonItemType[]);
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
