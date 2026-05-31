import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaKey,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";

const Toast = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;
  const isSuccess = type === "success";

  return (
    <div
      style={{
        ...toastStyles.toastContainer,
        ...(isSuccess ? toastStyles.success : toastStyles.error),
      }}
    >
      <div style={toastStyles.iconWrapper}>
        {isSuccess ? (
          <FaCheckCircle size={20} />
        ) : (
          <FaExclamationCircle size={20} />
        )}
      </div>
      <div style={toastStyles.textWrapper}>
        <strong style={toastStyles.title}>
          {isSuccess ? "Success" : "Error"}
        </strong>
        <p style={toastStyles.message}>{message}</p>
      </div>
      <button onClick={onClose} style={toastStyles.closeBtn}>
        <FaTimes />
      </button>
    </div>
  );
};

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [adminCredentials, setAdminCredentials] = useState({
    adminId: "",
    securityKey: "",
  });

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleChange = (e) => {
    setAdminCredentials({
      ...adminCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const { adminId, securityKey } = adminCredentials;

    if (adminId === "admin" && securityKey === "admin@123") {
      localStorage.setItem("teleSupportAdminToken", "secure-sys-auth-jwt");
      triggerToast("Access Granted. Redirecting...", "success");
      setTimeout(() => navigate("/admindash"), 1500);
    } else {
      triggerToast("Invalid ID or security key.", "error");
    }
  };

  return (
    <>
      <style>{responsiveStyles}</style>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div style={styles.container}>
        <div style={styles.blurOne}></div>
        <div style={styles.blurTwo}></div>

        <div style={styles.mainCard} className="admin-login-card">
          <div style={styles.headerSection}>
            <div style={styles.logoBox}>
              <FaUserShield />
            </div>
            <h2 style={styles.heading}>Admin Login</h2>
            <p style={styles.subText}>
              Please enter your admin credentials to connect to the dashboard
              terminal.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Admin ID</label>
              <div style={styles.inputWrapper}>
                <FaShieldAlt style={styles.inputIcon} />
                <input
                  type="text"
                  name="adminId"
                  placeholder="Enter admin ID"
                  value={adminCredentials.adminId}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Security Key</label>
              <div style={styles.inputWrapper}>
                <FaKey style={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="securityKey"
                  placeholder="Enter security key"
                  value={adminCredentials.securityKey}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <button
                  type="button"
                  style={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={styles.submitBtn}
              className="admin-submit-btn"
            >
              Login Now
              <FaArrowRight style={{ marginLeft: "10px" }} />
            </button>
          </form>

          <div style={styles.bottomText}>
            <a href="/" style={styles.backLink} className="admin-switch-btn">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const toastStyles = {
  toastContainer: {
    position: "fixed",
    top: "24px",
    right: "24px",
    zIndex: 999999,
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(15,23,42,0.08)",
    maxWidth: "420px",
    width: "calc(100% - 48px)",
    boxSizing: "border-box",
    animation:
      "toastSlideIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
  },
  success: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#166534",
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#991b1b",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "14px",
    flexShrink: 0,
  },
  textWrapper: { flexGrow: 1, marginRight: "12px" },
  title: {
    display: "block",
    fontSize: "0.95rem",
    fontWeight: "700",
    marginBottom: "2px",
  },
  message: { margin: 0, fontSize: "0.88rem", lineHeight: "1.4", opacity: 0.9 },
  closeBtn: {
    background: "none",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    fontSize: "1rem",
    opacity: 0.6,
  },
};

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #fff5f5 0%, #ffe4e6 45%, #ffffff 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "Inter, sans-serif",
  },
  blurOne: {
    position: "absolute",
    top: "-120px",
    left: "-80px",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "rgba(239, 68, 68, 0.18)",
    filter: "blur(100px)",
    pointerEvents: "none",
  },
  blurTwo: {
    position: "absolute",
    bottom: "-120px",
    right: "-80px",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "rgba(220, 38, 38, 0.14)",
    filter: "blur(100px)",
    pointerEvents: "none",
  },
  mainCard: {
    width: "100%",
    maxWidth: "520px",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "32px",
    padding: "40px",
    position: "relative",
    border: "1px solid rgba(239, 68, 68, 0.10)",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.14)",
    boxSizing: "border-box",
  },
  headerSection: { textAlign: "center", marginBottom: "32px" },
  logoBox: {
    width: "90px",
    height: "90px",
    borderRadius: "28px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 24px",
    fontSize: "2rem",
    boxShadow: "0 15px 35px rgba(239, 68, 68, 0.25)",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "900",
    color: "#991b1b",
    marginBottom: "12px",
  },
  subText: {
    color: "#6b7280",
    lineHeight: "1.7",
    fontSize: "0.96rem",
    margin: 0,
  },
  errorBox: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    background: "rgba(239, 68, 68, 0.08)",
    border: "1px solid rgba(239, 68, 68, 0.15)",
    color: "#dc2626",
    fontSize: "0.88rem",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "24px",
    boxSizing: "border-box",
  },
  form: { width: "100%" },
  inputGroup: { marginBottom: "22px" },
  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#991b1b",
  },
  inputWrapper: { position: "relative", width: "100%" },
  inputIcon: {
    position: "absolute",
    top: "50%",
    left: "18px",
    transform: "translateY(-50%)",
    color: "#ef4444",
  },
  input: {
    width: "100%",
    height: "58px",
    borderRadius: "18px",
    border: "1px solid #fecaca",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "0 55px 0 52px",
    outline: "none",
    fontSize: "0.96rem",
    color: "#111827",
    boxSizing: "border-box",
    transition: "all 0.25s ease",
  },
  eyeBtn: {
    position: "absolute",
    top: "50%",
    right: "18px",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: "1rem",
  },
  submitBtn: {
    width: "100%",
    height: "58px",
    borderRadius: "18px",
    border: "none",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8px",
    boxShadow: "0 12px 30px rgba(239, 68, 68, 0.22)",
  },
  bottomText: { marginTop: "26px", textAlign: "center" },
  backLink: {
    border: "none",
    background: "transparent",
    color: "#dc2626",
    fontWeight: "800",
    textDecoration: "none",
    fontSize: "0.96rem",
    cursor: "pointer",
  },
};

const responsiveStyles = `
  * { box-sizing: border-box; }
  @keyframes toastSlideIn { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
  .admin-login-card { animation: adminCardShow 0.35s ease; }
  @keyframes adminCardShow { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .admin-submit-btn:hover { transform: translateY(-2px); }
  .admin-switch-btn:hover { text-decoration: underline; }
  @media(max-width: 500px) {
    div[style*="padding: 40px"] { padding: 22px !important; border-radius: 24px !important; }
    input, .admin-submit-btn { height: 54px !important; font-size: 0.92rem !important; }
  }
`;

export default AdminLoginPage;
