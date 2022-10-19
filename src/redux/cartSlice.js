import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
		addItem: (state, action) => {
			const item = {
                id: Date.now(),
                item : action.payload.item,
                quant : 1
            }
			state.unshift(item);
		},
        changeQuant: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload.id);
            state[index].quant = action.payload.quant;
        },
        removeItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
	},
});


export const { addItem, changeQuant, removeItem } = cartSlice.actions;

export default cartSlice.reducer;