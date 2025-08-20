// src/components/MessageStatusIcon.jsx

import React from 'react';
import { BsCheck, BsCheckAll } from 'react-icons/bs';

const MessageStatusIcon = ({ status }) => {
    switch (status) {
        // ส่งถึง Server แล้ว
        case 'sent':
            return <BsCheck size={18} className="text-gray-400" />;
        // ส่งถึงผู้รับแล้ว (แต่ยังไม่อ่าน)
        case 'delivered':
            return <BsCheckAll size={18} className="text-gray-400" />;
        // ผู้รับอ่านแล้ว
        case 'read':
            return <BsCheckAll size={18} className="text-blue-500" />;
        // กำลังส่ง (ยังไม่ถึง Server)
        case null:
        default:
            
            return null; 
    }
};

export default MessageStatusIcon;