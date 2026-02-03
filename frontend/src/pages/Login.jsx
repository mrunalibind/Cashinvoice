import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios.js';
import { AuthContext } from '../context/AuthContext.jsx';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            return setError('All fields are required');
        }

        try {
            const res = await axios.post('/login', formData);

            const payload = JSON.parse(atob(res.data.token.split('.')[1]));
            console.log("Login payload:", payload); 
            login(res.data.token, payload);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    }

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.card}>
                <h2 style={styles.title}>Login</h2>

                {error && <div style={styles.error}>{error}</div>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default Login

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  card: {
    width: "380px",
    padding: "40px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
  },
  title: {
    margin: "0 0 28px 0",
    fontSize: "26px",
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "16px",
    fontSize: "14px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  },
  error: {
    background: "#fee",
    color: "#c33",
    padding: "12px 14px",
    marginBottom: "16px",
    borderRadius: "8px",
    fontSize: "14px",
    border: "1px solid #fcc",
    fontWeight: "500",
  },
};

