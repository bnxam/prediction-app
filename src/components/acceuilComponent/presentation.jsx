import React from 'react' ;
import '../../assets/css/acceuil.css'

export default function Presentation() {
    return (
      <section className="main-banner py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full lg:w-10/12 lg:-ml-[8.33%]"> {/* Equivalent to col-lg-10 offset-lg-1 */}
              <div className="header-text text-center">
                <h2 className="h2 leading-relaxed text-3xl md:text-3xl lg:text-5xl font-serif font-bold mb-6">
                Bienvenue dans le future — Prédire. Planifier. Réussir. <br />
                Votre  <em className="h2em italic text-blue-800 not-italic"> Avenir </em> commence ici.
                </h2>
                {/* <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  SnapX Photography is a professional website template with 5 different HTML pages for maximum customizations. 
                  It is free for commercial usage. This Bootstrap v5.1.3 CSS layout is provided by TemplateMo Free CSS Templates.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } ;