const Cart = ({ cartItems, updateCart }) => {
    return (
      <div>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between">
            <p>{item.name}</p>
            <input type="number" value={item.quantity} onChange={(e) => updateCart(item.id, e.target.value)} />
            <p>${item.price * item.quantity}</p>
          </div>
        ))}
        <button onClick={() => updateCart([], true)}>Clear Cart</button>
      </div>
    );
  };
  