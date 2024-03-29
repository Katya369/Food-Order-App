import classes from './AvailableMeals.module.css';
import Cart from '../UI/Cart.js';
import MealItem from './MealItem/MealItem.js';
import { useEffect, useState } from 'react';
// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];
const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    useEffect(() => {
        const fetchMeals = async () => {
          
            const response = await fetch('https://my-first-project-in-reac-68f8d-default-rtdb.firebaseio.com/meals.json').then();
           if (!response.ok) {
            throw new Error ('Something went wrong!');
           }
            const responseData = await response.json();
            const loadedMeals = [];
            for(const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price:responseData[key].price
                });
            };
            setMeals(loadedMeals);
            setIsLoading(false);
        };
       
            fetchMeals().catch(error => {
                setIsLoading(false);
                setHttpError(error.message);
            });
        
}, []);
if (isLoading) {
    return (
        <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>
    )
};
    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    };

const mealsList = meals.map(el => <MealItem
    id={el.id}
    key={el.id}
    name={el.name}
    description={el.description}
    price={el.price} />);

return <section className={classes.meals}>
    <Cart><ul>
        {mealsList}
    </ul>
    </Cart>
</section>
};
export default AvailableMeals;