const ErrorHandler = require("../utils.js/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Post = require("../models/postModel");
const fs = require('fs');
const cloudinary = require("cloudinary");
require("../utils.js/cloudinary");

let counter = 100000

fs.readFile('counter.txt', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    counter = parseInt(data) || counter;
  }
});

//Create Post
const addPost = catchAsyncErrors(async (req, res, next) => {
  const slug = counter
  counter = counter + 1
  const { title, author, description, category, tag, subDescription } = req.body;
  const pic = req.file;

  const result = await cloudinary.v2.uploader.upload(pic.path,{
    folder: "businessDarshan",
  });

  const news = await Post.create({
    title,
    author,
    description,
    category,
    image: result.secure_url,
    slug:slug,
    tag,
    subDescription
  });

  fs.writeFile('counter.txt',  counter.toString(), (err) => {
    if (err) {
      console.error(err);
    }
  });

   //const post = await Post.find({ category: { $in: [req.body.category] } }).sort({ createdAt: -1 });
  // const post = await Post.find().sort({ createdAt: -1 });
   res.status(201).json({
    success: true,
    news,
  });
});

//Search according to the category - news/business
const getNewsCategory = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ category: { $in: [req.params.id] } }).sort({ createdAt: -1 });

  res.status(201).json({
    message: "Post displayed successfully",
    post,
  });
});

//Search according to the tags - news/bank-market/Philosophy
const getNewsTags = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ tag: { $in: [req.params.id] } }).sort({ createdAt: -1 });

  res.status(201).json({
    message: "Post displayed successfully",
    post,
  });
});



//Search according to the category -> bank-market/banking
const getBankCategory = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ category: { $in: [req.params.id] } }).sort({ createdAt: -1 });

  res.status(201).json({
    message: "Post displayed successfully",
    post,
  });
});


//Search according to the category -> bank-market/banking
const getPhilosophyCategory = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ category: { $in: [req.params.id] } }).sort({ createdAt: -1 });

  res.status(201).json({
    message: "Post displayed successfully",
    post,
  });
});

//Search according to the category -> bank-market/banking
const getStartUpCategory = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ category: { $in: [req.params.id] } }).sort({ createdAt: -1 });

  res.status(201).json({
    message: "Post displayed successfully",
    post,
  });
});

//Search according to the category -> bank-market/banking
const getAdditionalCategory =  catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find({ category: { $in: [req.params.id] } }).sort({ createdAt: -1 });

  res.status(201).json({
    message: "Post displayed successfully",
    post,
  });
});


//Get all Post
const getPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find().sort({ createdAt: -1 });

   console.log(post, "post")

  res.status(200).json({
    message: "Post displayed successfully",
    post,
  });
});

//Get all Postbyid
const getPostById = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findOne({ slug:req.params.id });

  const relatedNews = await Post.find({ tag: { $in: [post.tag[0]] } });

  res.status(201).json({
    message: "Post displayed successfully",
    post,
    relatedNews
  });
});

//Delete Post
const deleteNews = async (req, res, next) => {
  const news = await Post.findById(req.params.id);

  if (!news) {
    return res.status(500).json({
      success: false,
      message: "News not found",
    });
  }

  await Post.findByIdAndDelete(req.params.id)
  res.status(200).json({
    success: true,
    message: "News deleted successfully",
  });
};

//update the news
const updateNews = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id, "asdfadsf")
  let news = await Post.findById(req.params.id);

  if (!news) {
    return next(new ErrorHandler("News not found", 404));
  }

  news = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    news,
  });
});


module.exports = {
  addPost,
  getPost,
  getPostById,
  getNewsCategory,
  getNewsTags,
  getBankCategory,
  getPhilosophyCategory,
  getStartUpCategory,
  getAdditionalCategory,
  deleteNews,
  updateNews
};
