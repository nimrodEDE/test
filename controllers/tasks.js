const Task = require("../models/taskModel");
const asyncWrapper = require("../middleware/asyncWrapper");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.json(error);
  }
};

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return res.status(404).json({ message: `no task with the id : ${taskId}` });
  }
  res.json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    req.body,
    { new: true, runValidators: true } // Enables validation
  );
  if (!task) return next(new Error(`no task with the id : ${taskId}`));
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task)
    return res.status(404).json({ message: `no task with the id : ${taskId}` });
  res.status(200).json({ task: null, message: "success" });
});

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
