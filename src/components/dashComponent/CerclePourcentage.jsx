import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CerclePourcentage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/dash/consommation-par-client')
            .then(res => setData(res.data))
            .catch(err => console.error("Erreur récupération données", err));
    }, []);

    const couleurs = [
        '#6366F1', '#10B981', '#F59E0B', '#EF4444',
        '#8B5CF6', '#3B82F6', '#F472B6', '#22D3EE', '#A0AEC0'
    ];

    const total = data.reduce((acc, val) => acc + val.consommation, 0);

    const chartData = {
        labels: data.map(d => d.client),
        datasets: [
            {
                data: data.map(d => d.consommation),
                backgroundColor: couleurs.slice(0, data.length),
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false // ❌ on désactive la légende native
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        const percentage = ((value / total) * 100).toFixed(2) + '%';
                        return `${context.label}: ${value} (${percentage})`;
                    }
                }
            },
        },
        cutout: '70%',
    };

    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw(chart) {
            const { ctx, width, height } = chart;
            ctx.save();
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#1F2937';
            ctx.fillText('100%', width / 2, height / 2);
        }
    };

    const calculs = data.map((d, i) => {
        const pourcent = ((d.consommation / total) * 100).toFixed(1);
        return {
            label: d.client,
            color: couleurs[i],
            percentage: pourcent,
        };
    });

    if (data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-md font-semibold text-gray-700 mb-4">Répartition par client</h2>
                <p className="text-gray-400 text-sm">Chargement...</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-700">Contributions des clients à la consommation</h2>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2">
                    <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />
                </div>

                {/* Légende personnalisée */}
                <div className="flex flex-wrap items-start justify-start gap-3 w-full lg:w-1/2">
                    {calculs.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div
                                className="w-14 h-6 flex items-center justify-center text-xs font-semibold rounded-md border border-gray-200 backdrop-blur-sm shadow-inner"
                                style={{
                                    backgroundColor: `${item.color}33`, // 20% d'opacité
                                    color: item.color,
                                }}
                            >
                                {item.percentage}%
                            </div>

                            <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
