import React from 'react';
import backcards from '../../assets/images/backcards.jpg';
// import cardd from '../../assets/images/cardd.jpg';

const calculPrixParTrimestre = (predictions) => {
    if (!predictions?.length) return [];

    const prixParKWh = 4.5; // Prix unitaire fictif en DA

    const trimestres = {
        T1: { total: 0, label: 'Janv - Mars' },
        T2: { total: 0, label: 'Avr - Juin' },
        T3: { total: 0, label: 'Juil - Sept' },
        T4: { total: 0, label: 'Oct - Déc' },
    };

    predictions.forEach(p => {
        const mois = new Date(p.date).getMonth() + 1;
        const valeur = parseFloat(p.valeur || 0);

        if (mois >= 1 && mois <= 3) trimestres.T1.total += valeur;
        else if (mois >= 4 && mois <= 6) trimestres.T2.total += valeur;
        else if (mois >= 7 && mois <= 9) trimestres.T3.total += valeur;
        else if (mois >= 10 && mois <= 12) trimestres.T4.total += valeur;
    });

    return Object.entries(trimestres).map(([key, { total, label }]) => ({
        trimestre: key,
        label,
        prix: (total * prixParKWh).toFixed(2),
    }));
};

const PrixTrimestres = ({ predictions }) => {
    const data = calculPrixParTrimestre(predictions);

    return (
        <div
            style={{
                backgroundImage: `url(${backcards})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '1rem',
                padding: '1.5rem',
            }}
            className="text-white shadow-xl"
        >
            <h3 className="text-lg font-semibold mb-4 bg-white bg-opacity-70 px-2 py-1 rounded text-gray-800 inline-block">
                Prix estimé / Trimestre
            </h3>

            <div className="space-y-4">
                {data.map(({ trimestre, label, prix }) => (
                    <div key={trimestre} className="bg-white p-4 rounded-xl shadow text-gray-800">
                        <p className="text-sm font-medium">{label} ({trimestre})</p>
                        <p className="text-xl font-bold text-emerald-700">{prix} DA</p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default PrixTrimestres;
