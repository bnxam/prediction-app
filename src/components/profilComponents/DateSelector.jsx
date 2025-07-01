
// // import React, { useState } from "react";
// // import { format, parse } from "date-fns";
// // import { DayPicker } from "react-day-picker";
// // import "react-day-picker/dist/style.css";
// // import { FaCalendarAlt, FaMapPin, FaClock } from "react-icons/fa";

// // const DateSelector = () => {
// //     const [selectedDates, setSelectedDates] = useState([]);
// //     const [manualDate, setManualDate] = useState("");
// //     const [inputError, setInputError] = useState("");

// //     const handleDayPickerSelect = (dates) => {
// //         setSelectedDates(dates || []);
// //     };

// //     const handleInputChange = (e) => {
// //         const value = e.target.value;
// //         setManualDate(value);
// //         setInputError("");
// //     };

// //     const handleAddDate = () => {
// //         try {
// //             let date = parse(manualDate, "yyyy-MM-dd", new Date());
// //             if (isNaN(date)) {
// //                 date = parse(manualDate, "dd/MM/yyyy", new Date());
// //             }
// //             if (isNaN(date)) {
// //                 throw new Error("Format de date invalide");
// //             }

// //             date.setHours(12, 0, 0, 0);

// //             const dateExists = selectedDates.some(
// //                 d => d.getTime() === date.getTime()
// //             );

// //             if (dateExists) {
// //                 setInputError("Cette date est déjà sélectionnée");
// //                 return;
// //             }

// //             setSelectedDates([...selectedDates, date]);
// //             setManualDate("");
// //         } catch (error) {
// //             setInputError("Veuillez entrer une date valide (JJ/MM/AAAA ou AAAA-MM-JJ)");
// //         }
// //     };

// //     const removeDate = (dateToRemove) => {
// //         setSelectedDates(selectedDates.filter(
// //             date => date.getTime() !== dateToRemove.getTime()
// //         ));
// //     };

// //     return (
// //         <div className="w-full mx-4 sm:mx-auto bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg max-w-2xl">
// //             <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-[#003566] mb-2">
// //                 <FaCalendarAlt className="text-sm sm:text-base" /> Sélectionnez vos dates
// //             </h2>
// //             <p className="text-gray-600 text-xs sm:text-sm mb-4">
// //                 Cliquez ou saisissez une date pour l'ajouter.
// //             </p>
// //             <div className="space-y-4">
// //                 <div>
// //                     <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                         Saisir une date (JJ/MM/AAAA ou AAAA-MM-JJ) :
// //                     </label>
// //                     <div className="flex flex-col sm:flex-row gap-2">
// //                         <input
// //                             type="text"
// //                             value={manualDate}
// //                             onChange={handleInputChange}
// //                             placeholder="JJ/MM/AAAA ou AAAA-MM-JJ"
// //                             className="flex-1 border border-gray-300 rounded-md shadow-sm p-2 text-xs sm:text-sm focus:ring focus:ring-blue-300"
// //                         />
// //                         <button
// //                             onClick={handleAddDate}
// //                             className="bg-[#e09443] text-white px-4 py-2 rounded-md hover:bg-[#dda15e] text-xs sm:text-sm"
// //                         >
// //                             Ajouter
// //                         </button>
// //                     </div>
// //                     {inputError && <p className="text-red-500 text-xs sm:text-sm mt-1">{inputError}</p>}
// //                 </div>

// //                 <div className="overflow-x-auto py-2">
// //                     <div className="min-w-[280px] mx-auto transform scale-90 sm:scale-100">
// //                         <DayPicker
// //                             mode="multiple"
// //                             selected={selectedDates}
// //                             onSelect={handleDayPickerSelect}
// //                             className="border rounded-lg shadow-sm"
// //                             modifiersClassNames={{
// //                                 selected: "bg-[#dda15e] text-white rounded-full",
// //                                 today: "border border-blue-500"
// //                             }}
// //                             styles={{
// //                                 root: { 
// //                                     margin: '0 auto',
// //                                     fontSize: '0.875rem'
// //                                 },
// //                                 caption: { fontSize: '0.875rem' },
// //                                 caption_label: { fontSize: '0.875rem' },
// //                                 nav_button: { width: '1.5rem', height: '1.5rem' },
// //                                 day: { 
// //                                     width: '1.8rem', 
// //                                     height: '1.8rem',
// //                                     margin: '0.1rem'
// //                                 },
// //                                 cell: { 
// //                                     height: '2rem',
// //                                     padding: '0.1rem'
// //                                 }
// //                             }}
// //                         />
// //                     </div>
// //                 </div>

// //                 <div className="mt-4">
// //                     <h3 className="font-semibold text-sm sm:text-md flex items-center gap-2 text-purple-700">
// //                         <FaMapPin className="text-pink-500 text-xs sm:text-sm" /> Dates sélectionnées :
// //                     </h3>
// //                     <div className="flex flex-wrap gap-2 mt-2">
// //                         {selectedDates.map((date) => (
// //                             <span
// //                                 key={date.getTime()}
// //                                 className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-sm flex items-center"
// //                             >
// //                                 {format(date, "dd/MM/yyyy")}
// //                                 <button 
// //                                     onClick={() => removeDate(date)}
// //                                     className="ml-1 sm:ml-2 text-red-500 hover:text-red-700"
// //                                 >
// //                                     ×
// //                                 </button>
// //                             </span>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 {selectedDates.length > 0 && (
// //                     <div className="mt-4 sm:mt-6 border-t pt-3 sm:pt-4">
// //                         <h3 className="font-semibold text-sm sm:text-md flex items-center gap-2 text-gray-700 mb-2">
// //                             <FaClock className="text-gray-500 text-xs sm:text-sm" /> Prédictions passées
// //                         </h3>
// //                         <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
// //                             {[...selectedDates]
// //                                 .sort((a, b) => b - a)
// //                                 .map((date, index) => (
// //                                     <li key={date.getTime()} className="flex items-center gap-2">
// //                                         <span className="text-blue-700 font-medium">{format(date, "dd/MM/yyyy")}</span>
// //                                         <span className="italic text-gray-500">— Résultat : Prédiction {index + 1}</span>
// //                                     </li>
// //                                 ))}
// //                         </ul>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default DateSelector;
// import React, { useState } from "react";
// import { parse, isBefore, isAfter } from "date-fns";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import bg from "../../assets/images/bg.jpg";

// const DateSelector = () => {
//   const [manualMonth, setManualMonth] = useState("");
//   const [calendarMonth, setCalendarMonth] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(undefined);
//   const [inputError, setInputError] = useState("");

//   const minDate = new Date(2024, 0); // Janvier 2024
//   const maxDate = new Date(2100, 11); // Décembre 2100

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setManualMonth(value);
//     setInputError("");

//     const parsed = parse(value, "MM/yyyy", new Date());
//     if (isNaN(parsed)) {
//       setInputError("Format invalide (MM/YYYY)");
//       return;
//     }

//     if (isBefore(parsed, minDate)) {
//       setInputError("Date trop ancienne (min: 01/2024)");
//       return;
//     }

//     if (isAfter(parsed, maxDate)) {
//       setInputError("Date trop lointaine (max: 12/2100)");
//       return;
//     }

//     setCalendarMonth(parsed);
//   };

//   return (
//     <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-xl mx-auto mt-6">
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Saisir un mois (MM/YYYY)
//         </label>
//         {/* <input
//           type="text"
//           value={manualMonth}
//           onChange={handleInputChange}
//           placeholder="ex: 06/2025"
//           className="w-full border border-[#e2c2a1] rounded-md px-4 py-2 text-sm focus:ring focus:ring-[#e2c2a1] focus:border-[#e2c2a1]"
//         /> */}
//          <input
//     type="text"
//     value={manualMonth}
//     onChange={handleInputChange}
//     placeholder="ex: 06/2025"
//     className="w-full bg-white border-2 border-sky-200 rounded-lg px-4 py-3 text-[#404653] placeholder-[#404653]/80 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 shadow-sm transition-colors"
//   />
//         {inputError && (
//           <p className="text-pink-600 text-xs mt-1">{inputError}</p>
//         )}
//       </div>

//       {/* Calendrier avec image de fond */}
//       <div
//         className="rounded-lg p-4 overflow-x-auto"
//         style={{
//           backgroundImage: `url(${bg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat"
//         }}
//       >
//         <DayPicker
//           mode="single"
//           selected={selectedDate}
//           onSelect={setSelectedDate}
//           defaultMonth={calendarMonth}
//           onMonthChange={setCalendarMonth}
//           fromMonth={minDate}
//           toMonth={maxDate}
//           className="text-sm w-full"
//           showOutsideDays
//           modifiersClassNames={{
//             selected: "bg-[#e2c2a1] text-[#000] font-semibold rounded-full",
//             today: "border border-[#e2c2a1]"
//           }}
//           styles={{
//             day: {
//               margin: "0.15rem"
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default DateSelector;


// // import React, { useState } from "react";
// // import { format, parse } from "date-fns";
// // import { DayPicker } from "react-day-picker";
// // import "react-day-picker/dist/style.css";
// // import { FaCalendarAlt, FaMapPin, FaClock } from "react-icons/fa";

// // const DateSelector = () => {
// //   const [selectedDates, setSelectedDates] = useState([]);
// //   const [manualDate, setManualDate] = useState("");
// //   const [inputError, setInputError] = useState("");

// //   const handleDayPickerSelect = (dates) => {
// //     setSelectedDates(dates || []);
// //   };

// //   const handleInputChange = (e) => {
// //     setManualDate(e.target.value);
// //     setInputError("");
// //   };

// //   const handleAddDate = () => {
// //     try {
// //       let date = parse(manualDate, "yyyy-MM-dd", new Date());
// //       if (isNaN(date)) {
// //         date = parse(manualDate, "dd/MM/yyyy", new Date());
// //       }
// //       if (isNaN(date)) throw new Error("Format invalide");

// //       date.setHours(12, 0, 0, 0);
// //       const exists = selectedDates.some(d => d.getTime() === date.getTime());
// //       if (exists) {
// //         setInputError("Date déjà sélectionnée");
// //         return;
// //       }

// //       setSelectedDates([...selectedDates, date]);
// //       setManualDate("");
// //     } catch {
// //       setInputError("Date invalide (JJ/MM/AAAA ou AAAA-MM-JJ)");
// //     }
// //   };

// //   const removeDate = (dateToRemove) => {
// //     setSelectedDates(selectedDates.filter(d => d.getTime() !== dateToRemove.getTime()));
// //   };

// //   return (
// //     <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-3xl mx-auto mt-6">
// //       {/* <h2 className="text-xl font-bold text-[#7c3aed] flex items-center gap-2 mb-2">
// //         <FaCalendarAlt className="text-[#f472b6]" /> Sélection des dates
// //       </h2>
// //       <p className="text-gray-600 text-sm mb-4">Cliquez ou saisissez une date pour l'ajouter.</p> */}

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-6">
// //         <div>
// //           {/* <label className="text-sm font-medium text-gray-700 block mb-1">
// //             Saisir une date (JJ/MM/AAAA ou AAAA-MM-JJ)
// //           </label> */}
// //           <input
// //             type="text"
// //             value={manualDate}
// //             onChange={handleInputChange}
// //             placeholder="ex: 2025-06-30"
// //             className="w-full border border-purple-300 rounded-md px-4 py-2 text-sm focus:ring focus:ring-purple-300 focus:border-purple-400"
// //           />
// //           {inputError && <p className="text-pink-600 text-xs mt-1">{inputError}</p>}
// //         </div>
// //         <button
// //           onClick={handleAddDate}
// //           className="bg-[#9333ea] hover:bg-[#7c3aed] text-white text-sm font-medium px-6 py-2 rounded-md transition"
// //         >
// //           Ajouter la date
// //         </button>
// //       </div>

// //       <div className="rounded-lg p-4 shadow-sm bg-purple-50">
// //         <DayPicker
// //           mode="multiple"
// //           selected={selectedDates}
// //           onSelect={handleDayPickerSelect}
// //           className="text-sm"
// //           modifiersClassNames={{
// //             selected: "bg-[#c084fc] text-white font-semibold rounded-full",
// //             today: "border border-[#9333ea]"
// //           }}
// //           styles={{
// //             day: {
// //               margin: '0.2rem',
// //               width: '2rem',
// //               height: '2rem'
// //             }
// //           }}
// //         />
// //       </div>

// //       {selectedDates.length > 0 && (
// //         <>
// //           <div className="mt-6">
// //             <h3 className="text-sm font-medium text-[#9333ea] flex items-center gap-2">
// //               <FaMapPin /> Dates sélectionnées :
// //             </h3>
// //             <div className="flex flex-wrap gap-2 mt-2">
// //               {selectedDates.map(date => (
// //                 <span
// //                   key={date.getTime()}
// //                   className="bg-[#f3e8ff] text-[#6b21a8] text-xs px-3 py-1 rounded-full flex items-center shadow-sm"
// //                 >
// //                   {format(date, "dd/MM/yyyy")}
// //                   <button
// //                     onClick={() => removeDate(date)}
// //                     className="ml-2 text-red-500 hover:text-red-700 font-bold"
// //                   >
// //                     ×
// //                   </button>
// //                 </span>
// //               ))}
// //             </div>
// //           </div>

// //           <div className="mt-6 border-t pt-4">
// //             <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
// //               <FaClock className="text-[#a78bfa]" /> Résumé des dates sélectionnées
// //             </h3>
// //             <ul className="text-sm text-gray-600 mt-2 space-y-1">
// //               {[...selectedDates]
// //                 .sort((a, b) => b - a)
// //                 .map((date, index) => (
// //                   <li key={index}>
// //                     {format(date, "dd/MM/yyyy")} — <span className="italic text-gray-500">Prédiction {index + 1}</span>
// //                   </li>
// //                 ))}
// //             </ul>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default DateSelector;
import React, { useState } from "react";
import { parse, isBefore, isAfter } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import bg from "../../assets/images/bg.jpg";

const DateSelector = () => {
  const [manualMonth, setManualMonth] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [inputError, setInputError] = useState("");

  const minDate = new Date(2024, 0); // Janvier 2024
  const maxDate = new Date(2100, 11); // Décembre 2100

  const handleInputChange = (e) => {
    const value = e.target.value;
    setManualMonth(value);
    setInputError("");

    const fullDateString = `01/${value}`; // Ajoute le jour pour obtenir un format complet
    const parsed = parse(fullDateString, "dd/MM/yyyy", new Date());

    if (isNaN(parsed)) {
      setInputError("Format invalide (MM/YYYY)");
      return;
    }

    if (isBefore(parsed, minDate)) {
      setInputError("Date trop ancienne (min: 01/2024)");
      return;
    }

    if (isAfter(parsed, maxDate)) {
      setInputError("Date trop lointaine (max: 12/2100)");
      return;
    }

    setCalendarMonth(parsed);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-xl mx-auto mt-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Saisir un mois (MM/YYYY)
        </label>
        <input
          type="text"
          value={manualMonth}
          onChange={handleInputChange}
          placeholder="ex: 06/2025"
          className="w-full bg-white border-2 border-sky-200 rounded-lg px-4 py-3 text-[#404653] placeholder-[#404653]/80 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 shadow-sm transition-colors"
        />
        {inputError && (
          <p className="text-pink-600 text-xs mt-1">{inputError}</p>
        )}
      </div>

      <div
        className="rounded-lg p-4 overflow-x-auto"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          defaultMonth={calendarMonth}
          onMonthChange={setCalendarMonth}
          fromMonth={minDate}
          toMonth={maxDate}
          className="text-sm w-full"
          showOutsideDays
          modifiersClassNames={{
            selected: "bg-[#e2c2a1] text-[#000] font-semibold rounded-full",
            today: "border border-[#e2c2a1]",
          }}
          styles={{
            day: {
              margin: "0.15rem",
            },
          }}
        />
      </div>
    </div>
  );
};

export default DateSelector;
