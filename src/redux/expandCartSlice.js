import { createSlice } from '@reduxjs/toolkit';

const expandCartSlice = createSlice({
	name: 'expandCart',
	initialState: false,
	reducers: {
        expandCartTrue: (state, action) => {
            return true;
        },
        expandCartFalse: (state, action) => {
            return false;
        },

	},
});


export const { expandCartTrue, expandCartFalse } = expandCartSlice.actions;

export default expandCartSlice.reducer;