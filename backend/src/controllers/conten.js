const connected = require("../connectdb/connecting");
const queries = require("../queries/query");

const content = async (req, res) => {
  const { section_id, title, subtitle, description} = req.body;
  const images = req.files?.path || null;

  try {
    const [Contented] = await connected.query(queries.content, [
      section_id,
      title,
      subtitle,
      description,
      images,
      new Date(),
      new Date(),
    ]);

    return res
      .status(200)
      .json({ message: "Content Insert Success ", Contented });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  content,
};
