import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateUUID } from "../util";

export type Board = {
  id: string;
  boardName: string;
  child: Card[];
};

export type CardInfo = {
 description: string;
  isChecked: boolean;
  parentId: string;
  lable?: string;
};

export type Card = CardInfo & {
  id: string;
};

export type CardCheckChange = {
  isChecked: boolean;
  parentId: string;
  id: string;
};

export type InitialState = {
  items: Board[];
};

const initialState: InitialState = {
  items: []
};

const itemsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addBoardHandler(state, action : PayloadAction<string>) {
      const newBoard : Board = {
        id: generateUUID(10),
        boardName: action.payload,
        child: [],
      };

      state.items.push(newBoard);   
    },
    deleteBoardHandler(state, action: PayloadAction<string>) {
      const exceptingIndex = state.items.findIndex((item: Board) => item.id === action.payload);

      if (exceptingIndex > -1) {
        state.items.splice(exceptingIndex, 1);
      }
    },
    addCardHandler(state, action: PayloadAction<Card>) {
      const { items } = state;
      const payload: Card = action.payload;

      const findIndex = items.findIndex((v) => v.id === payload.parentId);

      if (findIndex > -1) {
        items[findIndex].child.push(payload);
      }
    },
    changeCardChecked(state, action: PayloadAction<CardCheckChange>) {
      const payload = action.payload;
      const parentIndex = state.items.findIndex((v: Board) => v.id === payload.parentId);
      
      if (parentIndex <= -1) {
        return;
      }

      const cardIndex = state.items[parentIndex].child.findIndex((v: Card) => v.id === payload.id);

      if (cardIndex <= -1) {
        return;
      }

      state.items[parentIndex].child[cardIndex].isChecked = payload.isChecked;
    },
    updateCardHandler(state, action: PayloadAction<Card>) {
      const payload = action.payload;

      const parentIndex = state.items.findIndex((v: Board) => v.id === payload.parentId);
      if (parentIndex <= -1) {
        return;
      }

      const cardIndex = state.items[parentIndex].child.findIndex((v: Card) => v.id === payload.id);
      if (cardIndex <= -1) {
        return;
      }

      const target = state.items[parentIndex].child[cardIndex];

      target.description = payload.description;
      target.isChecked = payload.isChecked;
      if (payload.lable) {
        target.lable = payload.lable;
      } else {
        delete target.lable;
      }
    },
    deleteCardHandler(state, action: PayloadAction<{ id : string, parentId: string}>) {
      const payload = action.payload;
      const parentIndex = state.items.findIndex((v: Board) => v.id === payload.parentId);
      
      if (parentIndex <= -1) {
        return;
      }

      const cardIndex = state.items[parentIndex].child.findIndex((v: Card) => v.id === payload.id);

      if (cardIndex <= -1) {
        return;
      }

      state.items[parentIndex].child.splice(cardIndex, 1);
    }
  },
  extraReducers: builder => {},
});

export default itemsSlice;