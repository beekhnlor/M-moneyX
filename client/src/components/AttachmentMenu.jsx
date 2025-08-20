import React from 'react';
import { 
    IoDocumentTextOutline, IoImageOutline, IoCameraOutline, IoMusicalNotesOutline, 
    IoPersonCircleOutline, IoStatsChartOutline, IoCalendarOutline, IoHappyOutline 
} from 'react-icons/io5';

const menuItems = [
    { icon: <IoDocumentTextOutline size={24} className="text-purple-500" />, text: 'เอกสาร', action: 'document' },
    { icon: <IoImageOutline size={24} className="text-blue-500" />, text: 'รูปภาพและวิดีโอ', action: 'media' },
    { icon: <IoCameraOutline size={24} className="text-pink-500" />, text: 'กล้อง', action: 'camera' },
    { icon: <IoMusicalNotesOutline size={24} className="text-orange-500" />, text: 'เสียง', action: 'audio' },
    { icon: <IoPersonCircleOutline size={24} className="text-sky-500" />, text: 'รายชื่อติดต่อ', action: 'contact' },
    { icon: <IoStatsChartOutline size={24} className="text-yellow-500" />, text: 'โพลล์', action: 'poll' },
    { icon: <IoCalendarOutline size={24} className="text-red-500" />, text: 'กิจกรรม', action: 'event' },
    { icon: <IoHappyOutline size={24} className="text-green-500" />, text: 'สติกเกอร์ใหม่', action: 'sticker' },
];

const AttachmentMenu = ({ onSelectItem }) => {
    return (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-lg p-2 z-10">
            <ul>
                {menuItems.map((item) => (
                    <li key={item.text}>
                        <button
                            onClick={() => onSelectItem(item.action)}
                            className="w-full flex items-center gap-4 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-left"
                        >
                            {item.icon}
                            <span>{item.text}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttachmentMenu;