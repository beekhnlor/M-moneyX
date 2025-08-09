const connected = require('../connectdb/connecting'); 
const getChatHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        const sql = "SELECT id, sender_id, sender_role, message_text, created_at FROM tb_message WHERE conversation_id = ? ORDER BY created_at ASC";
        
        const [messages] = await connected.query(sql, [userId]);

        const formattedMessages = messages.map(msg => ({
            from: msg.sender_role === 'admin' ? 'admin' : msg.sender_id.toString(),
            message: msg.message_text,
            timestamp: msg.created_at
        }));
        
        res.json(formattedMessages);

    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ message: "Server Error: Could not fetch chat history." });
    }
};

const getActiveConversations = async (req, res) => {
    try {
    
        const sql = `
            SELECT 
                m.conversation_id,
                (SELECT u.user_name FROM tb_users u WHERE u.id = m.conversation_id) AS user_name,
                m.message_text AS last_message,
                m.created_at AS last_message_time
            FROM 
                tb_message m
            INNER JOIN (
                SELECT 
                    conversation_id, 
                    MAX(created_at) AS max_created_at
                FROM 
                    tb_message
                GROUP BY 
                    conversation_id
            ) AS latest_msg ON m.conversation_id = latest_msg.conversation_id AND m.created_at = latest_msg.max_created_at
            ORDER BY
                m.created_at DESC;
        `;

        const [conversations] = await connected.query(sql);

        res.json(conversations);

    } catch (error) {
        console.error("Error fetching active conversations:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getChatHistory,
    getActiveConversations
}