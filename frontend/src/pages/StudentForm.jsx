import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from '../api/axios.js'
import Navbar from '../components/Navbar.jsx'

const StudentForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const studentId = searchParams.get('id');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        course: '',
        status: 'Active'
    });

    const [loading, setLoading] = useState(false);
    const isEdit = Boolean(studentId);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const fetchStudent = async () => {
        try {
            const res = await axios.get(`/students/${studentId}`);
            setFormData(res.data.student); 
        } catch (error) {
            console.error("Error fetching student:", error);
        }
    };

    useEffect(() => {
        if (isEdit) {
            fetchStudent();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.name || !formData.email || !formData.age || !formData.course) {
            return alert("All fields are required");
        }

        try {
            setLoading(true);
            if (isEdit) {
                await axios.put(`/students/${studentId}`, formData);
                alert("Student updated successfully");
            } else {
                await axios.post('/students', formData);
                alert("Student created successfully");
            }
            navigate('/students');
        } catch (error) {
            alert("Error saving student data");
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>{isEdit ? "Edit Student" : "Add Student"}</h1>
          <button onClick={() => navigate('/students')} style={styles.cancelBtn}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              disabled={isEdit}
              style={{...styles.input, opacity: isEdit ? 0.6 : 1}}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select Course</option>
              <option value="React">React</option>
              <option value="Node">Node</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div style={styles.actions}>
            <button 
              type="submit" 
              style={{...styles.button, opacity: loading ? 0.7 : 1}}
              disabled={loading}
            >
              {loading ? "Saving..." : (isEdit ? "Update Student" : "Create Student")}
            </button>
            <button 
              type="button"
              onClick={() => navigate('/students')}
              style={styles.secondaryBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default StudentForm

const styles = {
  container: {
    padding: "30px",
    maxWidth: "500px",
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
  cancelBtn: {
    background: "#f0f0f0",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#666",
  },
  form: {
    background: "#fff",
    padding: "28px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "14px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "14px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    boxSizing: "border-box",
    outline: "none",
    background: "#fff",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  button: {
    flex: 1,
    padding: "12px",
    background: "#344ec2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  },
  secondaryBtn: {
    flex: 1,
    padding: "12px",
    background: "#f0f0f0",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};