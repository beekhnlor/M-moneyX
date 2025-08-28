import React, { useState, useEffect } from 'react';
import { getPublicContents } from '../api/api';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await getPublicContents();
        if (response.data && response.data.result && response.data.result.length > 0) {
          setContent(response.data.result[0]);
        } else {
          setContent(null);
        }
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  // Animation variants for the text content
  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for the images
  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  if (loading) {
    return <div className="text-center p-20 text-gray-500">ກຳລັງໂຫລດຂໍ້ມູນ...</div>;
  }

  if (error) {
    return <div className="text-center p-20 text-red-600">ເກີດຂໍ້ຜິດພາດ: {error}</div>;
  }

  if (!content) {
    return <div className="text-center p-20 text-gray-500">ບໍ່ພົບຂໍ້ມູນ Content</div>;
  }

  return (
    <main className="bg-white">
      <div className="max-w-screen-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left section with text content */}
          <motion.div
            className="lg:w-1/2 w-full text-center lg:text-left"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
                ບໍລິສັດ ລາວ ໂມບາຍມັນນີ ຈຳກັດ
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 tracking-tight">
                {content.title}
            </h1>
            <p className="text-gray-700 leading-relaxed">
                {content.description}
            </p>
          </motion.div>

          {/* Right section with images */}
          <div className="lg:w-1/2 w-full flex flex-col gap-8">
            {content.images && [...content.images].reverse().map((imageUrl, index) => (
              <motion.img
                key={index}
                src={imageUrl}
                alt={`M-Money content image ${index + 1}`}
                className="w-full h-auto object-cover rounded-xl shadow-lg"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.2 + 0.2 }} 
              />
            ))}
          </div>

        </div>
      </div>
    </main>
  );
};

export default Home;