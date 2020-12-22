import React, {useState} from 'react';
import { Link, Redirect } from "react-router-dom";


function Navigation() {

    return (
        <nav style={{backgroundColor: "#182C61"}}>
            <ul style={{listStyle: 'none', display: 'flex', justifyContent: 'space-around'}}>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/">Home</Link>
                </li>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/chat">Messagerie instantanée</Link>
                </li>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/infos">Informations pratiques</Link>
                </li>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/maplive">Suivi en direct</Link>
                </li>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/media">Médias</Link>
                </li>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/myaccount">Mon compte</Link>
                </li>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/news">Actualités du rallye</Link>
                </li>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/program">Programme</Link>
                </li>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/ranking">Classement des équipes</Link>
                </li>
                <li>
                    <Link style={{color: "#FFFFFF"}} to="/teams">Liste des équipes</Link>
                </li>
            </ul>
        </nav>
    );
}


export default Navigation;