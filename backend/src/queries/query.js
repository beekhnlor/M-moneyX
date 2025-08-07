const register =`INSERT INTO tb_users (user_name,email,phone_number,password,created_At,updated_At) VALUE (?,?,?,?,?,?)`;

const CheckUser = `SELECT email,phone_number FROM tb_users WHERE email = ? AND phone_number = ?`

const login = `SELECT id,email,phone_number,role,password FROM tb_users WHERE email = ?`


//content
const content = `INSERT INTO tb_content 
(section_id, title,subtitle,description,images,created_at,updated_at) VALUES 
(?,?,?,?,?,?,?)`
const oldimages = `SELECT images FROM tb_content WHERE id = ?`
const updateContent = `
      UPDATE tb_content 
      SET section_id = ?, title = ?, subtitle = ?, description = ?, images = ?, updated_at = ?
      WHERE id = ?
    `;
const CheckImages = `SELECT images FROM tb_content WHERE id = ?`
const deleteContent = `DELETE FROM tb_content WHERE id = ?`
module.exports = {
  register,
  CheckUser,
  login,
  content,
  oldimages,
  updateContent,
  CheckImages,
  deleteContent
};
