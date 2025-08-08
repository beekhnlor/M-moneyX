const connected = require('../connectdb/connecting'); 

const handleWebChat = async (req, res) => {

    const { message } = req.body;


    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`Received message from web chat: "${message}"`);

    try {
      
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
           
            replyText = rows[0].answer;
            console.log(`Found a match! Responding with: "${replyText}"`);
        } else {
            
            replyText = 'ຂໍອະໄພ, ລະບົບບໍ່ພົບຂໍ້ມູນທີ່ທ່ານສອບຖາມ.';
            console.log('No match found.');
        }

        const delay = 2000; 

        setTimeout(() => {
            
            res.status(200).json({ reply: replyText });
        }, delay);
    

    } catch (error) {
        console.error('Database query error:', error);
    
        return res.status(500).json({ error: 'Database server error' });
    }
};

module.exports = { 
handleWebChat
};