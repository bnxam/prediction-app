import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Area,
    Legend,
} from 'recharts';

export default function Comparaison({ data, minDomain, chartRef }) {



    // Séparer les données historiques et les prédictions
    const historicalData = data.filter(item => item.Type === 'historique');
    const predictionData = data.filter(item => item.Type === 'prediction');
    console.log(predictionData)
    return (
        <div ref={chartRef} className="w-full h-full">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart>
                    <defs>
                        <linearGradient id="colorHistorique" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="Date"
                        type="category"
                        allowDuplicatedCategory={false}
                        tickFormatter={(date) => new Date(date).toLocaleString()}
                    />
                    <YAxis domain={[minDomain, 'auto']} />
                    <Tooltip
                        formatter={(value, name, props) => [
                            value,
                            props.payload.Type === 'prediction' ? 'Prédiction' : 'Historique' 
                        ]}
                    />
                    <Legend />

                    {/* Données historiques */}
                    <Line
                        data={historicalData}
                        type="monotone"
                        dataKey="Valeur"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                        name="Historique"
                        isAnimationActive={false}
                        connectNulls
                    />
                    <Area
                        data={historicalData}
                        type="monotone"
                        dataKey="Valeur"
                        stroke="none"
                        fill="url(#colorHistorique)"
                        fillOpacity={0.4}
                        activeDot={false}
                        isAnimationActive={false}
                        connectNulls
                    />

                    {/* Données de prédiction */}
                    {predictionData.length > 0 && (
                        <>
                            <Line
                                data={predictionData}
                                type="monotone"
                                dataKey="Valeur"
                                stroke="#000"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={false}
                                name="Prédiction"
                                isAnimationActive={false}
                                connectNulls
                            />
                            <Area
                                data={predictionData}
                                type="monotone"
                                dataKey="Valeur"
                                stroke="none"
                                fill="url(#colorPrediction)"
                                fillOpacity={0.4}
                                activeDot={false}
                                isAnimationActive={false}
                                connectNulls
                            />
                        </>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
