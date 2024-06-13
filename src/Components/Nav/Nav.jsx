import React, { useState } from 'react';
import '../Nav/Nav.css';
import IconHome from '../icons/IconHome';
import IconCreate from "../icons/IconCreate";
import IconExplorer from '../icons/IconExplorer';
import IconShearch from '../icons/IconShearch';
import IconMessage from '../icons/IconsMessage';
import IconNotification from '../icons/IconsNotifications';
import IconReals from '../icons/IconsReals';
import CreatePublication from '../CreatePublication/CreatePublication';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const [activeForm, setActiveForm] = useState(false);
    const navigate = useNavigate();
    const handleractiveForm = () => {
        setActiveForm(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        navigate('/');
    }

    const handleCloseForm = () => {
        setActiveForm(false);
    };

    return (
        <>
            <nav className='nav-bar'>
                <span className='title'>Instagram Up</span>
                <ul className='icons-nav'>
                    <li className='icons'><IconHome /> Home</li>
                    <li className='icons'><IconShearch /> Buscar</li>
                    <li className='icons'><IconExplorer /> Explorar</li>
                    <li className='icons'><IconReals /> Reels</li>
                    <li className='icons'><IconMessage /> Mensajes</li>
                    <li className='icons'><IconNotification /> Notificaciones</li>
                    <button className='icons' onClick={handleractiveForm}>
                        <li className='icon-add'><IconCreate /> Crear</li>
                    </button>
                    <button className='icons' onClick={logout}>
                        <li className='icon-add'><LogoutOutlinedIcon />Salir</li>
                    </button>
                </ul>
            </nav>
            {activeForm && (
                <CreatePublication
                    active={activeForm}
                    close={handleCloseForm}
                />
            )}
        </>
    );
}
