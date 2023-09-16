import React from 'react';
import { useLocation } from 'react-router-dom';
import '../public/css/navigationBar.css';

const NavigationBar = () => {
    const location = useLocation();
    const currentPage = location.pathname;

    return (
        <nav className="flex pt-20 pb-12 bg-white text-white px-24">
            <div className="flex space-x-4 bg-gray-200 rounded-full p-5">
                <h1 className="text-base py-1 px-5 font-bold text-black">Inicio</h1>
                <h1 className="text-base py-1 px-5 font-bold text-black">Acerca</h1>
                <h1 className="text-base py-1 px-5 font-bold text-black">Funcionalidades</h1>
                <h1 className="text-base py-1 px-5 font-bold text-black">Paginas</h1>
                <h1 className="text-base py-1 px-5 font-bold text-black">Comunidad</h1>
            </div>

            <ul className="w-1/2 px-16 ml-auto flex justify-end pt-1">
                {name ? (
                    <>
                        <li className="nav-item px-4">
                            <p className="font-semibold">{name}</p>
                        </li>

                        <li className="nav-item px-4">
                            <a href="/logout" className="nav-link font-semibold border-2 border-white hover:bg-white hover:text-green-700 py-3 px-4 rounded-md">
                                Log Out
                            </a>
                        </li>
                    </>
                ) : (
                    <>
                        <li className={`px-4 ${currentPage === '/login' ? 'active' : ''}`}>
                            <a href="/login" className={`nav-link font-semibold py-3 px-4 rounded-md relative text-red-600 hover:text-white hover:bg-red-600 ${currentPage === '/login' ? 'active' : ''}`}>
                                Login
                            </a>
                            <div id="linelogin"></div>
                        </li>
                        <li className={`px-4 ${currentPage === '/register' || currentPage === '/RegisterProfesional' ? 'active' : ''}`}>
                            <a href="/register" className={`nav-link font-semibold py-3 px-4 rounded-md relative text-red-600 hover:text-white hover:bg-red-600 ${currentPage === '/register' || currentPage === '/RegisterProfesional' ? 'active' : ''}`}>
                                Register
                            </a>
                            
                        </li>

                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavigationBar;
