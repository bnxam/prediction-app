// import React, { useState } from "react";
// import { format } from "date-fns";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { FaCalendarAlt, FaMapPin } from "react-icons/fa";

// const DateSelector = () => {
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [manualDate, setManualDate] = useState("");

//   const handleSelect = (date) => {
//     if (!(date instanceof Date) || isNaN(date)) return;

//     const exists = selectedDates.some((d) => d instanceof Date && d.toDateString() === date.toDateString());
//     setSelectedDates((prev) =>
//       exists ? prev.filter((d) => d.toDateString() !== date.toDateString()) : [...prev, date]
//     );
//   };

//   const handleInputChange = (e) => {
//     const date = new Date(e.target.value);
//     setManualDate(e.target.value);
//     handleSelect(date);
//   };

//   return (
//     <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg">
//       <h2 className="text-xl font-bold flex items-center gap-2 text-blue-700 mb-2">
//         <FaCalendarAlt /> Sélectionnez vos dates
//       </h2>

//       <div className="space-y-4">
//         <div>
//           <label className="text-sm text-gray-600">Saisir une date manuellement :</label>
//           <input
//             type="date"
//             value={manualDate}
//             onChange={handleInputChange}
//             className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2"
//           />
//         </div>

//         <DayPicker
//           mode="multiple"
//           selected={selectedDates}
//           onSelect={handleSelect}
//           modifiersClassNames={{
//             selected: 'bg-blue-600 text-white rounded-full',
//             today: 'border border-blue-500'
//           }}
//           className="rounded-lg shadow-sm"
//         />

//         <div>
//           <h3 className="font-semibold text-md flex items-center gap-2 text-purple-700 mt-4">
//             <FaMapPin className="text-pink-500" /> Dates sélectionnées :
//           </h3>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {selectedDates.map((date, index) => (
//               <span
//                 key={index}
//                 className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
//               >
//                 {format(date, "dd/MM/yyyy")}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DateSelector;

// DateSelector.jsx
import React, { useState } from "react";
import { format, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FaCalendarAlt, FaMapPin, FaClock } from "react-icons/fa";

const DateSelector = () => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [manualDate, setManualDate] = useState("");
    const [inputError, setInputError] = useState("");

    const handleDayPickerSelect = (dates) => {
        setSelectedDates(dates || []);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setManualDate(value);
        setInputError("");
    };

    const handleAddDate = () => {
        try {
            // Essayez d'abord le format ISO (YYYY-MM-DD)
            let date = parse(manualDate, "yyyy-MM-dd", new Date());
            
            // Si échec, essayez le format français (DD/MM/YYYY)
            if (isNaN(date)) {
                date = parse(manualDate, "dd/MM/yyyy", new Date());
            }
            
            // Si toujours échec, affichez une erreur
            if (isNaN(date)) {
                throw new Error("Format de date invalide");
            }

            date.setHours(12, 0, 0, 0); // Normalisation de l'heure

            // Vérification des doublons
            const dateExists = selectedDates.some(
                d => d.getTime() === date.getTime()
            );

            if (dateExists) {
                setInputError("Cette date est déjà sélectionnée");
                return;
            }

            setSelectedDates([...selectedDates, date]);
            setManualDate("");
        } catch (error) {
            setInputError("Veuillez entrer une date valide (JJ/MM/AAAA ou AAAA-MM-JJ)");
        }
    };

    const removeDate = (dateToRemove) => {
        setSelectedDates(selectedDates.filter(
            date => date.getTime() !== dateToRemove.getTime()
        ));
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#003566]  mb-2">
                <FaCalendarAlt /> Sélectionnez vos dates
            </h2>
            <p className="text-gray-600 text-sm mb-4">
                Cliquez ou saisissez une date pour l'ajouter.
            </p>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Saisir une date (JJ/MM/AAAA ou AAAA-MM-JJ) :
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={manualDate}
                            onChange={handleInputChange}
                            placeholder="JJ/MM/AAAA ou AAAA-MM-JJ"
                            className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-300"
                        />
                        <button
                            onClick={handleAddDate}
                            className="bg-[#dda15e] text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            // className="bg-[#cc5803] text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Ajouter
                        </button>
                    </div>
                    {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
                </div>

                <DayPicker
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={handleDayPickerSelect}
                    className="rounded-lg border shadow-sm"
                    modifiersClassNames={{
                        selected: "bg-[#dda15e] text-white rounded-full",
                        today: "border border-blue-500"
                    }}
                />

                <div className="mt-4">
                    <h3 className="font-semibold text-md flex items-center gap-2 text-purple-700">
                        <FaMapPin className="text-pink-500" /> Dates sélectionnées :
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedDates.map((date) => (
                            <span
                                key={date.getTime()}
                                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full shadow-sm flex items-center"
                            >
                                {format(date, "dd/MM/yyyy")}
                                <button 
                                    onClick={() => removeDate(date)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {selectedDates.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="font-semibold text-md flex items-center gap-2 text-gray-700 mb-2">
                            <FaClock className="text-gray-500" /> Prédictions passées
                        </h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            {[...selectedDates]
                                .sort((a, b) => b - a)
                                .map((date, index) => (
                                    <li key={date.getTime()} className="flex items-center gap-2">
                                        <span className="text-blue-700 font-medium">{format(date, "dd/MM/yyyy")}</span>
                                        <span className="italic text-gray-500">— Résultat : Prédiction {index + 1}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DateSelector;