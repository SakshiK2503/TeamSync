const Project = require("../models/Project");


// CREATE PROJECT (Admin only)
exports.createProject = async(req,res)=>{

  try{

    if(req.user.role !== "admin"){
      return res.status(403).json({
        message:"Only admin can create project"
      });
    }

    const project = await Project.create({
      name:req.body.name,
      description:req.body.description,
      members:req.body.members || [],
      createdBy:req.user.id
    });

    res.status(201).json(project);

  }catch(error){
    res.status(500).json({
      message:"Server Error"
    });
  }

};


// GET ALL PROJECTS
exports.getProjects = async(req,res)=>{

  try{

    const projects = await Project.find()
    .populate("createdBy","name email")
    .populate("members","name email");

    res.json(projects);

  }catch(error){
    res.status(500).json({
      message:"Server Error"
    });
  }

};


// GET SINGLE PROJECT
exports.getProjectById = async(req,res)=>{

  try{

    const project = await Project.findById(req.params.id)
    .populate("createdBy","name email")
    .populate("members","name email");

    res.json(project);

  }catch(error){
    res.status(500).json({
      message:"Server Error"
    });
  }

};