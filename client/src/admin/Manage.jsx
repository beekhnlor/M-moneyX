import React, { useState, useEffect } from 'react';
import * as api from '../api/api'; 
import useMoneyStore from '../store/money-store'; 
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';
const Manage = () => {
  
    
    const [contents, setContents] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        section_id: '',
        title: '',
        subtitle: '',
        description: '',
    });
    const [imageFiles, setImageFiles] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = useMoneyStore((state) => state.token);

    const fetchContents = async () => {
        if (!token) {
            setError('ກາລຸນາເຂັ້າສູ່ລະບົບກອ່ນເບີ່ງຂໍ້ມູນ');
            setContents([]); 
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await api.getContents(token); 
            setContents(response.data.result || []);
        } catch (err) {
            setError('ເກີດຂໍ້ຜີດພາດໃນການດືງຂໍ້ມູນ ຫຼື token ບໍ່ຖືກຕອ້ງ');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContents();
    }, [token]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFiles(e.target.files);
    };

    const resetForm = () => {
        setIsEditing(false);
        setFormData({ id: null, section_id: '', title: '', subtitle: '', description: '' });
        setImageFiles(null);
        if (document.getElementById('image-input')) {
            document.getElementById('image-input').value = null;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
           
            toast.warn('กรุณาเข้าสู่ระบบก่อนทำการบันทึกข้อมูล');
            return;
        }

        const submissionData = new FormData();
        submissionData.append('section_id', formData.section_id);
        submissionData.append('title', formData.title);
        submissionData.append('subtitle', formData.subtitle);
        submissionData.append('description', formData.description);
        if (imageFiles) {
            for (let i = 0; i < imageFiles.length; i++) {
                submissionData.append('image', imageFiles[i]);
            }
        }
        
        try {
            let response;
            if (isEditing) {
                response = await api.updateContent(token, formData.id, submissionData);
            } else {
                if (!imageFiles || imageFiles.length === 0) {
                    
                    toast.info('ກາລຸນາເລືອກຮູບພາບ'); 
                    return;
                }
                response = await api.createContent(token, submissionData);
            }
          
            toast.success(response.data.message);
            resetForm();
            fetchContents();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'ເກີດຂໍ້ຜີດພາດໃນການສົ່ງຂໍ້ມູນ';
           
            toast.error(errorMessage);
            console.error(err);
        }
    };

    const handleEdit = (content) => {
        setIsEditing(true);
        const { images, ...editableData } = content;
        setFormData(editableData);
        window.scrollTo(0, 0);
    };

 
    const handleDelete = (id) => {
        if (!token) {
         
            toast.warn('ກາລູນາເຂົ້າສູ່ລະບັບກອ່ນແກ້ໄຂ');
            return;
        }

      
        const confirmDelete = () => {
         
            const promise = api.deleteContent(token, id).then(res => {
                fetchContents();
                return res.data.message; 
            });

            toast.promise(promise, {
                pending: 'ກຳລັງລົບຂໍ້ມູນ...',
                success: (message) => message, 
                error: 'ລົບຂໍ້ມູນບໍ່ສຳເລັດ!'
            });
        };

        toast.warn(
            ({ closeToast }) => (
                <div className="text-gray-800">
                    <p className="font-semibold">ยืนยันการลบ</p>
                    <p className="text-sm">คุณต้องการลบข้อมูลนี้ใช่หรือไม่?</p>
                    <div className="flex justify-end gap-2 mt-3">
                        <button 
                            onClick={() => { confirmDelete(); closeToast(); }}
                            className="px-4 py-1 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors"
                        >
                            ยืนยัน
                        </button>
                        <button 
                            onClick={closeToast}
                            className="px-4 py-1 bg-gray-200 text-gray-800 text-sm font-semibold rounded-md hover:bg-gray-300 transition-colors"
                        >
                            ยกเลิก
                        </button>
                    </div>
                </div>
            ), {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                style: { backgroundColor: 'white', color: '#333' }
            }
        );
    };

    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
          
            <div className="w-full">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Manage Content</h1>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-5">
                        {isEditing ? `แก้ไข Content ID: ${formData.id}` : 'เพิ่ม Content ใหม่'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white" />
                        <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} placeholder="Subtitle" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white" />
                        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows="4" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"></textarea>
                        <input type="number" name="section_id" value={formData.section_id} onChange={handleInputChange} placeholder="Section ID" required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white" />
                        
                        <div>
                            <label htmlFor="image-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{isEditing ? 'อัปโหลดรูปภาพใหม่ (ถ้าต้องการเปลี่ยน)' : 'เลือกรูปภาพ'}</label>
                            <input id="image-input" type="file" name="image" onChange={handleFileChange} multiple accept="image/*" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200">
                                {isEditing ? 'อัปเดต' : 'สร้าง'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200">
                                    ยกเลิก
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">ID</th>
                                <th scope="col" className="px-6 py-3 text-center">Title</th>
                                <th scope="col" className="px-6 py-3 text-center">Images</th>
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contents.length > 0 ? (
                                contents.map((content) => (
                                    <tr key={content.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{content.id}</td>
                                        <td className="px-6 py-4 text-center">{content.title}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center space-x-2">
                                                {content.images && content.images.map((imgUrl, index) => (
                                                    <img key={index} src={imgUrl} alt={`${content.title}-${index}`} className="w-12 h-12 object-cover rounded-md" />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center space-x-2">
                                                <button onClick={() => handleEdit(content)} className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-md hover:bg-yellow-600 transition duration-200">ແກ້ໄຂ</button>
                                                <button onClick={() => handleDelete(content.id)} className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-md hover:bg-red-700 transition duration-200">ລົບ</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white dark:bg-gray-800">
                                    <td colSpan="4" className="px-6 py-4 text-center">ไม่พบข้อมูล</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Manage;