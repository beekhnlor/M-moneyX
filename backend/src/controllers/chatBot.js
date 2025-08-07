// backend/src/controllers/chatBot.js

const connected = require('../connectdb/connecting'); // Import การเชื่อมต่อ DB

// Controller function สำหรับจัดการคำขอแชท
const handleWebChat = async (req, res) => {
    // 1. รับข้อความจาก Request Body ที่ Front-End ส่งมา
    const { message } = req.body;

    // ตรวจสอบว่ามีข้อความส่งมาหรือไม่
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`Received message from web chat: "${message}"`);

    try {
        // 2. ค้นหาคำตอบในฐานข้อมูล
        const sql = `
            SELECT answer 
            FROM tb_message 
            WHERE ? LIKE CONCAT('%', question, '%')
            ORDER BY LENGTH(question) DESC 
            LIMIT 1
        `;
        const [rows] = await connected.execute(sql, [message]);

        let replyText;
        if (rows.length > 0) {
            // ถ้าเจอคำตอบ
            replyText = rows[0].answer;
            console.log(`Found a match! Responding with: "${replyText}"`);
        } else {
            // ถ้าไม่เจอ
            replyText = 'ຂໍອະໄພ, ລະບົບບໍ່ພົບຂໍ້ມູນທີ່ທ່ານສອບຖາມ.';
            console.log('No match found.');
        }

        // --- ส่วนที่เพิ่มเข้ามา ---
        // สร้างดีเลย์ก่อนส่งคำตอบ
        // 2000 milliseconds = 2 วินาที
        // คุณสามารถปรับตัวเลขนี้ได้ตามต้องการ เช่น 1500 (1.5 วิ) หรือ 3000 (3 วิ)
        const delay = 2000; 

        setTimeout(() => {
            // 3. ส่งคำตอบกลับไปให้ Front-End ในรูปแบบ JSON หลังจากดีเลย์แล้ว
            res.status(200).json({ reply: replyText });
        }, delay);
        // --- จบส่วนที่เพิ่ม ---

    } catch (error) {
        console.error('Database query error:', error);
        // ในกรณีที่เกิด error ให้ตอบกลับไปทันที ไม่ต้องดีเลย์
        return res.status(500).json({ error: 'Database server error' });
    }
};

module.exports = { handleWebChat };