import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api.jsx";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member"
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    if (!form.email.includes("@")) {
      return toast.error("Enter valid email");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be 6+ chars");
    }

    try {
      const res = await API.post("/auth/signup", form);

      toast.success("Signup successful");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h1 className="formTitle">Create Account</h1>

        <input name="name" placeholder="Name" onChange={change} />
        <input name="email" placeholder="Email" onChange={change} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={change}
        />

        <select name="role" onChange={change}>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Signup</button>

        <p className="formFooter">
          Already have account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;  