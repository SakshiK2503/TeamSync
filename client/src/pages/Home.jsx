import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="page">
      <nav className="premiumNav">
        <div className="logo">
          <div className="logoIcon">👥</div>
          <div className="logoText">
            <span className="logoName">TeamSync</span>
          </div>
        </div>

        <div className="navActions">
          {!token ? (
            <>
              <button className="navBtn ghostBtn" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="navBtn primaryBtn" onClick={() => navigate("/signup")}>
                Sign up
              </button>
            </>
          ) : (
            <>
              <button className="navBtn ghostBtn" onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
              <button className="navBtn primaryBtn" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <section className="landingHero">
        <div className="heroOverlay"></div>

        <div className="heroContent">
          <h1>
            Manage Teams.
            <br />
            Assign Tasks.
            <br />
            Track Progress.
          </h1>

          <p>
            TeamSync helps admins create projects, assign work to members,
            monitor task status, and identify overdue work from one clean dashboard.
          </p>

          <div className="heroButtons">
            <button className="heroPrimary" onClick={() => navigate("/signup")}>
              Get Started →
            </button>

            <button className="heroSecondary" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </section>

      <section className="landingInfo">
        <h2>Built for focused team execution</h2>
        <p>
          Role-based access keeps admins in control while members can focus on
          their assigned work and update task progress easily.
        </p>
      </section>

      <footer className="premiumFooter">
        © 2026 TeamSync. Built for smart team productivity.
      </footer>
    </div>
  );
}

export default Home;