import {createSlice} from '@reduxjs/toolkit';


export const CartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[],
    },
    reducers:{
        addToCart:(state,action)=>{
            const itemPresnt=state.cart.find((item)=>item.id === action.payload.id);
            if(itemPresnt){
                itemPresnt.quantity++;
            }else{
                state.cart.push({...action.payload,quantity:1});
            }
        },
        removeFromCart:(state,action)=>{
            const removeItem=state.cart.find((item)=>item.id === action.payload.id);
            state.cart = removeItem;
        },
        incrementQuantity:(state,action)=>{
            const itemPresnt=state.cart.find((item)=>item.id === action.payload.id);
            if(itemPresnt){
                itemPresnt.quantity++;
            }
        },
        decrementQuantity:(state,action)=>{
            const itemPresnt=state.cart.find((item)=>item.id === action.payload.id);
            if(itemPresnt == 1){
                itemPresnt.quantity = 0;
                const removeItem=state.cart.filter((item)=>item.id === action.payload.id);
                state.cart = removeItem;
            }else{
                itemPresnt.quantity--;
            } 
        }
    }

})

export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity} = CartSlice.actions;

export default CartSlice.reducer;