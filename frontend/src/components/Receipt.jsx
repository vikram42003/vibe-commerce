import React from "react";

const Receipt = ({ receipt, onClose }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Thank You for Your Order!</h2>

      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold">Order #{receipt.orderId}</h3>
        <p className="text-sm text-gray-500">Date: {new Date(receipt.timestamp).toLocaleString()}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold">Billed To:</h4>
        <p>{receipt.customerName}</p>
        <p>{receipt.customerEmail}</p>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Items Purchased:</h4>
        <div className="space-y-4">
          {receipt.items.map((item) => (
            <div key={item.productId} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                </p>
              </div>
              <p className="font-semibold">${item.subtotal}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t mt-6 pt-4">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Grand Total:</span>
          <span>${receipt.total}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onClose}
          className="w-full sm:w-auto bg-violet-500 cursor-pointer text-white font-bold py-2 px-6 rounded-lg hover:bg-violet-600 transition-colors duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Receipt;
