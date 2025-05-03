import React from 'react';

const FormParametres = () => {
    return(
        <div className="mt-8 w-full min-h-72 bg-white p-4 rounded-lg style={{ backgroundColor: 'white' }}  ">

        <form className="space-y-4">
            <div className="mb-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ringx-3 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
                    
                    aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="mt-1 text-xs text-gray-500">
                    Votre adresse email restera strictement confidentielle.
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-3 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
                    
                />
            </div>

            

            <button
                className={`w-full py-2 px-4 rounded-md hover:bg-blue-600 transition hover:text-white bg-blue-500  text-white p-2 rounded-md`}
            >
                Ce connecter
            </button>
            <button
                className={`w-full py-2 px-4 rounded-md hover:bg-blue-600 transition hover:text-white bg-blue-500  text-white p-2 rounded-md`}
            >
                Ce connecter
            </button>
           

        </form>
        </div>
    );
}

export default FormParametres;