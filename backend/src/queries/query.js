const register =`INSERT INTO tb_users (user_name,email,phone_number,password,created_At,updated_At) VALUE (?,?,?,?,?,?)`;

const CheckUser = `SELECT email,phone_number FROM tb_users WHERE email = ? AND phone_number = ?`

const login = `SELECT id,email,phone_number,role,password FROM tb_users WHERE email = ?`


//content
const content = `INSERT INTO tb_content 
(section_id, title,subtitle,description,images,created_at,updated_at) VALUES 
(?,?,?,?,?,?,?)`

module.exports = {
  register,
  CheckUser,
  login,
  content
};
