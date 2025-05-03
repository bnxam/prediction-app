import React from 'react';

const PercentageCircle = ({ percentage }) => {
  const radius = 45;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="mx-auto w-fit w-12 h-12 relative">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb" // gris clair (bg)
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="red"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-sm text-gray-700">taux d'erreur</p>
        <p className="text-xl font-bold text-gray-900">{percentage} %</p>
      </div>
    </div>
  );
};

export default PercentageCircle;
