import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api.jsx";
import { toast } from "react-toastify";

function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

 const submit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    return toast.error("All fields are required");
  }

  try {
    const res = await API.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Login successful");

    setTimeout(() => {
      nav("/dashboard");
    }, 1000);

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Invalid email or password"
    );
  }
};

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h1 className="formTitle">Login</h1>

        <input name="email" placeholder="Email" onChange={change} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={change}
        />

        <button type="submit">Login</button>

        <p className="formFooter">
          No account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;