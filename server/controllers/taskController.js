const Task = require("../models/Task");


// CREATE TASK (Admin only)
exports.createTask = async(req,res)=>{

  try{

    if(req.user.role !== "admin"){
      return res.status(403).json({
        message:"Only admin can create task"
      });
    }

    const task = await Task.create({
      title:req.body.title,
      description:req.body.description,
      projectId:req.body.projectId,
      assignedTo:req.body.assignedTo,
      dueDate:req.body.dueDate
    });

    res.status(201).json(task);

  }catch(error){
    res.status(500).json({
      message:"Server Error"
    });
  }

};


// GET TASKS
exports.getTasks = async(req,res)=>{

  try{

    let tasks;

    if(req.user.role === "admin"){

      tasks = await Task.find()
      .populate("assignedTo","name email")
      .populate("projectId","name");

    }else{

      tasks = await Task.find({
        assignedTo:req.user.id
      })
      .populate("projectId","name");

    }

    res.json(tasks);

  }catch(error){
    res.status(500).json({
      message:"Server Error"
    });
  }

};


// UPDATE TASK STATUS
exports.updateTask = async(req,res)=>{

  try{

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.json(task);

  }catch(error){
    res.status(500).json({
      message:"Server Error"
    });
  }

};


// DELETE TASK
exports.deleteTask = async(req,res)=>{

  try{

    if(req.user.role !== "admin"){
      return res.status(403).json({
        message:"Only admin can delete task"
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message:"Task deleted"
    });

  }catch(error){
    res.status(500).json({
      message:"Server Error"
    });
  }

};