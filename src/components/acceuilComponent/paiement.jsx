// import React from 'react';
// import img1 from '../../assets/images/paiement5.jpg'
// import img2 from '../../assets/images/paiement6.webp'
// import img3 from '../../assets/images/paiement4.png'

// const Paiement = () => {
//     const plans = [
//         {
//             title: 'Le Plan Basique',
//             image: img1,
//             price: '0 DA',
//             features: [
//                 'Lorem Ipsum Dolores Sonte',
//                 'Songe Lorem Ipsum Dol',
//                 'Matrios Venga Heptuss',
//                 'Denim Sriracha Kogi',
//                 'Digital Photography Awards',
//             ],
//         },
//         {
//             title: 'Le Plan Standard',
//             image: img2,
//             price: '6 000 DA',
//             features: [
//                 'Lorem Ipsum Dolores Sonte',
//                 'Songe Lorem Ipsum Dol',
//                 'Matrios Venga Heptuss',
//                 'Denim Sriracha Kogi',
//                 'Digital Photography Awards',
//             ],
//         },
//         {
//             title: 'Le Plan Avancé',
//             image:img3,
//             price: '20 000 DA',
//             features: [
//                 'Lorem Ipsum Dolores Sonte',
//                 'Songe Lorem Ipsum Dol',
//                 'Matrios Venga Heptuss',
//                 'Denim Sriracha Kogi',
//                 'Digital Photography Awards',
//             ],
//         },
//     ];

//     return (
//         <section className="pricing-plans py-16 bg-gray-50" id="pricing-plans">
//             <div className="container mx-auto px-4">
//                 <div className="text-center mb-12">
//                     <h4 className="text-3xl font-semibold text-gray-800">
//                     Découvrez nos formules de prédiction et les récompenses associées  </h4>
//                 </div>
//                 <div className="flex flex-wrap justify-center ">
//                     {plans.map((plan, index) => (
//                         <div key={index} className="flex flex-col basis-full md:basis-1/2 lg:basis-1/3 px-2">
//                             <div className="pricing-item bg-white p-6 rounded-lg shadow-lg">
//                                 <img src={plan.image} alt={plan.title} className="w-full h-48 object-cover rounded-t-lg" />
//                                 <h4 className="text-xl font-semibold mt-4">{plan.title}</h4>
//                                 <ul className="mt-4 space-y-2">
//                                     {plan.features.map((feature, featureIndex) => (
//                                         <li key={featureIndex} className="text-sm text-gray-700">{feature}</li>
//                                     ))}
//                                 </ul>
//                                 <span className="price text-xl font-bold mt-4 block">{plan.price}</span>
                                
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Paiement;
import React from 'react';
import img1 from '../../assets/images/paiement5.jpg';
import img2 from '../../assets/images/paiement6.webp';
import img3 from '../../assets/images/paiement4.png';
import { Unlock, Zap, Crown , Check } from 'lucide-react';

const Paiement = () => {
    const plans = [
        {
            title: 'Prédiction SARIMA (Gratuite)',
            image: img1,
            price: '0 DA',
            features: [
                'Prédictions basiques avec modèle SARIMA',
                'Accès limité à 3 prédictions/mois',
                'Précision modérée pour tendances simples',
                'Délai de traitement : 24h',
                'Support par email uniquement'
            ],
            popular: false,
            icon: <Unlock className="w-6 h-6 text-blue-500" />
        },
        {
            title: 'Prédiction LSTM (Premium)',
            image: img2,
            price: '6 000 DA/mois',
            features: [
                'Prédictions avancées avec réseaux de neurones LSTM',
                'Précision élevée pour séries complexes',
                'Prédictions illimitées',
                'Traitement en temps réel (1h max)',
                'Support prioritaire 24/7',
                'Historique des prédictions sauvegardé'
            ],
            popular: true,
            icon: <Zap className="w-6 h-6 text-purple-500" />
        },
        {
            title: 'Achat du Modèle (Expert)',
            image: img3,
            price: '20 000 DA (unitaire)',
            features: [
                'Obtenez votre propre copie du modèle LSTM',
                'Formation incluse pour son utilisation',
                'Plus besoin de payer par prédiction',
                'Modèle personnalisable selon vos besoins',
                'Accès aux mises à jour pendant 1 an',
                'Support technique dédié'
            ],
            popular: false,
            icon: <Crown className="w-6 h-6 text-amber-500" />
        },
    ];

    return (
        <section className="py-12 bg-gray-50" id="pricing-plans">
    <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                Choisissez Votre Solution de Prédiction
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
                De la solution gratuite à l'expertise complète, trouvez l'option qui vous convient.
            </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
            {plans.map((plan, index) => (
                <div 
                    key={index} 
                    className={`w-full md:w-80 rounded-lg border transition-all duration-200 bg-white ${
                        plan.popular ? 'border-purple-400' : 'border-gray-200'
                    }`}
                >
                    {plan.popular && (
                        <div className="bg-purple-500 text-white text-sm text-center py-1 font-medium rounded-t-lg">
                            Option la plus populaire
                        </div>
                    )}
                    
                    <div className="p-5">
                        <div className="flex items-center mb-3">
                            {plan.icon}
                            <h3 className="text-lg font-semibold text-gray-800 ml-2">{plan.title}</h3>
                        </div>
                        
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                            {plan.price !== '0 DA' && (
                                <span className="text-sm text-gray-500 ml-1">/mois</span>
                            )}
                        </div>
                        
                        <ul className="space-y-2 text-sm text-gray-700 mb-6">
                            {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start">
                                    <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        
                        <button
                            className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                plan.popular 
                                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                    : plan.price === '0 DA'
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                            {plan.price === '0 DA' ? 'Commencer Gratuitement' : 'Choisir cette offre'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="text-center mt-10 text-sm text-gray-500">
            <p>Besoin d'une solution personnalisée ? <a href="#contact" className="text-blue-600 hover:underline">Contactez-nous</a></p>
        </div>
    </div>
</section>

    );
};

export default Paiement;