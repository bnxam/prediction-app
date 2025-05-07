import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay ,EffectFade } from 'swiper/modules';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import imgSrc1 from '../../assets/images/acc20.webp';
import imgSrc2 from '../../assets/images/acc16a.jpeg';
import imgSrc3 from '../../assets/images/acc4a.jpg';

const slides = [
    {
        imgSrc: imgSrc1,
        title: 'Comparez, choisissez, optimisez !',
        text: 'Visualisez en un coup d\'œil les scores, les erreurs et les tendances pour prendre la meilleure décision.',
        highlight: '3 modèles comparés'
    },
    {
        imgSrc: imgSrc2,
        title: 'Vos données prennent vie !',
        text: 'Graphiques dynamiques, tableaux interactifs et outils de visualisation puissants pour comprendre vos résultats en un clin d\'œil',
        highlight: 'Visualisation intelligente'
    },
    {
        imgSrc: imgSrc3,
        title: 'Simple, rapide et intuitif',
        text: 'Notre plate-forme est conçue pour vous offrir la meilleure expérience, que vous soyez débutant ou expert.',
        highlight: 'Expérience utilisateur premium'
    },
];

export default function Fonctionalite() {
    return (
        <div className="w-full h-screen relative group">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ 
                    clickable: true,
                    el: '.swiper-pagination',
                    renderBullet: (index, className) => {
                        return `<span class="${className} bg-white opacity-50 hover:opacity-100 transition-opacity duration-300"></span>`;
                    },
                }}
                autoplay={{ 
                    delay: 5000,
                    disableOnInteraction: false
                }}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                speed={1000}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full">
                        {/* Image de fond avec overlay */}
                        <div className="absolute inset-0 bg-black/30 z-10"></div>
                        <img
                            src={slide.imgSrc}
                            alt="Featured"
                            className="w-full h-full object-cover object-center"
                        />

                        {/* Contenu texte avec animations */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-20">
                            <div className="max-w-2xl space-y-6 transform transition-all duration-700 group-hover:scale-105">
                                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 animate-fade-in">
                                    <Star className="w-5 h-5 mr-2 text-yellow-300" />
                                    <span className="text-white font-medium">{slide.highlight}</span>
                                </div>
                                
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight animate-slide-up">
                                    {slide.title}
                                </h2>
                                
                                <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto animate-slide-up delay-100">
                                    {slide.text}
                                </p>
                                
                                <button className="mt-6 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 animate-fade-in delay-200 shadow-lg hover:shadow-xl">
                                    Découvrir
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Navigation personnalisée */}
                <div className="swiper-button-prev hidden group-hover:block absolute left-4 z-30 text-white p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
                    <ChevronLeft className="w-8 h-8" />
                </div>
                <div className="swiper-button-next hidden group-hover:block absolute right-4 z-30 text-white p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
                    <ChevronRight className="w-8 h-8" />
                </div>
                
                {/* Pagination personnalisée */}
                <div className="swiper-pagination !bottom-8 space-x-2"></div>
            </Swiper>

            {/* Styles d'animation globaux */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                .animate-slide-up {
                    animation: slideUp 0.8s ease-out forwards;
                }
                .delay-100 {
                    animation-delay: 100ms;
                }
                .delay-200 {
                    animation-delay: 200ms;
                }
                .swiper-pagination-bullet-active {
                    opacity: 1 !important;
                    width: 20px !important;
                    border-radius: 4px !important;
                    background: white !important;
                }
            `}</style>
        </div>
    );
}