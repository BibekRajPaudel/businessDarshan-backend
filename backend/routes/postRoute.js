const express = require("express");
const {
addPost, getPost, getPostById, getNewsCategory, getNewsTags, getBankCategory, getPhilosophyCategory, getStartUpCategory, getAdditionalCategory, deleteNews, updateNews
} = require("../controllers/postController");
const upload = require("../utils.js/multer");

const router = express.Router();

router.post("/post", upload.single("image"),addPost);
router.route("/samachar/:id").get(getNewsCategory);
router.route("/:id").get(getNewsTags);
router.route("/bank-market/:id").get(getBankCategory);
router.route("/philosophy/:id").get(getPhilosophyCategory);
router.route("/startup/:id").get(getStartUpCategory)
router.route("/additional/:id").get(getAdditionalCategory);

router.route("/posts/getAll").get(getPost);
router.route("/news/:id").get(getPostById);
router.route("/deletenews/:id").delete(deleteNews);
router.route("/updatenews/:id").put(updateNews);

module.exports = router;
