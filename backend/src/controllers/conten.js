const { json } = require("express");
const connected = require("../connectdb/connecting");
const queries = require("../queries/query");
const cloudinary = require("cloudinary").v2;
const content = async (req, res) => {
  const { section_id, title, subtitle, description } = req.body;

  try {
    const imageUrls = req.files.map((file) => file.path);

    const images = imageUrls.join(",");

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

    const result = rows.map((content) => ({
      ...content,
      images: content.images ? content.images.split(",") : [],
    }));

    return res.status(200).json({ message: "Select db Success", result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Fetch Error" });
  }
};
const updateContent = async (req, res) => {
  const { id } = req.params;
  const { section_id, title, subtitle, description } = req.body;

  try {
    const [rows] = await connected.query(
      "SELECT images FROM tb_content WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Content not found with the provided ID." });
    }

    const oldContent = rows[0];
    const oldImagePaths = oldContent.images;

    let newImagePaths = oldImagePaths;

    if (req.files && req.files.length > 0) {
      if (oldImagePaths) {
        const oldImageUrls = oldImagePaths.split(",");

        const publicIds = oldImageUrls.map((url) => {
          const parts = url.split("/");
          const publicIdWithExtension = parts
            .slice(parts.indexOf("upload") + 2)
            .join("/");
          return publicIdWithExtension.substring(
            0,
            publicIdWithExtension.lastIndexOf(".")
          );
        });

        await Promise.all(
          publicIds.map((publicId) => cloudinary.uploader.destroy(publicId))
        );
      }
      newImagePaths = req.files.map((file) => file.path).join(",");
    }

    const [result] = await connected.query(queries.updateContent, [
      section_id,
      title,
      subtitle,
      description,
      newImagePaths,
      new Date(),
      id,
    ]);

    if (result.affectedRows === 0 && result.changedRows === 0) {
      return res
        .status(200)
        .json({ message: "No changes were made to the content." });
    }

    return res.status(200).json({
      message: "Content updated successfully!",
      data: {
        id: id,
        ...req.body,
        images: newImagePaths.split(","),
      },
    });
  } catch (err) {
    console.error("Error updating content:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteContent = async (req, res) => {
  const { id } = req.params;

  try {
    const [checkImages] = await connected.query(queries.CheckImages, [id]);

    if (checkImages.length === 0) {
      return res
        .status(404)
        .json({ message: "Content not found with the provided ID" });
    }

    const oldContent = checkImages[0];

    const oldImagePaths = oldContent.images;

    if (oldImagePaths) {
      const oldImageUrls = oldImagePaths.split(",");
      const publicIds = oldImageUrls.map((url) => {
        const parts = url.split("/");
        const publicIdWithExtension = parts
          .slice(parts.indexOf("upload") + 2)
          .join("/");
        return publicIdWithExtension.substring(
          0,
          publicIdWithExtension.lastIndexOf(".")
        );
      });
      await Promise.all(
        publicIds.map((publicId) => cloudinary.uploader.destroy(publicId))
      );
    }

    const [result] = await connected.query(queries.deleteContent, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          message: "Content could not be deleted or was already deleted.",
        });
    }

    return res.status(200).json({ message: "Content deleted successfully" });
  } catch (err) {
    console.error("Error deleting content:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  content,
  getContents,
  updateContent,
  deleteContent,
};

