// import React from 'react';
// import { Search } from 'lucide-react';

// const ClientSearch = ({ searchValue, onSearchChange, onAddClient }) => {
//     return (
//         <div className="mb-6 flex items-center w-full">
//             <div className="relative w-full max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                     type="text"
//                     value={searchValue}
//                     onChange={(e) => onSearchChange(e.target.value)}
//                     placeholder="Rechercher par code client"
//                     className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition text-sm"
//                 />
//             </div>

//             <button
//                 onClick={onAddClient}
//                 className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow"
//             >
//                 + Ajouter un client
//             </button>
//         </div>
//     );
// };

// export default ClientSearch;
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ClientSearch = ({ searchValue, onSearchChange, onAddClient }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <motion.div
      className="mb-8 flex items-center w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-full max-w-xl"
        whileHover={{ scale: 1.01 }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
        <motion.input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par code client..."
          className="w-full pl-10 pr-6 py-3 rounded-2xl border-2 border-gray-100 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300/50 focus:border-transparent transition-all text-base font-light backdrop-blur-sm bg-white/80"
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          animate={{
            boxShadow: inputFocus
              ? "0 10px 25px -5px rgba(8, 87, 234, 0.3)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
          }}
        />
        {searchValue && (
          <motion.button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            onClick={() => onSearchChange('')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ×
          </motion.button>
        )}
      </motion.div>

      <motion.button
className="ml-4 flex items-center justify-center gap-2 bg-[#5694c4] hover:bg-[#3D90D7] text-white px-6 py-3 rounded-2xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        // className="ml-4 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-3 rounded-2xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={onAddClient}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(8, 87, 234, 0.3)"
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.span
          animate={{
            rotate: isHovered ? [0, 10, -10, 0] : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <Plus className="w-5 h-5" />
        </motion.span>
        Ajouter un client
      </motion.button>
    </motion.div>
  );
};

export default ClientSearch;
