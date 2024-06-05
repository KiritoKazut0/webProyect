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

export default function Nav() {
    const [activeForm, setActiveForm] = useState(false);

    const handleractiveForm = () => {
        setActiveForm(true);
    };

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
