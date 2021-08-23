import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    console.log('getAllPost')
    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post)
  console.log(newPost, 'ini newPost')
  try {
    await newPost.save()
    console.log('done created')
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json(error.message)
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true })
  console.log('update')
  res.status(200).json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
  await PostMessage.findByIdAndRemove(id)
  console.log('delete')
  res.status(200).json({message: 'Post deleted Succesfully'})
}

export const likePost = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
  const post = await PostMessage.findById(id)
  const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, { new: true })
  res.status(200).json(updatedPost)
}