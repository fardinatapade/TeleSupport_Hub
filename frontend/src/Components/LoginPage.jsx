import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeadset,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../config";

const Toast = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
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
          {isSuccess ? "Success" : "Authentication Alert"}
        </strong>
        <p style={toastStyles.message}>{message}</p>
      </div>
      <button onClick={onClose} style={toastStyles.closeBtn}>
        <FaTimes />
      </button>
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("teleSupportUser");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);

        if (parsed.email) {
          setFormData({ email: parsed.email, password: "" });
        }
      } catch (e) {
        console.error("Session load crash:", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const cleanBaseUrl = API_URL.replace(/\/+$/, "");

      const response = await axios.post(`${cleanBaseUrl}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        localStorage.setItem(
          "teleSupportUser",
          JSON.stringify(response.data.user)
        );

        triggerToast(
          response.data.message || "Login Successful! Redirecting...",
          "success"
        );

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      const serverMessage =
        error.response?.data?.message || "Login Failed. Invalid Credentials.";
      triggerToast(serverMessage, "error");
    } finally {
      setLoading(false);
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

        <div style={styles.mainWrapper}>
          <div style={styles.leftSide} className="left-side">
            <div style={styles.leftContent}>
              <div style={styles.smallBadge}>TELECOM SUPPORT PLATFORM</div>
              <h1 style={styles.heading}>
                Welcome Back To <br /> TeleSupport Hub
              </h1>
              <p style={styles.description}>
                Securely manage telecom services, raise support tickets, and
                connect with customer support agents in real-time.
              </p>
            </div>
          </div>

          <div style={styles.rightSide} className="right-side">
            <form style={styles.formCard} onSubmit={handleSubmit}>
              <div style={styles.formTop}>
                <div style={styles.logoBox}>
                  <FaHeadset />
                </div>
                <h2 style={styles.formHeading}>Login Account</h2>
                <p style={styles.formText}>
                  Enter your credentials to continue
                </p>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrapper}>
                  <FaEnvelope style={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Registered Gmail"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputWrapper}>
                  <FaLock style={styles.inputIcon} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                    disabled={loading}
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

              <button type="submit" style={styles.loginBtn} disabled={loading}>
                {loading ? (
                  "Logging In..."
                ) : (
                  <>
                    Login Now
                    <FaArrowRight style={{ marginLeft: "10px" }} />
                  </>
                )}
              </button>

              <div style={styles.bottomText}>
                Don&apos;t have an account?
                <a href="/register" style={styles.registerLink}>
                  Create Account
                </a>
              </div>
            </form>
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
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg,#fff5f5 0%,#ffe4e6 45%,#ffffff 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 6%",
    boxSizing: "border-box",
  },
  blurOne: {
    position: "absolute",
    top: "-120px",
    left: "-120px",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(239,68,68,0.15)",
    filter: "blur(100px)",
  },
  blurTwo: {
    position: "absolute",
    bottom: "-120px",
    right: "-120px",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(220,38,38,0.14)",
    filter: "blur(100px)",
  },
  mainWrapper: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "1350px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "50px",
  },
  leftSide: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  leftContent: {
    maxWidth: "540px",
  },
  smallBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 18px",
    borderRadius: "1rem",
    background: "rgba(239,68,68,0.10)",
    border: "1px solid rgba(239,68,68,0.12)",
    color: "#dc2626",
    fontSize: "0.85rem",
    fontWeight: "800",
    letterSpacing: "1px",
    marginBottom: "28px",
  },
  heading: {
    fontSize: "clamp(3rem, 6vw, 5.5rem)",
    lineHeight: "1.05",
    fontWeight: "900",
    color: "#991b1b",
    letterSpacing: "-2px",
    marginBottom: "24px",
  },
  description: {
    color: "#4b5563",
    fontSize: "1.08rem",
    lineHeight: "2",
    maxWidth: "520px",
  },
  rightSide: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  formCard: {
    width: "100%",
    maxWidth: "540px",
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(239,68,68,0.10)",
    backdropFilter: "blur(18px)",
    borderRadius: "1.5rem",
    padding: "42px",
    boxShadow: "0 18px 50px rgba(239,68,68,0.10)",
  },
  formTop: {
    textAlign: "center",
    marginBottom: "34px",
  },
  logoBox: {
    width: "90px",
    height: "90px",
    borderRadius: "1.5rem",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 24px",
    color: "white",
    fontSize: "2.1rem",
  },
  formHeading: {
    fontSize: "2rem",
    fontWeight: "900",
    color: "#991b1b",
    marginBottom: "10px",
  },
  formText: {
    color: "#6b7280",
    fontSize: "0.96rem",
  },
  inputGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    marginBottom: "12px",
    fontWeight: "700",
    color: "#991b1b",
  },
  inputWrapper: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    top: "50%",
    left: "18px",
    transform: "translateY(-50%)",
    color: "#ef4444",
  },
  input: {
    width: "100%",
    height: "60px",
    borderRadius: "1rem",
    border: "1px solid #fecaca",
    background: "rgba(255,255,255,0.95)",
    padding: "0 55px 0 52px",
    outline: "none",
    fontSize: "0.96rem",
    color: "#111827",
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
  optionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "28px",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  rememberText: {
    color: "#4b5563",
    fontSize: "0.94rem",
  },
  loginBtn: {
    width: "100%",
    height: "60px",
    borderRadius: "1rem",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    marginTop: "24px",
    textAlign: "center",
    color: "#6b7280",
    fontWeight: "500",
  },
  registerLink: {
    marginLeft: "8px",
    color: "#dc2626",
    textDecoration: "none",
    fontWeight: "800",
  },
};

const responsiveStyles = `
* {
  box-sizing:border-box;
}

body {
  margin:0;
  font-family:Inter,sans-serif;
}

input::placeholder {
  color:#9ca3af;
}

button:hover {
  transform:translateY(-2px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

input:focus {
  border:1px solid rgba(239,68,68,0.6);
  box-shadow:0 0 0 4px rgba(239,68,68,0.10);
}

@keyframes toastSlideIn {
  from { opacity: 0; transform: translateY(-40px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media(max-width:992px) {
  .left-side {
    display:none !important;
  }
  div[style*="grid-template-columns: 1fr 1fr"] {
    grid-template-columns:1fr !important;
  }
}

@media(max-width:768px) {
  form {
    padding:26px !important;
  }
  /* Dynamic mobile toast layout optimization rules */
  div[style*="position: fixed; top: 24px"] {
    right: 12px !important;
    left: 12px !important;
    top: 16px !important;
    width: calc(100% - 24px) !important;
  }
}

@media(max-width:500px) {
  div[style*="padding: 20px 6%"] {
    padding:16px 4% !important;
  }
  form {
    padding:20px !important;
    border-radius:1.2rem !important;
  }
  input {
    height:56px !important;
    border-radius:0.9rem !important;
  }
  button {
    height:56px !important;
  }
  h2 {
    font-size:1.6rem !important;
  }
}
`;

export default LoginPage;
