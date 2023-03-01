import classes from './Header.module.css';
import {Fragment} from 'react';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton.js';
const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='a plate with delicious snack'/>
        </div>
    </Fragment>
};
export default Header;