import { createSlice, configureStore } from "@reduxjs/toolkit";

interface FavoriteState {
  favorites: any;
}
const contactsSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [],
  } as FavoriteState,
  reducers: {
    AddFavorite: (state, action) => {
      // Kiểm tra xem món ăn đã có trong danh sách yêu thích chưa
      const isFavorite = state.favorites.find(
        (item: any) => item.idMeal === action.payload.idMeal
      );
      if (!isFavorite) {
        state.favorites.push(action.payload);
      }
    },
    RemoveFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item: any) => item.idMeal !== action.payload.idMeal
      );
    },
  },
});

export const { AddFavorite, RemoveFavorite } = contactsSlice.actions;

const store = configureStore({
  reducer: contactsSlice.reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
