import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import './FoodList.css';

const FoodList = () => {
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:3000/api/foods')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFoods(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleOrder = (foodId, price) => {
    if (!isAuthenticated) {
      navigate('/login'); 
      return; 
    }

    const totalprice = price;

    fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, food_id: foodId, totalprice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Order placed successfully!');
        } else {
          alert('Failed to place order: ' + data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="food-list">
      {foods.map((food) => (
        <div key={food._id} className="food-card">
          <img src={food.img} alt={food.food_name} className="food-img" />
          <h3>{food.food_name}</h3>
          <p>Type: {food.food_type}</p>
          <p>Price: ${food.price}</p>
          <button onClick={() => handleOrder(food._id, food.price)}>Order</button>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
