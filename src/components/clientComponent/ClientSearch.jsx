
// import React, { useState } from 'react';
// import { Search, Plus } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ClientSearch = ({ searchValue, onSearchChange, onAddClient }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [inputFocus, setInputFocus] = useState(false);

//   return (
//     <motion.div
//       className="mb-8 flex items-center w-full bg-white"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         className="relative w-full max-w-xl"
//         whileHover={{ scale: 1.01 }}
//       >
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
//         <motion.input
//           type="text"
//           value={searchValue}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder="Rechercher par code client..."
//           className="w-full pl-10 pr-6 py-3 rounded-2xl border-2 border-gray-100 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300/50 focus:border-transparent transition-all text-base font-light backdrop-blur-sm bg-white/80"
//           onFocus={() => setInputFocus(true)}
//           onBlur={() => setInputFocus(false)}
//           animate={{
//             boxShadow: inputFocus
//               ? "0 10px 25px -5px rgba(8, 87, 234, 0.3)"
//               : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
//           }}
//         />
//         {searchValue && (
//           <motion.button
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
//             onClick={() => onSearchChange('')}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             ×
//           </motion.button>
//         )}
//       </motion.div>

//       <motion.button
// className="ml-4 flex items-center justify-center gap-2 bg-[#5694c4] hover:bg-[#3D90D7] text-white px-6 py-3 rounded-2xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
//         // className="ml-4 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-3 rounded-2xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
//         onClick={onAddClient}
//         whileHover={{
//           scale: 1.05,
//           boxShadow: "0 10px 25px -5px rgba(8, 87, 234, 0.3)"
//         }}
//         whileTap={{ scale: 0.98 }}
//         onHoverStart={() => setIsHovered(true)}
//         onHoverEnd={() => setIsHovered(false)}
//       >
//         <motion.span
//           animate={{
//             rotate: isHovered ? [0, 10, -10, 0] : 0
//           }}
//           transition={{ duration: 0.5 }}
//         >
//           <Plus className="w-5 h-5" />
//         </motion.span>
//         Ajouter un client
//       </motion.button>
//     </motion.div>
//   );
// };

// export default ClientSearch;
import React from 'react';
import { Plus, Search, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ClientSearch = ({ searchValue, onSearchChange, onAddClient, clientsCount }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full mb-8">
      {/* Champ de recherche - Largeur réduite */}
      <div className="relative w-full md:w-auto md:min-w-[600px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#315B6D] w-5 h-5" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher un client..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#315B6D]/30 bg-white text-[#315B6D] focus:outline-none focus:ring-2 focus:ring-[#04CBEA]/50 focus:border-[#04CBEA] transition-all duration-200"
          />
          {searchValue && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#315B6D]/50 hover:text-[#FF8C1F] transition-colors"
              onClick={() => onSearchChange('')}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Conteneur pour compteur + bouton */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Compteur de clients */}
        <motion.div 
          className="flex items-center gap-3 bg-[#315B6D]/5 px-4 py-3 rounded-lg border border-[#315B6D]/20 shadow-sm hover:shadow-md transition-all duration-300 h-[44px]"
          whileHover={{ scale: 1.02 }}
        >
          <Users className="text-[#04CBEA] w-5 h-5" />
          <div className="text-[#315B6D] font-bold text-lg leading-none">{clientsCount}</div>
        </motion.div>

        {/* Bouton Ajouter un client */}
        <motion.button
          onClick={onAddClient}
          className="flex items-center gap-2 bg-[#81b29a] hover:bg-[#81b29a]/90 text-white px-4 py-3 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 h-[44px]"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter un client</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ClientSearch;