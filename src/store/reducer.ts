import { combineReducers } from "redux";

import itemsSlice from "../slices/items";

const rootReducer = combineReducers({
    items: itemsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;