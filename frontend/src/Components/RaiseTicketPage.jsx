import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTicketAlt,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaWifi,
  FaMobileAlt,
  FaGlobe,
  FaExclamationCircle,
  FaPaperPlane,
  FaCheckCircle,
  FaTimes,
  FaLock,
  FaUserPlus,
  FaArrowRight,
} from "react-icons/fa";
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

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modalCard}>
        <button style={modalStyles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>

        <div style={modalStyles.topSection}>
          <div style={modalStyles.logoBox}>
            <FaLock />
          </div>
          <h2 style={modalStyles.heading}>Authentication Required</h2>
          <p style={modalStyles.subText}>
            Please log in or create a new account to raise and manage your
            support tickets.
          </p>
        </div>

        <div style={modalStyles.btnWrapper}>
          <button
            onClick={() => handleNavigation("/login")}
            style={modalStyles.loginBtn}
          >
            <FaLock style={{ marginRight: "12px" }} />
            Login to Account
            <FaArrowRight style={modalStyles.arrowIcon} />
          </button>

          <button
            onClick={() => handleNavigation("/register")}
            style={modalStyles.signupBtn}
          >
            <FaUserPlus style={{ marginRight: "12px" }} />
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

const RaiseTicketPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [ticketData, setTicketData] = useState(() => {
    const backup = sessionStorage.getItem("teleSupportTicketCache");
    if (backup) {
      try {
        return JSON.parse(backup);
      } catch (e) {
        console.error("Ticket cache parsing failure:", e);
      }
    }
    return {
      fullName: "",
      email: "",
      phone: "",
      issueType: "",
      subject: "",
      description: "",
    };
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("teleSupportUser");
    if (storedUser) {
      setIsLoggedIn(true);
      try {
        const parsedUser = JSON.parse(storedUser);

        setTicketData((prev) => ({
          ...prev,
          fullName:
            prev.fullName || parsedUser.fullName || parsedUser.full_name || "",
          email: prev.email || parsedUser.email || "",
          phone: prev.phone || parsedUser.phone || "",
        }));
      } catch (err) {
        console.error(
          "Failed to extract active session metadata profiles:",
          err
        );
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "teleSupportTicketCache",
      JSON.stringify(ticketData)
    );
  }, [ticketData]);

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleChange = (e) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("teleSupportUser");
    if (!storedUser) {
      setIsLoggedIn(false);
      setIsModalOpen(true);
      return;
    }

    let userId = null;
    try {
      const parsedUser = JSON.parse(storedUser);
      userId = parsedUser.id || parsedUser.userId || parsedUser.user_id || 1;
    } catch (err) {
      userId = 1;
    }

    setIsSubmitting(true);

    const payload = {
      user_id: userId,
      full_name: ticketData.fullName,
      issue_type: ticketData.issueType,
      subject: ticketData.subject,
      description: ticketData.description,
      email: ticketData.email,
      phone: ticketData.phone,
    };

    try {
      const cleanBaseUrl = API_URL.replace(/\/+$/, "");

      const response = await fetch(`${cleanBaseUrl}/tickets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        triggerToast("Ticket Submitted Successfully!", "success");

        sessionStorage.removeItem("teleSupportTicketCache");

        setTicketData({
          fullName: ticketData.fullName,
          email: ticketData.email,
          phone: ticketData.phone,
          issueType: "",
          subject: "",
          description: "",
        });
      } else {
        triggerToast("Failed to submit ticket. Please try again.", "error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      triggerToast(
        "Network error. Unable to connect to system support API.",
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

        <section style={styles.heroSection}>
          <div className="hero-center">
            <div style={styles.badge} className="pulse-badge">
              <FaTicketAlt style={{ marginRight: "4px" }} />
              Customer Support Ticket
            </div>
            <h1 style={styles.heading}>
              Raise Your <br />{" "}
              <span className="text-gradient">Support Ticket</span>
            </h1>
            <p style={styles.description}>
              Facing telecom issues? Submit your support request and our team
              will assist you as quickly as possible.
            </p>
          </div>
        </section>

        <section style={styles.ticketSection}>
          <div style={styles.infoCard} className="info-box">
            <div style={styles.infoIcon} className="floating-icon">
              <FaCheckCircle />
            </div>
            <h2 style={styles.infoHeading}>Quick & Reliable Support</h2>
            <p style={styles.infoText}>
              Our support team is available to help you resolve telecom related
              issues quickly and efficiently.
            </p>
            <div style={styles.featureWrapper}>
              <div
                style={styles.featureItem}
                className="interactive-feature-item"
              >
                <FaWifi className="feature-icon-red" /> Network Issue Support
              </div>
              <div
                style={styles.featureItem}
                className="interactive-feature-item"
              >
                <FaMobileAlt className="feature-icon-red" /> Recharge Assistance
              </div>
              <div
                style={styles.featureItem}
                className="interactive-feature-item"
              >
                <FaGlobe className="feature-icon-red" /> Broadband
                Troubleshooting
              </div>
              <div
                style={styles.featureItem}
                className="interactive-feature-item"
              >
                <FaPhoneAlt className="feature-icon-red" /> Calling & SIM
                Support
              </div>
            </div>
          </div>

          <form style={styles.formCard} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <FaUser style={styles.inputIcon} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  value={ticketData.fullName}
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
                  placeholder="Enter your email"
                  value={ticketData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <div style={styles.inputWrapper}>
                <FaPhoneAlt style={styles.inputIcon} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={ticketData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Issue Type</label>
              <div style={styles.inputWrapper}>
                <FaExclamationCircle style={styles.inputIcon} />
                <select
                  name="issueType"
                  value={ticketData.issueType}
                  onChange={handleChange}
                  style={styles.select}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select Issue Type</option>
                  <option value="Network Issue">Network Issue</option>
                  <option value="Recharge Problem">Recharge Problem</option>
                  <option value="SIM Issue">SIM Issue</option>
                  <option value="Broadband Problem">Broadband Problem</option>
                  <option value="Calling Problem">Calling Problem</option>
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter ticket subject"
                value={ticketData.subject}
                onChange={handleChange}
                style={styles.inputFull}
                required
                disabled={isSubmitting}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                placeholder="Describe your issue..."
                value={ticketData.description}
                onChange={handleChange}
                style={styles.textarea}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            <button
              type="submit"
              style={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Ticket..." : "Submit Ticket"}
              <FaPaperPlane style={{ marginLeft: "10px" }} />
            </button>
          </form>
        </section>
      </div>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    opacity: 0.6,
    transition: "opacity 0.2s",
  },
};

const modalStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    padding: "20px",
  },
  modalCard: {
    width: "100%",
    maxWidth: "460px",
    background: "rgba(255,255,255,0.95)",
    borderRadius: "32px",
    padding: "45px 40px",
    position: "relative",
    border: "1px solid rgba(239,68,68,0.10)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
    animation: "modalShow 0.3s ease forwards",
  },
  closeBtn: {
    position: "absolute",
    top: "18px",
    right: "18px",
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    border: "none",
    background: "rgba(239,68,68,0.08)",
    color: "#dc2626",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
  },
  topSection: { textAlign: "center", marginBottom: "36px" },
  logoBox: {
    width: "90px",
    height: "90px",
    borderRadius: "28px",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 24px",
    fontSize: "2rem",
    boxShadow: "0 15px 35px rgba(239,68,68,0.25)",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: "900",
    color: "#991b1b",
    marginBottom: "12px",
    letterSpacing: "-0.5px",
  },
  subText: { color: "#6b7280", lineHeight: "1.6", fontSize: "0.96rem" },
  btnWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  },
  loginBtn: {
    width: "100%",
    height: "58px",
    borderRadius: "18px",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    boxShadow: "0 12px 30px rgba(239,68,68,0.22)",
  },
  arrowIcon: { position: "absolute", right: "24px", fontSize: "0.9rem" },
  signupBtn: {
    width: "100%",
    height: "58px",
    borderRadius: "18px",
    border: "2px solid #fecaca",
    background: "rgba(255,255,255,0.8)",
    color: "#dc2626",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const styles = {
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #ffffff 0%, #fff6f6 45%, #ffffff 100%)",
    paddingTop: "110px",
    color: "#111827",
  },
  blurOne: {
    position: "absolute",
    top: "-120px",
    left: "-80px",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(239,68,68,0.12)",
    filter: "blur(100px)",
  },
  blurTwo: {
    position: "absolute",
    bottom: "-120px",
    right: "-80px",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(220,38,38,0.10)",
    filter: "blur(100px)",
  },
  heroSection: { padding: "40px 8% 30px", position: "relative", zIndex: 2 },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 18px",
    borderRadius: "14px",
    background: "rgba(239,68,68,0.06)",
    border: "1px solid rgba(239,68,68,0.15)",
    color: "#dc2626",
    marginBottom: "24px",
    fontSize: "0.88rem",
    fontWeight: "700",
    letterSpacing: "0.3px",
  },
  heading: {
    fontSize: "clamp(2.7rem, 7vw, 4.8rem)",
    fontWeight: "900",
    lineHeight: "1.15",
    marginBottom: "22px",
    letterSpacing: "-1.5px",
    color: "#111827",
  },
  description: {
    color: "#4b5563",
    fontSize: "1.08rem",
    lineHeight: "1.85",
    maxWidth: "700px",
  },
  ticketSection: {
    position: "relative",
    zIndex: 2,
    padding: "30px 8% 120px",
    display: "grid",
    gridTemplateColumns: "1fr 1.1fr",
    gap: "35px",
    alignItems: "start",
  },
  infoCard: {
    background: "rgba(255,255,255,0.65)",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "32px",
    padding: "40px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
  },
  infoIcon: {
    width: "72px",
    height: "72px",
    borderRadius: "22px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.75rem",
    marginBottom: "26px",
    color: "white",
    boxShadow: "0 10px 25px rgba(239,68,68,0.20)",
  },
  infoHeading: {
    fontSize: "1.85rem",
    marginBottom: "14px",
    fontWeight: "800",
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  infoText: {
    color: "#4b5563",
    lineHeight: "1.75",
    marginBottom: "30px",
    fontSize: "0.96rem",
  },
  featureWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    borderTop: "1px solid rgba(0, 0, 0, 0.04)",
    paddingTop: "20px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#374151",
    fontSize: "0.92rem",
    fontWeight: "600",
    padding: "4px 0",
  },
  formCard: {
    background: "rgba(255,255,255,0.65)",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "32px",
    padding: "40px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
  },
  inputGroup: { marginBottom: "22px" },
  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#991b1b",
  },
  inputWrapper: { position: "relative" },
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
    padding: "0 18px 0 50px",
    color: "#111827",
    outline: "none",
    fontSize: "0.96rem",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    height: "58px",
    borderRadius: "1rem",
    border: "1px solid #fecaca",
    background: "white",
    padding: "0 18px 0 50px",
    color: "#111827",
    outline: "none",
    fontSize: "0.96rem",
    boxSizing: "border-box",
  },
  inputFull: {
    width: "100%",
    height: "58px",
    borderRadius: "1rem",
    border: "1px solid #fecaca",
    background: "white",
    padding: "0 18px",
    color: "#111827",
    outline: "none",
    fontSize: "0.96rem",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "150px",
    borderRadius: "1rem",
    border: "1px solid #fecaca",
    background: "white",
    padding: "18px",
    color: "#111827",
    outline: "none",
    fontSize: "0.96rem",
    resize: "none",
    lineHeight: "1.8",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    height: "60px",
    borderRadius: "1rem",
    border: "none",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.35s ease",
    marginTop: "10px",
    boxShadow: "0 10px 25px rgba(239,68,68,0.25)",
  },
};

const responsiveStyles = `
.text-gradient {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes pulseLive {
  0% { transform: scale(0.98); opacity: 0.9; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.98); opacity: 0.9; }
}

@keyframes floatIcon {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}

.floating-icon { animation: floatIcon 4s ease-in-out infinite; }
.pulse-badge { animation: pulseLive 2s infinite; }

input::placeholder,
textarea::placeholder{
  color:#9ca3af;
}

textarea{
  font-family:inherit;
}

button{
  transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover:not(:disabled){
  transform:translateY(-2px);
}

button:disabled{
  opacity: 0.6;
  cursor: not-allowed;
}

input:focus,
select:focus,
textarea:focus{
  border:1px solid rgba(239,68,68,0.7);
  box-shadow:0 0 0 4px rgba(239,68,68,0.12);
}

.feature-icon-red {
  color: #ef4444;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.interactive-feature-item {
  transition: transform 0.25s ease;
  cursor: default;
}

.interactive-feature-item:hover {
  transform: translateX(4px);
  color: #ef4444;
}

@keyframes modalShow{
  from{
    opacity:0;
    transform:translateY(30px) scale(0.95);
  }
  to{
    opacity:1;
    transform:translateY(0) scale(1);
  }
}

@keyframes toastSlideIn {
  from { opacity: 0; transform: translateY(-40px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media(max-width:992px){
  .hero-center{
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
  }
}

@media(max-width:900px){
  section{
    padding-left:6% !important;
    padding-right:6% !important;
  }
}

@media(max-width:850px){
  section:last-child{
    grid-template-columns:1fr !important;
  }
  .info-box{
    display:none !important;
  }
}

@media(max-width:768px){
  form{
    padding:32px !important;
    border-radius:22px !important;
  }
  div[style*="padding: 45px 40px"]{
    padding:35px 25px !important;
    border-radius:28px !important;
  }
  div[style*="position: fixed; top: 24px"] {
    right: 12px !important;
    left: 12px !important;
    top: 16px !important;
    width: calc(100% - 24px) !important;
  }
}

@media(max-width:500px){
  form{
    padding:24px !important;
    border-radius:20px !important;
  }
  input,
  select{
    height:54px !important;
  }
  textarea{
    min-height:130px !important;
  }
  div[style*="padding: 45px 40px"]{
    padding:28px 20px !important;
    border-radius:24px !important;
  }
}
`;

export default RaiseTicketPage;
