import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersDB from "../firebase/firestoreDB";

// User
export const createUserDB = createAsyncThunk(
  "user/createUserDB",
  async (email) => {
    return await usersDB.create(email);
  }
);
export const updateUserDB = createAsyncThunk(
  "user/updateUserDB",
  async ({ email, newEmail }, { getState }) => {
    const state = getState();
    return await usersDB
      .copy(newEmail, state.user.mylist, state.user.history)
      .then(async () => {
        await usersDB.delete(email);
      });
  }
);
export const deleteUserDB = createAsyncThunk(
  "user/deleteUserDB",
  async (email) => {
    return await usersDB.delete(email);
  }
);

export const getUserDataDB = createAsyncThunk(
  "user/getUserDataDB",
  async (email) => {
    const result = await usersDB.initialize(email);
    return result.data();
  }
);

// Mylist
export const addMyListDB = createAsyncThunk(
  "user/addMyListDB",
  async ({ media, email }) => {
    await usersDB.insertMyList(email, media);
    return media;
  }
);

export const removeMyListDB = createAsyncThunk(
  "user/removeMyListDB",
  async ({ media, email }) => {
    await usersDB.removeMyList(email, media);
    return media;
  }
);

// Cart
export const addToCartDB = createAsyncThunk(
  "user/addToCartDB",
  async ({ media, email }) => {
    await usersDB.addToCart(email, media);
    return media;
  }
);

export const removeFromCartDB = createAsyncThunk(
  "user/removeFromCartDB",
  async ({ media, email }) => {
    await usersDB.removeFromCart(email, media);
    return media;
  }
);

export const clearCartDB = createAsyncThunk(
  "user/clearCartDB",
  async ({ media, email }) => {
    await usersDB.clearCart(email);
    return media;
  }
);

export const addOneCartDB = createAsyncThunk(
  "user/addOneCartDB",
  async ({ media, email }) => {
    await usersDB.addOneCart(email, media);
    return media;
  }
);
export const removeOneCartDB = createAsyncThunk(
  "user/removeOneCartDB",
  async ({ media, email }) => {
    await usersDB.removeOneCart(email, media);
    return media;
  }
);

// History
export const addHistoryDB = createAsyncThunk(
  "user/addHistoryDB",
  async ({ media, email }) => {
    await usersDB.insertHistory(email, media);
    return media;
  }
);

export const removeHistoryDB = createAsyncThunk(
  "user/removeHistoryDB",
  async ({ media, email }) => {
    await usersDB.removeHistory(email, media);
    return media;
  }
);

export const clearHistoryDB = createAsyncThunk(
  "user/clearHistoryDB",
  async ({ media, email }) => {
    await usersDB.clearHistory(email);
    return media;
  }
);

const initialState = {
  user: null,
  mylist: [],
  cart: [],
  history: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },

  extraReducers: {
    // User
    [getUserDataDB.fulfilled]: (state, action) => {
      state.mylist = action.payload?.mylist ? action.payload.mylist : [];
      state.cart = action.payload?.cart ? action.payload.cart.reverse() : [];
      state.history = action.payload?.history
        ? action.payload.history.reverse()
        : [];
    },
    // Mylist
    [addMyListDB.fulfilled]: (state, action) => {
      state.mylist.push(action.payload);
    },
    [removeMyListDB.fulfilled]: (state, action) => {
      state.mylist = state.mylist.filter(
        (media) =>
          !(
            media.id === action.payload.id &&
            media.media_type === action.payload.media_type
          )
      );
    },
    // Cart
    [addToCartDB.fulfilled]: (state, action) => {
      state.cart.unshift(action.payload);
    },
    [removeFromCartDB.fulfilled]: (state, action) => {
      state.cart = state.cart.filter(
        (media) =>
          !(
            media.id === action.payload.id &&
            media.outlet_id === action.payload.outlet_id
          )
      );
    },
    [clearCartDB.fulfilled]: (state) => {
      state.cart = [];
    },
    [addOneCartDB.fulfilled]: (state, action) => {
      state.cart = action.payload;
      for (let i = 0; i < state.cart.length; i++) {
        if (
          state.cart[i].id === action.payload.id &&
          state.cart[i].outlet_id === action.payload.outlet_id
        ) {
          state.cart[i].quantity += 1;
        }
      }
    },
    [removeOneCartDB.fulfilled]: (state, action) => {
      state.cart = action.payload;
      for (let i = 0; i < state.cart.length; i++) {
        if (
          state.cart[i].id === action.payload.id &&
          state.cart[i].outlet_id === action.payload.outlet_id
        ) {
          state.cart[i].quantity -= 1;
        }
      }
    },
    // History
    [addHistoryDB.fulfilled]: (state, action) => {
      state.history.unshift(action.payload);
    },
    [removeHistoryDB.fulfilled]: (state, action) => {
      state.history = state.history.filter(
        (media) =>
          !(
            media.id === action.payload.id &&
            media.media_type === action.payload.media_type
          )
      );
    },
    [clearHistoryDB.fulfilled]: (state) => {
      state.history = [];
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectMyList = (state) => state.user.mylist;
export const selectCart = (state) => state.user.cart;
export const selectHistory = (state) => state.user.history;

export default userSlice.reducer;
