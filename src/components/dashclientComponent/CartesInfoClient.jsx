import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

const CartesInfoClient = ({ data }) => {
    if (!data?.length) return null;

    const realValues = data
        .filter(d => d.realValue !== null)
        .map(d => d.realValue);

    const stats = {
        max: Math.max(...realValues),
        min: Math.min(...realValues),
        avg: (realValues.reduce((a, b) => a + b, 0) / realValues.length).toFixed(1)
    };

    const cards = [
        {
            title: "Pic de consommation",
            value: stats.max,
            icon: <ArrowUp className="w-5 h-5" />,
            color: "text-green-600 bg-[#EAFAEA]"
        },
        {
            title: "Consommation minimale",
            value: stats.min,
            icon: <ArrowDown className="w-5 h-5" />,
            // color: "text-blue-600 bg-[#F3F3E0]"
            color: "text-blue-800 bg-[#fff8ce]"
        },
        {
            title: "Moyenne",
            value: stats.avg,
            icon: <TrendingUp className="w-5 h-5" />,
            color: "text-purple-600 bg-[#fae8ff]"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
                <div 
                    key={index}
                    className={`p-4 rounded-lg ${card.color} bg-opacity-50 border border-transparent hover:border-gray-200 transition-colors`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-full ${card.color} bg-opacity-30`}>
                            {card.icon}
                        </div>
                        <h3 className="font-medium text-gray-700">{card.title}</h3>
                    </div>
                    <p className="text-2xl font-semibold">{card.value} kWh</p>
                </div>
            ))}
        </div>
    );
};

export default CartesInfoClient;