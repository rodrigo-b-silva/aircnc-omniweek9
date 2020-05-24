import React, { useState, useMemo } from 'react';

import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default ({ history }) => {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function handleSubmit(e){
        e.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price', price);
        data.append('techs', techs);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return(
        <form onSubmit={handleSubmit}>

            <label
                className={thumbnail ? 'has-thumbnail' : ''} 
                id="thumbnail" style={{ backgroundImage: `url(${preview})` }}>
                <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
                <img src={camera} alt="camera"/>
            </label>

            <label htmlFor="company">Empresa *</label>
            <input 
                type="text" 
                id="company"
                placeholder="Sua empresa incrivel"
                value={company}
                onChange={e => setCompany(e.target.value)}
            />

            <label htmlFor="company">Tecnologias * <span>(separadas por virgular)</span></label>
            <input 
                type="text" 
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={e => setTechs(e.target.value)}
            />

            <label htmlFor="company">Valor da diária * <span>(em branco para GRATUITO)</span></label>
            <input 
                type="text" 
                id="techs"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />

            <button className="btn" type="submit">Cadastrar</button>
        </form>

    )
}