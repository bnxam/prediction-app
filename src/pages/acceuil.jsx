import NavBar from "../components/acceuilComponent/navBar";
import Presentation from "../components/acceuilComponent/presentation";
import Fonctionalite from "../components/acceuilComponent/fonctionalite";
import Paiement from "../components/acceuilComponent/paiement";
import Footer from "../components/acceuilComponent/footer";
import React from "react";




const Acceuil = () => {
    return (
        <div>
            <NavBar />
            {/* <Presentation /> */}
            <Fonctionalite />
            <Paiement />
            <Footer />
        </div>
    );
};

export default Acceuil;