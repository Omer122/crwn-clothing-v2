import { useContext } from 'react';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className='cart-dropdown-container' >
            <div className='cart-items' >
                {/* mapping over an array cartItems, each item to move to cartItem */}
                { cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}/> 
                    ))}
            </div>
            <Button >Go To Checkout</Button>
        </div>
    )
}
export default CartDropdown;
<CartItem />