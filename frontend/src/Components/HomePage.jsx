import React, { useState } from "react";
import {
  FaHeadset,
  FaWifi,
  FaMobileAlt,
  FaShieldAlt,
  FaCloud,
  FaArrowRight,
} from "react-icons/fa";

const HomePage = () => {
  const [hoveredBtn, setHoveredBtn] = useState("");

  return (
    <div style={styles.container}>
      <style>{mobileStyles}</style>

      <div style={styles.blurOne} className="ambient-glow-1"></div>
      <div style={styles.blurTwo} className="ambient-glow-2"></div>

      <section style={styles.heroSection}>
        <div style={styles.leftContent} className="hero-center">
          <div style={styles.badge} className="badge-center pulse-badge">
            <FaCloud style={{ marginRight: "8px" }} />
            Cloud-Based Telecom Support
          </div>

          <h1 style={styles.heading} className="hero-title">
            Smart Telecom <br />
            <span className="text-gradient">Support Platform</span>
          </h1>

          <p style={styles.description}>
            TeleSupport Hub helps customers raise support tickets, manage
            telecom services, and connect with support agents through a secure
            cloud-based platform.
          </p>

          <div style={styles.buttonContainer} className="btn-center">
            <button
              style={{
                ...styles.primaryBtn,
                transform:
                  hoveredBtn === "primary"
                    ? "translateY(-4px)"
                    : "translateY(0px)",
              }}
              onMouseEnter={() => setHoveredBtn("primary")}
              onMouseLeave={() => setHoveredBtn("")}
              onClick={() => (window.location.href = "/raise-ticket")}
              className="primary-btn-interactive"
            >
              Get Started
              <FaArrowRight
                className="btn-arrow"
                style={{ marginLeft: "10px", transition: "transform 0.2s" }}
              />
            </button>

            <button
              style={{
                ...styles.secondaryBtn,
                transform:
                  hoveredBtn === "secondary"
                    ? "translateY(-4px)"
                    : "translateY(0px)",
              }}
              onMouseEnter={() => setHoveredBtn("secondary")}
              onMouseLeave={() => setHoveredBtn("")}
              onClick={() => (window.location.href = "/services")}
              className="secondary-btn-interactive"
            >
              Explore Services
            </button>
          </div>
        </div>

        <div style={styles.rightContent}>
          <div
            style={styles.glassCard}
            className="glass-card-mobile real-glass-panel"
          >
            <div style={styles.cardTop} className="mobile-card-center">
              <div style={styles.liveDot} className="live-pulsing-dot"></div>
              <span style={styles.liveText}>Live Support Active</span>
            </div>

            <div
              style={styles.supportIcon}
              className="icon-mobile-center floating-icon"
            >
              <FaHeadset />
            </div>

            <h2 style={styles.cardHeading}>24/7 Customer Support</h2>
            <p style={styles.cardText}>
              Resolve network issues, recharge problems, billing concerns, and
              service requests instantly with our active technical team.
            </p>

            <div style={styles.statsContainer}>
              <div style={styles.statBox} className="metric-tile">
                <h3>15K+</h3>
                <p>Users</p>
              </div>

              <div style={styles.statBox} className="metric-tile">
                <h3>99%</h3>
                <p>Uptime</p>
              </div>

              <div style={styles.statBox} className="metric-tile">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.servicesSection}>
        <h2 style={styles.sectionTitle}>Our Telecom Services</h2>

        <div style={styles.cardGrid}>
          <div style={styles.serviceCard} className="service-card">
            <div style={styles.iconBox} className="service-icon">
              <FaWifi />
            </div>
            <h3 style={styles.serviceTitle}>Network Support</h3>
            <p style={styles.serviceText}>
              Report network outages and connectivity issues instantly with
              dedicated real-time pipeline monitoring assistance.
            </p>
          </div>

          <div style={styles.serviceCard} className="service-card">
            <div style={styles.iconBox} className="service-icon">
              <FaMobileAlt />
            </div>
            <h3 style={styles.serviceTitle}>Recharge Services</h3>
            <p style={styles.serviceText}>
              Manage active prepaid plans, check data coverage bundles, and
              track telecom subscriptions seamlessly.
            </p>
          </div>

          <div style={styles.serviceCard} className="service-card">
            <div style={styles.iconBox} className="service-icon">
              <FaShieldAlt />
            </div>
            <h3 style={styles.serviceTitle}>Secure Support</h3>
            <p style={styles.serviceText}>
              Your system logs and credentials are protected under cryptographic
              end-to-end cloud infrastructure frameworks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #ffffff 0%, #fff6f6 40%, #ffebeb 100%)",
    color: "#111827",
    paddingTop: "110px",
  },
  blurOne: {
    position: "absolute",
    top: "-100px",
    left: "-100px",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(239,68,68,0.12) 0%, rgba(255,255,255,0) 70%)",
    filter: "blur(50px)",
    pointerEvents: "none",
  },
  blurTwo: {
    position: "absolute",
    bottom: "-100px",
    right: "-100px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(220,38,38,0.10) 0%, rgba(255,255,255,0) 70%)",
    filter: "blur(60px)",
    pointerEvents: "none",
  },
  heroSection: {
    minHeight: "85vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "40px 8% 60px",
    gap: "60px",
    position: "relative",
    zIndex: 2,
  },
  leftContent: {
    flex: 1,
    minWidth: "320px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
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
    width: "fit-content",
    fontWeight: "700",
    letterSpacing: "0.3px",
  },
  heading: {
    fontSize: "clamp(2.8rem, 7vw, 4.6rem)",
    fontWeight: "900",
    lineHeight: "1.15",
    marginBottom: "24px",
    letterSpacing: "-1.5px",
    color: "#111827",
  },
  description: {
    color: "#4b5563",
    fontSize: "1.08rem",
    lineHeight: "1.85",
    maxWidth: "600px",
    marginBottom: "36px",
  },
  buttonContainer: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "16px 32px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: "0 10px 25px rgba(239,68,68,0.25)",
  },
  secondaryBtn: {
    padding: "16px 32px",
    borderRadius: "16px",
    border: "1px solid rgba(239,68,68,0.2)",
    background: "rgba(255,255,255,0.7)",
    color: "#dc2626",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
  },
  rightContent: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    minWidth: "320px",
  },
  glassCard: {
    width: "100%",
    maxWidth: "450px",
    padding: "40px",
    borderRadius: "32px",
    background: "rgba(255,255,255,0.65)",
    border: "1px solid rgba(255,255,255,0.4)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 40px rgba(239,68,68,0.06), 0 1px 3px rgba(0,0,0,0.02)",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "32px",
  },
  liveDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#10b981",
  },
  liveText: {
    color: "#15803d",
    fontWeight: "700",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  supportIcon: {
    width: "84px",
    height: "84px",
    borderRadius: "24px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.3rem",
    marginBottom: "28px",
    color: "white",
    boxShadow: "0 12px 30px rgba(239,68,68,0.22)",
  },
  cardHeading: {
    fontSize: "1.85rem",
    fontWeight: "800",
    marginBottom: "14px",
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  cardText: {
    color: "#4b5563",
    lineHeight: "1.75",
    fontSize: "0.96rem",
    marginBottom: "32px",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },
  statBox: {
    flex: 1,
    background: "rgba(255,255,255,0.8)",
    padding: "18px 10px",
    borderRadius: "20px",
    textAlign: "center",
    border: "1px solid rgba(239,68,68,0.08)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
  },
  servicesSection: {
    padding: "100px 8% 130px",
    position: "relative",
    zIndex: 2,
    borderTop: "1px solid rgba(239,68,68,0.06)",
  },
  sectionTitle: {
    fontSize: "clamp(2.2rem, 5vw, 3rem)",
    textAlign: "center",
    marginBottom: "64px",
    fontWeight: "800",
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "32px",
  },
  serviceCard: {
    background: "rgba(255,255,255,0.65)",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "28px",
    padding: "40px 34px",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    backdropFilter: "blur(16px)",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(0,0,0,0.02)",
  },
  iconBox: {
    width: "68px",
    height: "68px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.6rem",
    marginBottom: "26px",
    color: "white",
    boxShadow: "0 10px 20px rgba(239,68,68,0.15)",
  },
  serviceTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#111827",
  },
  serviceText: {
    color: "#4b5563",
    lineHeight: "1.75",
    fontSize: "0.94rem",
  },
};

const mobileStyles = `
.text-gradient {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes pulseLive {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16,185,129,0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16,185,129,0); }
}

@keyframes floatIcon {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}

.live-pulsing-dot {
  animation: pulseLive 2s infinite;
}

.floating-icon {
  animation: floatIcon 4s ease-in-out infinite;
}

.hero-center {
  text-align: left;
}

/* --- INTERACTION CLASSES --- */
.primary-btn-interactive:hover {
  background: linear-gradient(135deg, #f87171 0%, #dc2626 100%) !important;
  box-shadow: 0 14px 30px rgba(239,68,68,0.35) !important;
}

.primary-btn-interactive:hover .btn-arrow {
  transform: translateX(4px);
}

.secondary-btn-interactive:hover {
  background: #ffffff !important;
  border-color: rgba(239,68,68,0.4) !important;
}

.service-card:hover {
  transform: translateY(-6px);
  border-color: rgba(239,68,68,0.2) !important;
  background: #ffffff !important;
  box-shadow: 0 20px 40px rgba(239,68,68,0.08) !important;
}

/* --- RESPONSIVE MEDIA BREAKPOINTS --- */
@media(max-width:992px){
  .hero-center {
    text-align: center !important;
    align-items: center !important;
  }
  .btn-center {
    justify-content: center !important;
  }
  .badge-center {
    margin-left: auto !important;
    margin-right: auto !important;
  }
  .glass-card-mobile {
    text-align: center !important;
    margin-top: 15px;
  }
  .mobile-card-center {
    justify-content: center !important;
  }
  .icon-mobile-center {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

@media(max-width:768px){
  .service-card {
    text-align: center !important;
    padding: 36px 24px !important;
    border-radius: 24px !important;
  }
  .service-icon {
    margin-left: auto !important;
    margin-right: auto !important;
  }
  .metric-tile h3 {
    font-size: 1.3rem !important;
  }
  .metric-tile p {
    font-size: 0.75rem !important;
  }
}

@media(max-width:500px){
  .glass-card-mobile {
    padding: 30px 20px !important;
    border-radius: 24px !important;
  }
  .metric-tile {
    padding: 14px 6px !important;
  }
}
`;

export default HomePage;
