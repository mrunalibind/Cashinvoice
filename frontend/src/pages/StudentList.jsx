import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios.js'
import { AuthContext } from '../context/AuthContext.jsx'
import Navbar from '../components/Navbar.jsx'   

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/students?search=${search}&page=${page}&limit=${limit}`);
            setStudents(res.data.students);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [search, page]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const handleDelete = async (studentId) => {
        if (!window.confirm("Are you sure you want to delete this student?")) {
            return;
        }

        try {
            await axios.delete(`/students/${studentId}`);
            fetchStudents(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Student List</h1>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        {loading && <div style={styles.loading}>Loading...</div>}

        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.emptyCell}>
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student, idx) => (
                <tr key={student._id} style={styles.row}>
                  <td style={styles.td}><strong>{student.name}</strong></td>
                  <td style={styles.td}>{student.email}</td>
                  <td style={styles.td}>{student.course}</td>
                  <td style={styles.td}>{student.status}</td>
                  <td style={styles.td}>
                    <button onClick={() => navigate(`/students/${student._id}`)} style={styles.viewBtn}>
                      View
                    </button>
                    {user?.role === "admin" && (
                      <>
                        <button onClick={() => navigate(`/students/create?id=${student._id}`)} style={styles.editBtn}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(student._id)} style={styles.deleteBtn}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ✅ Pagination UI */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              style={styles.pageBtn}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  style={{
                    ...styles.pageBtn,
                    backgroundColor: page === pageNumber ? "#333" : "#fff",
                    color: page === pageNumber ? "#fff" : "#000",
                  }}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              style={styles.pageBtn}
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </>
  )
}

export default StudentList

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1100px",
    margin: "0 auto",
    minHeight: "calc(100vh - 80px)"
  },
  title: {
    margin: "0 0 24px 0",
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
  },
  search: {
    marginBottom: "20px",
    padding: "10px 14px",
    width: "280px",
    fontSize: "14px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  loading: {
    padding: "20px",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 5px 8px rgba(0,0,0,0.08)",
  },
  headerRow: {
    background: "#344ec2",
  },
  th: {
    padding: "14px",
    color: "#fff",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "15px",
  },
  row: {
    borderBottom: "2px solid #eee",
  },
  td: {
    padding: "14px",
    fontSize: "14px",
    color: "#333",
  },
  emptyCell: {
    padding: "32px 14px",
    textAlign: "center",
    color: "#999",
  },
  viewBtn: {
    padding: "6px 12px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    marginRight: "6px",
    transition: "opacity 0.2s",
  },
  editBtn: {
    padding: "6px 12px",
    background: "#ff9800",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    marginRight: "6px",
    transition: "opacity 0.2s",
  },
  deleteBtn: {
    padding: "6px 12px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  pagination: {
    marginTop: "20px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  pageBtn: {
    padding: "8px 12px",
    border: "2px solid #e0e0e0",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.2s",
  },
};