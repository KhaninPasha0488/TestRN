import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {api, PokemonItem, PokemonT} from '../api/api';

export const getAllPokemonTC = createAsyncThunk<
  PokemonItem[] | undefined,
  number
>('root/getAllPokemon', async (offset: number, {dispatch}) => {
  dispatch(setIsFetching(true));
  try {
    const res = await api.getAllPokemon(offset);
    dispatch(setIsFetching(false));
    return res.data.results;
  } catch (e) {}
});
export const refreshAllPokemonTC = createAsyncThunk<
  PokemonItem[] | undefined,
  void
>('root/refreshAllPokemon', async () => {
  try {
    const res = await api.refreshAllPokemon();
    return res.data.results;
  } catch (e) {}
});
export const getCurrentPokemonTC = createAsyncThunk<
  PokemonT | undefined,
  string
>('root/getCurrentPokemon', async params => {
  try {
    const res = await api.getCurrentPokemon(params);
    return res.data;
  } catch (e) {}
});
export const clearCurrentPokemonAC = createAction('root/clearCurrentPokemonAC');
const rootSlice = createSlice({
  name: 'root',
  initialState: {
    isFetching: false as boolean,
    allPokemon: [] as PokemonItem[],
    currentPokemon: {} as PokemonT,
  },
  reducers: {
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllPokemonTC.fulfilled, (state, action) => {
        state.allPokemon = action.payload
          ? [...state.allPokemon, ...action.payload]
          : ([] as PokemonItem[]);
      })
      .addCase(refreshAllPokemonTC.fulfilled, (state, action) => {
        state.allPokemon = action.payload
          ? action.payload
          : ([] as PokemonItem[]);
      })
      .addCase(getCurrentPokemonTC.fulfilled, (state, action) => {
        state.currentPokemon = action.payload
          ? action.payload
          : ({} as PokemonT);
      })
      .addCase(clearCurrentPokemonAC, state => {
        state.currentPokemon = {} as PokemonT;
      });
  },
});
export const root = rootSlice.reducer;
export const {setIsFetching} = rootSlice.actions;
