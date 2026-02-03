import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';

const StudentView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStudent = async () => {
        try {
            const res = await axios.get(`/students/${id}`);
            setStudent(res.data.student);
        }
        catch (error) {
            console.error("Error fetching student:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div style={styles.container}>
                    <div style={styles.loading}>Loading...</div>
                </div>
            </>
        );
    }

    if (!student) {
        return null;
    }
    return (
        <>
            <Navbar />

            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Student Details</h1>
                    <button onClick={() => navigate("/students")} style={styles.backBtn}>
                        ← Back
                    </button>
                </div>

                <div style={styles.card}>
                    <div style={styles.field}>
                        <label style={styles.label}>Name</label>
                        <p style={styles.value}>{student.name}</p>
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <p style={styles.value}>{student.email}</p>
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Age</label>
                        <p style={styles.value}>{student.age}</p>
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Course</label>
                        <p style={styles.value}>{student.course}</p>
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Status</label>
                        <p style={{...styles.value, color: student.status === 'active' ? '#4caf50' : '#f44336', fontWeight: '600'}}>
                            {student.status}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentView

const styles = {
  container: {
    padding: "30px",
    maxWidth: "600px",
    margin: "0 auto",
    minHeight: "calc(100vh - 80px)",
    background: "#f9f9f9",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
  },
  backBtn: {
    padding: "10px 16px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  card: {
    padding: "28px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },
  field: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "15px",
    fontWeight: "700",
    color: "#000000",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "6px",
  },
  value: {
    margin: 0,
    fontSize: "15px",
    color: "#333",
    fontWeight: "500",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#666",
    fontSize: "15px",
  },
};