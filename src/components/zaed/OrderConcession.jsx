import React, { useState } from 'react';
import Header from '../home/pageComponents/Header';
import Footer from '../home/pageComponents/Footer';
import './OrderConcession.css';

const OrderConcession = () => {
  const foodTypes = ['Appetizers', 'Entrees', 'Desserts'];
  const [selectedType, setSelectedType] = useState(foodTypes[0]);
  const [items, setItems] = useState([
    { id: 1, type: 'Appetizers', name: 'Appetizer 1', price: 4.4, quantity: 0 },
    { id: 2, type: 'Appetizers', name: 'Appetizer 2', price: 5.2, quantity: 0 },
    { id: 3, type: 'Entrees', name: 'Entree 1', price: 12.99, quantity: 0 },
    { id: 4, type: 'Entrees', name: 'Entree 2', price: 14.75, quantity: 0 },
    { id: 5, type: 'Desserts', name: 'Dessert 1', price: 3.5, quantity: 0 },
    { id: 6, type: 'Desserts', name: 'Dessert 2', price: 4.25, quantity: 0 },
  ]);
  const [newItem, setNewItem] = useState({ name: '', price: '', type: foodTypes[0] });

  const handleTypeChange = (type) => setSelectedType(type);

  const handleQuantityChange = (id, quantity) => {
    setItems(items.map((i) => (i.id === id ? { ...i, quantity: parseInt(quantity, 10) || 0 } : i)));
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.price > 0) {
      setItems([
        ...items,
        {
          ...newItem,
          id: items.length + 1,
          price: parseFloat(newItem.price), // Ensure price is a float
          quantity: 0,
        },
      ]);
      setNewItem({ name: '', price: '', type: foodTypes[0] });
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleOrder = () => {
    const total = items.reduce((t, i) => t + i.price * i.quantity, 0).toFixed(2);
    alert(`Order placed! Total: $${total}`);
    setItems(items.map((i) => ({ ...i, quantity: 0 })));
  };

  const filteredItems = items.filter((i) => i.type === selectedType);
  const total = items.reduce((t, i) => t + i.price * i.quantity, 0).toFixed(2);

  return (
    <>
    <div className="OrderConcession">
      <header className="OrderConcession-header">
      <Header />
        <h1>Order Food</h1>
      </header>
      <div className="OrderConcession-content">
        <div className="FoodItems">
          <select
            className="FoodTypeSelect"
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            {foodTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <table className="FoodItemsTable">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Order</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((i) => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>${i.price.toFixed(2)}</td>
                  <td>
                    <input
                      className="QuantityInput"
                      type="number"
                      min="0"
                      value={i.quantity}
                      onChange={(e) => handleQuantityChange(i.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className="OrderButton"
                      onClick={() => handleQuantityChange(i.id, i.quantity + 1)}
                    >
                      Order
                    </button>
                  </td>
                  <td>
                    <button className="DeleteButton" onClick={() => handleDelete(i.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="AddItem">
          <input
            className="ItemInput"
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            className="ItemInput"
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <select
            className="ItemInput"
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          >
            {foodTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button className="AddButton" onClick={handleAddItem}>
            Add
          </button>
        </div>
        <div className="OrderSummary">
          <p className="TotalPrice">Total: ${total}</p>
          <button className="OrderButton" onClick={handleOrder}>
            Order
          </button>
        </div>
      </div>
    </div>
      <Footer /> </>
  );
};

export default OrderConcession;
