import classes from './Cart.module.css';
import Modal from '../UI/Modal.js';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout.js'; 

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const orderHandler = () => {
        setIsCheckout(true);
    };
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((el) => (<CartItem
                key={el.id}
                name={el.name}
                amount={el.amount}
                price={el.price}
                onRemove={cartItemRemoveHandler.bind(null, el.id)}
                onAdd={cartItemAddHandler.bind(null, el)}
            />))}</ul>
    );
    const modalActions =  <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button} onClick = {orderHandler}>Order</button>}
</div>
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel = {props.onClose}/>}
           {!isCheckout && modalActions}
        </Modal>
    );
};
export default Cart;