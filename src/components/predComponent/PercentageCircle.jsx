import React from 'react';

const PercentageCircle = ({ percentage }) => {
    const radius = 50;
    const stroke = 15;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex items-center mt-4">
            {/* Circle pushed left with negative margin */}
            <div className="relative w-29 h-29 -ml-2"> {/* Negative margin-left */}
                <svg height={radius * 2} width={radius * 2}>
                    <circle
                        stroke="#fff"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#9ab87a"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeLinecap="square"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
            </div>

            {/* Text with adjusted spacing */}
            <div className="text-left ml-4"> {/* Added margin-left */}
                <p className="text-sm text-gray-700">Taux d'erreur</p>
                <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
            </div>
        </div>
    );
};

export default PercentageCircle;