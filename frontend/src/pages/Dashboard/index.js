import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default () => {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSport(){
            const user_id = localStorage.getItem("user");
            const response = await api.get('/dashboard', {
                headers: { user_id }
            })

            console.log(response.data)
            setSpots(response.data)
        }

        loadSport();
    }, [])

    return (
        <>
            <ul className="spot-list">
                { spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}` : 'GRATUITO'}</span>
                    </li>
                )) }
            </ul>

            <Link to="/new">
                <button className="btn">
                    Cadastrar novo spot
                </button>
            </Link>
        </>
    )
}