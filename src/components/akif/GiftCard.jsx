import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';

/**
 * @file GiftCard.jsx
 * @description This component enables users to purchase, view, and redeem gift cards, 
 * manage gift card balances, and apply them to their accounts or purchases.
 */

const GiftCard = () => {
  const cartItems = [
    { id: 1, name: 'Gift Card 1', price: 40, quantity: 1, description: '2 tickets + 2 food selections' },
    { id: 2, name: 'Gift Card 2', price: 80, quantity: 1, description: '4 tickets + 4 selections' },
    { id: 3, name: 'Gift Card 3', price: 20, quantity: 1, description: '1 ticket + 1 food selection' }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4;
  const total = subtotal + shipping;

  return (
    <div className="shopping-cart-container">
      {/* Shopping Cart Section */}
      <div className="cart-section">
        <div className="cart-header">
          <ArrowLeft className="w-6 h-6 mr-2" />
          <h2 className="cart-title">Shopping Continue</h2>
        </div>

        <div className="cart-summary">
          <h3>Shopping cart</h3>
          <p>You have {cartItems.length} item in your cart</p>
        </div>

        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-content">
                <div className="cart-item-details">
                  <div className="cart-item-price-badge">
                    ${item.price}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>
                  <span className="font-semibold">${item.price}</span>
                  <Trash2 className="w-5 h-5 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="payment-section">
        <div className="payment-card">
          <h3 className="text-xl font-semibold mb-6">Card Details</h3>

          <div className="card-type-selection">
            <div className="card-type-item">
              <img src="/api/placeholder/40/25" alt="Mastercard" className="w-10" />
            </div>
            <div className="card-type-item">
              <img src="/api/placeholder/40/25" alt="Visa" className="w-10" />
            </div>
            <div className="card-type-item">
              <img src="/api/placeholder/40/25" alt="Other" className="w-10" />
            </div>
          </div>

          <div className="payment-form">
            <div>
              <label>Name on card</label>
              <input type="text" placeholder="Name" />
            </div>
            <div>
              <label>Card Number</label>
              <input type="text" placeholder="1111 2222 3333 4444" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label>Expiration date</label>
                <input type="text" placeholder="mm/yy" />
              </div>
              <div className="flex-1">
                <label>CVV</label>
                <input type="text" placeholder="123" />
              </div>
            </div>
          </div>

          <div className="payment-summary">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>
            <div className="summary-item font-semibold">
              <span>Total (Tax incl.)</span>
              <span>${total}</span>
            </div>
          </div>

          <button className="checkout-button">Checkout ${total}</button>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;