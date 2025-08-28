import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Camera, Image, Mic } from "lucide-react";


const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <Camera size={22} />, label: "Camera" },
    { icon: <Image size={22} />, label: "Gallery" },
    { icon: <Mic size={22} />, label: "Voice" },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-2">
      {/* เมนูที่เลื่อนขึ้น */}
      <AnimatePresence>
        {isOpen &&
          menuItems.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-md bg-green-500 text-white"
            >
              {item.icon}
            </motion.button>
          ))}
      </AnimatePresence>

      {/* ปุ่ม + */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-green-600 text-white"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={28} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingMenu;
