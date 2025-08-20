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
  // console.log('--- [UPDATE] 1. CONTROLLER REACHED ---');
  const { id } = req.params;
  const { section_id, title, subtitle, description } = req.body;

  try {
    // console.log(`--- [UPDATE] 2. FETCHING OLD CONTENT FOR ID: ${id} ---`);
    const [rows] = await connected.query(
      "SELECT images FROM tb_content WHERE id = ?",
      [id]
    );
    // console.log('--- [UPDATE] 3. OLD CONTENT FETCHED ---');


    if (rows.length === 0) {
      console.log('--- [UPDATE] Content not found, sending 404 ---');
      return res
        .status(404)
        .json({ message: "Content not found with the provided ID." });
    }

    const oldContent = rows[0];
    const oldImagePaths = oldContent.images;

    let newImagePaths = oldImagePaths;
    
    // console.log('--- [UPDATE] 4. CHECKING FOR NEW FILES ---');
    if (req.files && req.files.length > 0) {
      // console.log('--- [UPDATE] New files found, processing... ---');
      if (oldImagePaths) {
        // console.log('--- [UPDATE] Deleting old images from Cloudinary... ---');
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
        // console.log('--- [UPDATE] Old images deleted. ---');
      }
      newImagePaths = req.files.map((file) => file.path).join(",");
    }

    // console.log('--- [UPDATE] 5. PREPARING TO UPDATE DATABASE ---');
    const [result] = await connected.query(queries.updateContent, [
      section_id,
      title,
      subtitle,
      description,
      newImagePaths,
      new Date(),
      id,
    ]);
    // console.log('--- [UPDATE] 6. DATABASE UPDATED. SENDING SUCCESS RESPONSE ---');

    return res.status(200).json({
      message: "Content updated successfully!",
   
    });
    
  } catch (err) {
    console.error("--- [UPDATE] !!! CATCH BLOCK ERROR !!! ---", err);
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

