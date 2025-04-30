import React from 'react';

const PaymentsSection = ({ payments, totalPayments }) => (
  <div className="p-4 bg-white rounded shadow-md w-1/2">
    <h2 className="text-lg font-semibold mb-4" style={{ color: '#4A5565' }}>Paiements</h2>
    <ul className="space-y-4 mb-4">
      {payments.map((payment, index) => (
        <li key={index} className="flex justify-between">
          <span className="font-semibold" style={{ color: '#4A5565' }}>
            {payment.date}
          </span>
          <span className="font-semibold" style={{ color: '#4A5565' }}>
            {payment.amount}
          </span>
        </li>
      ))}
    </ul>
    {/* Affichage du Total */}
    <div className="flex justify-between mt-4 border-t pt-2">
      <span className="font-semibold text-gray-700">Total :</span>
      <span className="font-semibold" style={{ color: '#000229' }}>
        {totalPayments.toLocaleString()} DA
      </span>
    </div>
  </div>
);

export default PaymentsSection;
