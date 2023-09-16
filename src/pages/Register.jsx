import React, { useState } from 'react'; // Importa useState desde React
import Add from '../img/addimage.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import NavigationBar from '../components/navigationBar';


const Register = () => {

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        const nombre = e.target[1].value;
        const apellido = e.target[2].value;
        const usuario = e.target[3].value;
        const password = e.target[4].value;
        const correo = e.target[5].value;

        if (!file) {
            setError("Por favor seleccione un archivo.");
            return; // Exit the function early
        }

        const camposObligatorios = ['nombre', 'apellido', 'usuario', 'password', 'correo'];

        for (const campo of camposObligatorios) {
            if (!eval(campo)) {
                setError(`El campo '${campo.charAt(0).toUpperCase() + campo.slice(1)}' es obligatorio.`);
                return;
            }
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, correo, password);

            const storageObjectName = `${res.user.uid}_${Date.now()}_${nombre}`;
            const storageRef = ref(storage, storageObjectName);


            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorMessage);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName: nombre,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            nombre: nombre,
                            apellido: apellido,
                            usuario: usuario,
                            correo: correo,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/login");
                    });
                }
            );
        } catch (err) {
            const errorCode = err.code;
            const errorMessage = err.message;
            setError(errorMessage);
        }
    }



    return (
        <div>
            <NavigationBar />
            <div class="flex justify-between items-center p-4">
                <div className="w-2/4 flex justify-center ml-40">
                    <img src="./src/img/logo.png" alt="Logo" className="w-128 h-128" />
                </div>
                <div class="w-3/4">

                    <div className="block mx-auto my-12 w-2/3 p-8 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-800">

                        <h1 className="text-3xl font-bold text-center">Registrar Usuario</h1>

                        <form onSubmit={handleSubmit}>
                            <input style={{ display: 'none' }} type="file" id="file" name="file" />
                            <label htmlFor="file" className="block text-center">
                                <img src={Add} alt="addImage" className='mx-auto w-32 h-32 cursor-pointer' />
                                <span className='text-gray-500 mt-2'>Subir Imagen</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                className="bg-gray-200 border border-gray-300 w-full text-lg placeholder-gray-600 p-2 my-2 focus:bg-white"

                            />

                            <input
                                type="text"
                                name="apellido"
                                placeholder="Apellido"
                                className="bg-gray-200 border border-gray-300 w-full text-lg placeholder-gray-600 p-2 my-2 focus:bg-white"

                            />

                            <input
                                type="text"
                                name="usuario"
                                placeholder="Usuario"
                                className="bg-gray-200 border border-gray-300 w-full text-lg placeholder-gray-600 p-2 my-2 focus:bg-white"

                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="bg-gray-200 border border-gray-300 w-full text-lg placeholder-gray-600 p-2 my-2 focus:bg-white"

                            />

                            <input
                                type="email"
                                name="correo"
                                placeholder="Correo"
                                className="bg-gray-200 border border-gray-300 w-full text-lg placeholder-gray-600 p-2 my-2 focus:bg-white"

                            />

                            <button
                                type="submit"
                                className="rounded-md bg-red-500 hover:bg-red-400 w-full text-lg text-white font-semibold py-2 my-3"
                            >
                                Registrarse
                            </button>
                            <button
                                onClick={() => navigate("/RegisterProfesional")} // Use navigate to navigate
                                className="rounded-md bg-red-500 hover:bg-red-400 w-full text-lg text-white font-semibold py-2 my-3"
                            >
                                Registrar Profesional
                            </button>
                            {error && <p className="text-red-500 font-bold text-lg my-3">* {error}</p>}


                        </form>
                        <p className='text-center'>¿Ya te Registraste? <Link to={"/login"}>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;



