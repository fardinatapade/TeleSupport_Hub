import React, { useState, useEffect } from "react";
import {
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaSearch,
  FaHeadset,
  FaUserShield,
  FaClipboardList,
  FaLayerGroup,
  FaCalendarAlt,
  FaUserAlt,
  FaExchangeAlt,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEyeSlash,
  FaEye,
  FaShieldAlt,
  FaArrowRight,
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
          {isSuccess ? "Success" : "Alert"}
        </strong>
        <p style={toastStyles.message}>{message}</p>
      </div>
      <button onClick={onClose} style={toastStyles.closeBtn}>
        <FaTimes />
      </button>
    </div>
  );
};

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [formData, setFormData] = useState(() => {
    const backup = sessionStorage.getItem("teleSupportSignupCache");
    if (backup) {
      try {
        return JSON.parse(backup);
      } catch (e) {
        console.error("Cache parsing error:", e);
      }
    }
    return {
      fullName: "",
      email: "",
      emailOtp: "",
      password: "",
      confirmPassword: "",
    };
  });

  useEffect(() => {
    sessionStorage.setItem("teleSupportSignupCache", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const savedOtpState = sessionStorage.getItem("teleSupportOtpSent");
    const savedVerifyState = sessionStorage.getItem("teleSupportEmailVerified");
    if (savedOtpState) setOtpSent(JSON.parse(savedOtpState));
    if (savedVerifyState) setEmailVerified(JSON.parse(savedVerifyState));
  }, []);

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmailOtp = async () => {
    if (!formData.email) {
      triggerToast("Please enter your email first.", "error");
      return;
    }

    try {
      const cleanBaseUrl = API_URL.replace(/\/+$/, "");
      const res = await axios.post(`${cleanBaseUrl}/auth/send-otp`, {
        email: formData.email,
      });

      setOtpSent(true);
      sessionStorage.setItem("teleSupportOtpSent", "true");
      triggerToast(res.data.message || "OTP sent successfully!", "success");
    } catch (error) {
      triggerToast(
        error.response?.data?.message || "Failed to send OTP code.",
        "error"
      );
    }
  };

  const verifyEmailOtp = async () => {
    if (!formData.emailOtp) {
      triggerToast("Please enter the OTP code.", "error");
      return;
    }

    try {
      const cleanBaseUrl = API_URL.replace(/\/+$/, "");
      const res = await axios.post(`${cleanBaseUrl}/auth/verify-otp`, {
        email: formData.email,
        otp: formData.emailOtp,
      });

      setEmailVerified(true);
      sessionStorage.setItem("teleSupportEmailVerified", "true");
      triggerToast(
        res.data.message || "Email verified successfully!",
        "success"
      );
    } catch (error) {
      triggerToast(
        error.response?.data?.message ||
          "Invalid OTP code. Please check again.",
        "error"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) {
      triggerToast("Please verify your email first.", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      triggerToast("Passwords do not match.", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const cleanBaseUrl = API_URL.replace(/\/+$/, "");
      const res = await axios.post(`${cleanBaseUrl}/auth/signup`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      triggerToast(
        res.data.message || "Account created successfully!",
        "success"
      );

      sessionStorage.removeItem("teleSupportSignupCache");
      sessionStorage.removeItem("teleSupportOtpSent");
      sessionStorage.removeItem("teleSupportEmailVerified");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      triggerToast(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
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
              <div style={styles.badge}>
                <FaShieldAlt />
                Secure Signup
              </div>
              <h1 style={styles.heading}>Join TeleSupport Hub</h1>
              <p style={styles.description}>
                Create your account to access support services, manage your
                tickets, and get real-time assistance.
              </p>
            </div>
          </div>

          <div style={styles.rightSide} className="right-side">
            <form style={styles.formCard} onSubmit={handleSubmit}>
              <div style={styles.formTop}>
                <div style={styles.logoBox}>
                  <FaHeadset />
                </div>
                <h2 style={styles.formHeading}>Create Account</h2>
                <p style={styles.formText}>Sign up below to get started</p>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <div style={styles.inputWrapper}>
                  <FaUser style={styles.inputIcon} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={styles.input}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrapper}>
                  <FaEnvelope style={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                    disabled={emailVerified || isSubmitting}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Verification</label>
                <div className="verify-wrapper">
                  <div
                    style={styles.inputWrapper}
                    className="otp-input-container"
                  >
                    <FaCheckCircle style={styles.inputIcon} />
                    <input
                      type="number"
                      name="emailOtp"
                      placeholder="Enter code"
                      value={formData.emailOtp || ""}
                      onChange={handleChange}
                      style={styles.input}
                      disabled={emailVerified || isSubmitting}
                    />
                  </div>

                  <div className="otp-buttons-container">
                    <button
                      type="button"
                      style={styles.sendOtpBtn}
                      onClick={sendEmailOtp}
                      disabled={emailVerified || isSubmitting}
                      className="otp-action-btn"
                    >
                      {otpSent ? "Resend" : "Send OTP"}
                    </button>

                    <button
                      type="button"
                      style={{
                        ...styles.verifyBtn,
                        background: emailVerified
                          ? "#16a34a"
                          : "linear-gradient(135deg,#dc2626,#ef4444)",
                      }}
                      onClick={verifyEmailOtp}
                      disabled={emailVerified || isSubmitting}
                      className="otp-action-btn"
                    >
                      {emailVerified ? "Verified" : "Verify"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <div style={styles.inputWrapper}>
                    <FaLock style={styles.inputIcon} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      style={styles.input}
                      required
                      disabled={isSubmitting}
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

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Confirm Password</label>
                  <div style={styles.inputWrapper}>
                    <FaLock style={styles.inputIcon} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      style={styles.input}
                      required
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      style={styles.eyeBtn}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                style={styles.signupBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
                <FaArrowRight style={{ marginLeft: "10px" }} />
              </button>

              <div style={styles.bottomText}>
                Already have an account?
                <a href="/login" style={styles.loginLink}>
                  Login Now
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
    padding: "20px 5%",
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
    maxWidth: "1400px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    alignItems: "center",
  },
  leftSide: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  leftContent: {
    maxWidth: "550px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 20px",
    borderRadius: "1rem",
    background: "rgba(239,68,68,0.10)",
    border: "1px solid rgba(239,68,68,0.12)",
    color: "#dc2626",
    fontWeight: "700",
    marginBottom: "25px",
  },
  heading: {
    fontSize: "clamp(3rem,6vw,5.5rem)",
    lineHeight: "1.05",
    fontWeight: "900",
    color: "#991b1b",
    marginBottom: "22px",
  },
  description: {
    color: "#4b5563",
    fontSize: "1.05rem",
    lineHeight: "1.9",
  },
  rightSide: {
    width: "100%",
  },
  formCard: {
    width: "100%",
    background: "rgba(255,255,255,0.82)",
    borderRadius: "1.5rem",
    padding: "40px",
    border: "1px solid rgba(239,68,68,0.10)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 18px 50px rgba(239,68,68,0.10)",
  },
  formTop: {
    textAlign: "center",
    marginBottom: "30px",
  },
  logoBox: {
    width: "85px",
    height: "85px",
    borderRadius: "1.5rem",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 22px",
    color: "white",
    fontSize: "2rem",
  },
  formHeading: {
    fontSize: "2rem",
    fontWeight: "900",
    color: "#991b1b",
    marginBottom: "10px",
  },
  formText: {
    color: "#6b7280",
  },
  inputGroup: {
    marginBottom: "22px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#991b1b",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
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
    height: "58px",
    borderRadius: "1rem",
    border: "1px solid #fecaca",
    background: "white",
    padding: "0 55px 0 50px",
    outline: "none",
    fontSize: "0.96rem",
    color: "#111827",
  },
  sendOtpBtn: {
    flex: 1,
    height: "58px",
    border: "none",
    borderRadius: "1rem",
    background: "linear-gradient(135deg,#f97316,#ea580c)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    padding: "0 10px",
    fontSize: "0.95rem",
  },
  verifyBtn: {
    flex: 1,
    height: "58px",
    border: "none",
    borderRadius: "1rem",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    padding: "0 10px",
    fontSize: "0.95rem",
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
  },
  signupBtn: {
    width: "100%",
    height: "60px",
    borderRadius: "1rem",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    fontWeight: "800",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  bottomText: {
    marginTop: "24px",
    textAlign: "center",
    color: "#6b7280",
  },
  loginLink: {
    marginLeft: "8px",
    color: "#dc2626",
    textDecoration: "none",
    fontWeight: "800",
  },
};

const responsiveStyles = `
* {
  box-sizing:border-box;
  margin:0;
  padding:0;
}

input::placeholder {
  color:#9ca3af;
}

button {
  transition:0.3s ease;
}

button:hover:not(:disabled) {
  transform:translateY(-2px);
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none !important;
}

input:focus {
  border:1px solid rgba(239,68,68,0.6);
  box-shadow:0 0 0 4px rgba(239,68,68,0.10);
}

/* --- MOBILE FIRST VERIFY CONSOLE WRAPPER --- */
.verify-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.otp-buttons-container {
  display: flex;
  gap: 12px;
  width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

/* --- DESKTOP ADAPTIVE LAYOUT MEDIA TARGETS --- */
@media(min-width: 576px) {
  .verify-wrapper {
    flex-direction: row;
    align-items: center;
  }
  
  .otp-input-container {
    flex: 1.5;
  }

  .otp-buttons-container {
    flex: 2;
  }
}

@media(min-width: 1100px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
}

@media(max-width:992px) {
  .left-side {
    display:none !important;
  }
  
  div[style*="grid-template-columns: 1fr 1fr"] {
    grid-template-columns:1fr !important;
    gap:0 !important;
  }
}

@media(max-width:768px) {
  form {
    padding:28px !important;
  }
  
  div[style*="position: fixed; top: 24px"] {
    right: 12px !important;
    left: 12px !important;
    top: 16px !important;
    width: calc(100% - 24px) !important;
  }
}

@media(max-width:500px) {
  div[style*="padding: 20px 5%"] {
    padding:16px 4% !important;
  }
  
  form {
    padding:20px !important;
    border-radius:1.2rem !important;
  }
  
  input {
    height:54px !important;
    border-radius:0.9rem !important;
  }
  
  .otp-action-btn,
  button[type="submit"] {
    height:54px !important;
  }
  
  h2 {
    font-size:1.6rem !important;
  }
}

@keyframes toastSlideIn {
  from { opacity: 0; transform: translateY(-40px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
`;

export default SignupPage;
