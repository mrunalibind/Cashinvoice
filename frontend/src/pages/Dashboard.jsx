import { useContext } from 'react'
import Navbar from '../components/Navbar.jsx'
import { AuthContext } from '../context/AuthContext.jsx'

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <Navbar />

            <div style={styles.container}>
                <h1 style={styles.title}>Dashboard</h1>
                <p style={styles.subtitle}>
                    Welcome, <strong>{user?.email}</strong>
                </p>

                <div style={styles.card}>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Overview</h3>
                        <p style={styles.text}>Welcome to the Student Management System</p>
                    </div>

                    <div style={styles.divider}></div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Your Access</h3>
                        {user?.role === "admin" ? (
                            <p style={{...styles.text, color: '#4caf50', fontWeight: '600'}}>
                                ✓ Admin Access - Full permissions
                            </p>
                        ) : (
                            <p style={{...styles.text, color: '#ff9800', fontWeight: '600'}}>
                                ✓ Student Access - Read-only permissions
                            </p>
                        )}
                    </div>
                </div>

                
            </div>
        </>
    )
}

export default Dashboard

const styles = {
  container: {
    padding: "30px",
    maxWidth: "700px",
    margin: "0 auto",
    minHeight: "calc(100vh - 80px)",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    margin: "0 0 28px 0",
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
  },
  card: {
    padding: "28px",
    background: "#e4eaf4",
    borderRadius: "10px",
    boxShadow: "0 8px 78px rgba(0,0,0,0.08)",
    marginBottom: "24px",
  },
  section: {
    marginBottom: "16px",
  },
  sectionTitle: {
    margin: "0 0 10px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  text: {
    margin: 0,
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6",
  },
  divider: {
    height: "1px",
    background: "#e0e0e0",
    margin: "16px 0",
  },
  
};