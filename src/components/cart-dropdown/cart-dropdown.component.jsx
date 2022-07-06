import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import Checkout from '../../routes/checkout/checkout.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate(); // a hook that gets a navigate function

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }


    return (
        <div className='cart-dropdown-container' >
            <div className='cart-items' >
                {/* mapping over an array cartItems, each item to move to cartItem */}
                { cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}/> 
                    ))}
            </div>
            <Button onClick={goToCheckoutHandler} >Go To Checkout</Button>
        </div>
    )
}
export default CartDropdown;
<CartItem />