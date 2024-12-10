import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductsState {
    items: any[];
    favorites: number[]; // Store IDs of favorite products
}

const initialState: ProductsState = {
    items: [],
    favorites: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<any[]>) {
            state.items = action.payload;
        },
        toggleFavorite(state, action: PayloadAction<any>) {
            const productId = action.payload;
            if (state.favorites.includes(productId)) {
                state.favorites = state.favorites.filter((id) => id !== productId);
            } else {
                state.favorites.push(productId);
            }
        },
        removeProduct(state, action: PayloadAction<any>) {
            const productId:string = action.payload;
            state.items = state.items.filter((product) => product.id !== productId);
        },
        addProduct(state, action: PayloadAction<any>) {
            state.items.push(action.payload);
        }
    },
});

export const { setProducts, toggleFavorite, removeProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
