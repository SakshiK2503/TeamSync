import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.jsx";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: ""
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    dueDate: ""
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const taskRes = await API.get("/tasks");
      const projectRes = await API.get("/projects");

      setTasks(taskRes.data);
      setProjects(projectRes.data);

      if (user?.role === "admin") {
        const userRes = await API.get("/auth/users");
        setUsers(userRes.data);
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const createProject = async (e) => {
    e.preventDefault();

    if (!projectForm.name) {
      return toast.error("Project name is required");
    }

    try {
      await API.post("/projects", projectForm);
      toast.success("Project created");
      setProjectForm({ name: "", description: "" });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Project creation failed");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (
      !taskForm.title ||
      !taskForm.projectId ||
      !taskForm.assignedTo ||
      !taskForm.dueDate
    ) {
      return toast.error("Fill all required task fields");
    }

    try {
      await API.post("/tasks", taskForm);
      toast.success("Task created and assigned");
      setTaskForm({
        title: "",
        description: "",
        projectId: "",
        assignedTo: "",
        dueDate: ""
      });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Task creation failed");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      toast.success("Task status updated");
      fetchData();
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const deleteTask = async (taskId) => {
  const confirmDelete = window.confirm("Delete this task?");

  if (!confirmDelete) return;

  try {
    await API.delete(`/tasks/${taskId}`);
    toast.success("Task deleted");
    fetchData();
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
  }
};

  const isOverdue = (task) => {
    return task.status !== "done" && new Date(task.dueDate) < new Date();
  };

  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inprogress = tasks.filter((t) => t.status === "inprogress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const overdue = tasks.filter(isOverdue).length;

  return (
    <div>
      <nav className="nav">
        <h2>TeamSync</h2>

        <div className="desktopInfo">
          <span>{user?.name}</span>
          <span className="roleBadge">{user?.role}</span>
          <button onClick={logout}>Logout</button>
        </div>

        <button className="menu" onClick={() => setOpen(true)}>
          ☰
        </button>
      </nav>

      {open && (
        <div className="sidebar">
          <button className="closeBtn" onClick={() => setOpen(false)}>
            ✕
          </button>

          <p>{user?.name}</p>
          <p className="roleBadge">{user?.role}</p>

          <button onClick={() => setOpen(false)}>Dashboard</button>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      <main className="dashboard">
        <section className="welcome">
          <h1>
            {user?.role === "admin"
              ? "Admin Dashboard"
              : "Member Dashboard"}
          </h1>

          <p>
            {user?.role === "admin"
              ? "Create projects, assign tasks, and track team progress."
              : "View your assigned tasks and update progress."}
          </p>
        </section>

        <section className="statsGrid">
          <div className="statCard">
            <h3>Total Tasks</h3>
            <p>{total}</p>
          </div>

          <div className="statCard">
            <h3>Todo</h3>
            <p>{todo}</p>
          </div>

          <div className="statCard">
            <h3>In Progress</h3>
            <p>{inprogress}</p>
          </div>

          <div className="statCard">
            <h3>Completed</h3>
            <p>{done}</p>
          </div>

          <div className="statCard overdueCard">
            <h3>Overdue</h3>
            <p>{overdue}</p>
          </div>
        </section>

        {user?.role === "admin" && (
          <section className="adminGrid">
            <form className="panel" onSubmit={createProject}>
              <h2>Create Project</h2>

              <input
                placeholder="Project name"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    name: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Project description"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value
                  })
                }
              />

              <button type="submit">Create Project</button>
            </form>

            <form className="panel" onSubmit={createTask}>
              <h2>Create & Assign Task</h2>

              <input
                placeholder="Task title"
                value={taskForm.title}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    title: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Task description"
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    description: e.target.value
                  })
                }
              />

              <select
                value={taskForm.projectId}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    projectId: e.target.value
                  })
                }
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>

              <select
                value={taskForm.assignedTo}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    assignedTo: e.target.value
                  })
                }
              >
                <option value="">Assign To</option>
                {users.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name} - {member.role}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={taskForm.dueDate}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    dueDate: e.target.value
                  })
                }
              />

              <button type="submit">Create Task</button>
            </form>
          </section>
        )}

        <section className="panel">
          <h2>{user?.role === "admin" ? "All Tasks" : "My Tasks"}</h2>

          <div className="taskList">
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              tasks.map((task) => (
                <div
                  className={
                    isOverdue(task) ? "taskCard overdueTask" : "taskCard"
                  }
                  key={task._id}
                >
                  <div>
                    <h3>{task.title}</h3>
                      

                      <span className={`status ${task.status}`}>
                       {task.status === "inprogress" ? "In Progress" : task.status}
                       </span>
                       
                    <p>{task.description}</p>
                    <small>
                      Project: {task.projectId?.name || "N/A"}
                    </small>
                    <br />
                    <small>
                      Assigned to:{" "}
                      {task.assignedTo?.name || "Current member"}
                    </small>
                    <br />
                    <small>
                      Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </small>

                    {isOverdue(task) && (
                      <p className="dangerText">Overdue</p>
                    )}
                  </div>

                 <div className="taskActions">

  <select
    value={task.status}
    onChange={(e) =>
      updateStatus(task._id, e.target.value)
    }
  >
    <option value="todo">Todo</option>
    <option value="inprogress">In Progress</option>
    <option value="done">Done</option>
  </select>

  {user?.role === "admin" && (
    <button
      className="deleteBtn"
      onClick={() => deleteTask(task._id)}
    >
      Delete
    </button>
  )}

                </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        © 2026 TeamSync. Built for smart team productivity.
      </footer>
    </div>
  );
}

export default Dashboard;