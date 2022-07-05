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


export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () => {}, //point to a function
    cartItems:[ ],
    addItemToCart: () => {},
    cartCount:0 //initial value for the cart
})

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState([0]);

    //every cartItems change we'll change the cartCount
    useEffect(()=> {
        const newCartCount = cartItems.reduce(
            (total, cartItem )=> total+cartItem.quantity,
            0
            ); 
            setCartCount(newCartCount);
    }, [cartItems])

    // method that once the user click the add button it will add to the cartItems, the function will receive productToAdd
    const addItemToCart = ( productToAdd ) => {
        setCartItems( addCartItem( cartItems, productToAdd ) )
    }

    //expose in context
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value} >{children} </CartContext.Provider>;
}

