import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((curVal,accum)=>{
        return curVal+accum.amount;
    }, 0);
    // const {items} = cartCtx;
const [btnIsHighlighted,setBtnIsHighlighted]=useState(false); 
useEffect(()=>{
    if (cartCtx.items.length === 0) {
        return;
    };
    setBtnIsHighlighted(true);
    const timer = setTimeout(()=>{setBtnIsHighlighted(false)},300);
    return ()=> {
        clearTimeout(timer);
    };
},[cartCtx.items]);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    
    return (
    <button className={btnClasses} onClick={props.onShowCart}>
        <span className={classes.icon}>
<CartIcon />
        </span>
        <span >
            Your Cart
        </span>
        <span className={classes.badge}>
           {numberOfCartItems}
        </span>
    </button>
    );
};
export default HeaderCartButton;