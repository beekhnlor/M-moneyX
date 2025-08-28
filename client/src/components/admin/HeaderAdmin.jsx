import React from 'react';
// 1. Import hook และ store ที่จำเป็น
import useMoneyStore from '../../store/money-store'; 
// 2. Import ไอคอนสวยๆ จาก lucide-react
import { Search, Bell } from 'lucide-react';

const HeaderAdmin = () => {
    const { user } = useMoneyStore((state) => state);
    console.log('user:', user);

    const getInitials = (user_name) => {
        if (!user_name) return '?';
        return user_name.charAt(0).toUpperCase();
    };

    return (
        <header className='bg-white dark:bg-gray-800 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10'>
            
            <div className='relative w-full max-w-xs'>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                    type="text" 
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
            </div>

            <div className='flex items-center gap-4'>
                <button className='p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'>
                    <Bell className="h-6 w-6" />
                </button>

                {user && (
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg'>
                            {getInitials(user.user_name)}
                        </div>
                        <div className="hidden sm:block">
                            <p className='text-sm font-medium text-gray-800 dark:text-gray-200'>{user.user_name}</p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>{user.role}</p>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default HeaderAdmin;
