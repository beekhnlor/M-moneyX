const connected = require("../connectdb/connecting");
const queries = require("../queries/query");

const content = async (req, res) => {
  const { section_id, title, subtitle, description } = req.body;

  try {

    const imageUrls = req.files.map(file => file.path); 

    const images = imageUrls.join(',');

    const [Contented] = await connected.query(queries.content, [
      section_id,
      title,
      subtitle,
      description,
      images,
      new Date(),
      new Date(),
    ]);

    return res.status(200).json({
      message: "Content Insert Success",
      images: imageUrls,
      Contented,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getContents = async (req, res) => {
  try {
    const [rows] = await connected.query("SELECT * FROM tb_content");

    const result = rows.map(content => ({
      ...content,
      images: content.images ? content.images.split(',') : [],
    }));

    return res.status(200).json({message:"Select db Success",result});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Fetch Error" });
  }
};


module.exports = {
  content,
  getContents
};
