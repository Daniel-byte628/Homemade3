import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import NavigationBar from '../components/navigationBar';

const Login = () => {

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      setError(errorMessage);
    }
  };


  return (
    <div>
      <NavigationBar />
      <div class="flex justify-between items-center p-4">
        <div className="w-2/4 flex justify-center ml-40">
          <img src="./src/img/logo.png" alt="Logo" className="w-128 h-128" />
        </div>
        <div class="w-3/4">
          <div className="block mx-auto my-12 w-2/3 p-8 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-800">
            <h1 className="text-3xl font-bold text-center">Login</h1>

            <form className="mt-8" onSubmit={handleSubmit}>
              <input
                type="text"
                name="correo"
                placeholder="Correo"
                className="bg-gray-200 border border-gray-300 w-full text-lg placeholder-gray-600 p-2 my-2 focus:bg-white"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-gray-200 border border-gray-300 w-full text-lg placeholder-gray-600 p-2 my-2 focus:bg-white"
                required
              />

              <button
                type="submit"
                className="rounded-md bg-red-500 hover:bg-red-400 w-full text-lg text-white font-semibold py-2 my-3"
              >
                Login
              </button>
              {error && <p className="text-red-500 font-bold text-lg my-3">* {error}</p>}
            </form>
            <p className='text-center'>¿No te has Registrado? <Link to="/register">Registrate</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
