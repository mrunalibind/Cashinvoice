import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <h2 style={styles.title}>📚 Student Management</h2>
      </div>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>
          🏠 Dashboard
        </Link>

        {/* Admin only */}
        {user?.role === "admin" && (
          <Link to="/students/create" style={styles.link}>
            ➕ Create Student
          </Link>
        )}

        <Link to="/students" style={styles.link}>
          👥 Student List
        </Link>

        <div style={styles.userSection}>
          <span style={styles.user}>👤 {user?.email}</span>
          <span style={styles.badge}>{user?.role?.toUpperCase()}</span>
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar

const styles = {
  nav: {
    padding: "15px 30px",
    background: "#344ec2",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  brand: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  userSection: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
    paddingLeft: "20px",
  },
  user: {
    fontSize: "15px",
    fontWeight: "500",
    opacity: 0.95,
  },
  badge: {
    fontSize: "12px",
    background: "rgba(255, 255, 255, 0.2)",
    padding: "4px 8px",
    borderRadius: "12px",
    fontWeight: "600",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  logout: {
    background: "#fff",
    color: "#667eea",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};