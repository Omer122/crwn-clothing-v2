import { createContext, useState, useEffect } from "react";

//helper function adds productToAdd to cartItems
const addCartItem = ( cartItems, productToAdd ) =>{
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find( 
        (cartItem) => cartItem.id=== productToAdd.id ); //return true if the product was found

    //if found, increment quantity
    if (existingCartItem) {
        return cartItems.map( (cartItem) =>                    //mapping all the items
            cartItem.id=== productToAdd.id ?                   //if the item found
                {...cartItem, quantity: cartItem.quantity+1 } //increase quantity
                : cartItem                                    //return without a change
            );
        }
    // return new array with modified cartItems/new cart item
    return [...cartItems, {...productToAdd, quantity:1}]
}

// [{...productToAdd, quantity:1}] // empty cart - returns the product+quantity
//[cartItems, {...productToAdd, quantity:1}]// this product isn't in the cart


//helper function removes productToRemove from cartItems
const removeCartItem = ( cartItems, productToRemove ) =>{
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find( 
        (cartItem) => cartItem.id=== productToRemove.id ); //return true if the product was found

    //if it's the last item, take it off the cart
    if (existingCartItem.quantity===1) {                      
        return cartItems.filter( (cartItem) =>   //filters all the items in the cart
            cartItem.id!== productToRemove.id );       //return array without the item
        }

    // decreses -1 of the item by id mapping
    return cartItems.map( (cartItem) =>                    //mapping all the items
    cartItem.id=== productToRemove.id ?                   //if the item found
        {...cartItem, quantity: cartItem.quantity-1 } //decrease quantity
        : cartItem                                    //return without a change
    );
}
//helper function clears all of productToClear from cartItems
const clearCartItem = ( cartItems, productToClear ) =>{
                          
    return cartItems.filter( (cartItem) =>   //filters all the items in the cart
        cartItem.id!== productToClear.id );       //return array without the item
     
}

export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () => {},     //point to a function
    cartItems:[ ],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: ()=> {},
    cartCount:0,                 //initial value for the cart
    cartTotal:0                     //initial value for total
})

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState([0]);
    const [ cartTotal, setCartTotal ] = useState([0]);

    //every cartItems change we'll change the cartCount
    useEffect(()=> {
        const newCartCount = cartItems.reduce(
            (total, cartItem )=> total+cartItem.quantity,
            0
            ); 
            setCartCount(newCartCount);
    }, [cartItems])

    //every cartItems change we'll change & compute the cartCount
    useEffect(()=> {
        const newCartTotal = cartItems.reduce(
            (total, cartItem )=> total+(cartItem.quantity*cartItem.price),
            0
            ); 
            setCartTotal(newCartTotal);
    }, [cartItems])

    // method that once the user click the add button it will add to the cartItems, the function will receive productToAdd
    const addItemToCart = ( productToAdd ) => {
        setCartItems( addCartItem( cartItems, productToAdd ) )
    }

    const removeItemFromCart = ( productToRemove ) => {
        setCartItems( removeCartItem( cartItems, productToRemove ) )
    }

    const clearItemFromCart = ( productToClear ) => {
        setCartItems( clearCartItem( cartItems, productToClear ) )
    }

    //expose in context
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, cartTotal, removeItemFromCart, clearItemFromCart };

    return <CartContext.Provider value={value} >{children} </CartContext.Provider>;
}

