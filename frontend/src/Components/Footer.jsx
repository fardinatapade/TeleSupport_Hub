import React from "react";
import {
  FaHeadset,
  FaInstagram,
  FaHome,
  FaThLarge,
  FaSignInAlt,
  FaUserPlus,
  FaArrowUp,
  FaTicketAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaShieldAlt,
  FaGlobe,
  FaUserShield,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{responsiveStyles}</style>

      <footer style={styles.footer}>
        <div style={styles.blurOne}></div>
        <div style={styles.blurTwo}></div>

        <div className="footer-grid-wrapper">
          <div style={styles.brandSection} className="footer-col-brand">
            <div style={styles.logoWrapper} className="footer-logo-container">
              <div style={styles.logoIcon}>
                <FaHeadset />
              </div>

              <div className="footer-logo-text-box">
                <h2 style={styles.logoText}>
                  TeleSupport<span style={{ color: "#ef4444" }}>.</span>
                </h2>
                <p style={styles.logoSubText}>Smart Telecom Support Platform</p>
              </div>
            </div>

            <p style={styles.description} className="footer-brand-desc">
              A modern cloud-based telecom support platform helping customers
              manage telecom services, raise support requests, and connect with
              support agents securely with lightning-fast assistance.
            </p>

            <div className="footer-contact-row">
              <div style={styles.contactItem} className="footer-glass-card">
                <FaPhoneAlt style={styles.contactIcon} />
                <div style={{ textAlign: "left" }}>
                  <span style={styles.contactLabel}>24/7 Support Line</span>
                  <p style={styles.contactValue}>+1 (800) 555-TELE</p>
                </div>
              </div>

              <div style={styles.contactItem} className="footer-glass-card">
                <FaEnvelope style={styles.contactIcon} />
                <div style={{ textAlign: "left" }}>
                  <span style={styles.contactLabel}>Online Desk</span>
                  <p style={styles.contactValue}>support@telesupporthub.com</p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.linksSection} className="footer-col-links">
            <h3 style={styles.sectionTitle}>Explore Platform</h3>
            <div style={styles.linksWrapper} className="footer-links-box">
              <a href="/" className="footer-custom-link">
                <FaChevronRight className="chevron-icon" />
                <FaHome className="icon-gap" /> Home
              </a>
              <a href="/services" className="footer-custom-link">
                <FaChevronRight className="chevron-icon" />
                <FaThLarge className="icon-gap" /> Services
              </a>
              <a href="/raise-ticket" className="footer-custom-link">
                <FaChevronRight className="chevron-icon" />
                <FaTicketAlt className="icon-gap" /> Raise Ticket
              </a>
              <a href="/my-tickets" className="footer-custom-link">
                <FaChevronRight className="chevron-icon" />
                <FaTicketAlt className="icon-gap" /> My Tickets
              </a>
            </div>
          </div>

          <div style={styles.linksSection} className="footer-col-links">
            <h3 style={styles.sectionTitle}>Access Control</h3>
            <div style={styles.linksWrapper} className="footer-links-box">
              <a href="/login" className="footer-custom-link">
                <FaChevronRight className="chevron-icon" />
                <FaSignInAlt className="icon-gap" /> Sign In Account
              </a>
              <a href="/register" className="footer-custom-link">
                <FaChevronRight className="chevron-icon" />
                <FaUserPlus className="icon-gap" /> Create Account
              </a>
              <a href="/admin" className="footer-custom-link">
                <FaChevronRight className="chevron-icon" />
                <FaUserShield className="icon-gap" /> System Admin
              </a>
            </div>
          </div>

          <div style={styles.linksSection} className="footer-col-links">
            <h3 style={styles.sectionTitle}>Legal & Operations</h3>
            <div style={styles.linksWrapper} className="footer-links-box">
              <div className="footer-custom-link non-clickable">
                <FaShieldAlt className="icon-gap" /> Privacy Architecture
              </div>
              <div className="footer-custom-link non-clickable">
                <FaGlobe className="icon-gap" /> SLA Global Standards
              </div>
              <div className="footer-custom-link non-clickable">
                <FaShieldAlt className="icon-gap" /> Secure Cloud Network
              </div>
            </div>
          </div>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.bottomSection} className="bottom-layout-row">
          <p style={styles.copyright} className="footer-copyright-text">
            © 2026 TeleSupport Hub. Optimized Core Engine. All rights reserved.
          </p>

          <div style={styles.bottomRight} className="footer-bottom-right-row">
            <div className="footer-credit-group">
              <span style={styles.developedText}>Architected by</span>
              <a
                href="https://instagram.com/fardin_dbz"
                target="_blank"
                rel="noreferrer"
                style={styles.devLink}
                className="footer-glass-card dev-active"
              >
                <FaInstagram style={{ color: "#ef4444", fontSize: "1.1rem" }} />
                @fardin_dbz
              </a>
            </div>

            <button
              onClick={scrollToTop}
              style={styles.scrollBtn}
              className="footer-scroll-top-btn"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

const styles = {
  footer: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
    padding: "85px 6% 30px",
    borderTop: "1px solid rgba(226, 232, 240, 0.8)",
    color: "#0f172a",
    boxSizing: "border-box",
  },

  blurOne: {
    position: "absolute",
    top: "-60px",
    left: "-60px",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(239, 68, 68, 0.05)",
    filter: "blur(110px)",
    pointerEvents: "none",
  },

  blurTwo: {
    position: "absolute",
    bottom: "-60px",
    right: "-60px",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(148, 163, 184, 0.12)",
    filter: "blur(110px)",
    pointerEvents: "none",
  },

  brandSection: {
    display: "flex",
    flexDirection: "column",
  },

  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },

  logoIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    color: "white",
    boxShadow: "0 10px 25px rgba(239, 68, 68, 0.25)",
  },

  logoText: {
    margin: 0,
    fontSize: "1.65rem",
    fontWeight: "900",
    letterSpacing: "-0.5px",
    color: "#0f172a",
  },

  logoSubText: {
    margin: 0,
    marginTop: "2px",
    color: "#64748b",
    fontSize: "0.78rem",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },

  description: {
    color: "#475569",
    lineHeight: "1.75",
    fontSize: "0.95rem",
    marginBottom: "24px",
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "14px 18px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.65)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxSizing: "border-box",
  },

  contactIcon: {
    color: "#ef4444",
    fontSize: "1.1rem",
    flexShrink: 0,
  },

  contactLabel: {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },

  contactValue: {
    margin: 0,
    marginTop: "1px",
    fontSize: "0.92rem",
    fontWeight: "700",
    color: "#1e293b",
    wordBreak: "break-word",
  },

  linksSection: {
    display: "flex",
    flexDirection: "column",
  },

  sectionTitle: {
    fontSize: "1.05rem",
    marginBottom: "24px",
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: "0.2px",
    position: "relative",
  },

  linksWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  divider: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    height: "1px",
    background:
      "linear-gradient(90deg, rgba(226,232,240,0.2) 0%, rgba(226,232,240,1) 50%, rgba(226,232,240,0.2) 100%)",
    marginBottom: "25px",
  },

  bottomSection: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  copyright: {
    color: "#64748b",
    margin: 0,
    fontSize: "0.88rem",
    fontWeight: "600",
  },

  bottomRight: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  developedText: {
    color: "#64748b",
    fontSize: "0.88rem",
    fontWeight: "600",
  },

  devLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "0.88rem",
    padding: "10px 16px",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.65)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  },

  scrollBtn: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white",
    fontSize: "0.95rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(239, 68, 68, 0.2)",
    flexShrink: 0,
  },
};

const responsiveStyles = `
.footer-grid-wrapper {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 0.8fr 0.9fr;
  gap: 40px;
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
}

.footer-contact-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 380px;
}

.footer-glass-card {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-custom-link {
  display: flex;
  align-items: center;
  color: #475569;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 12px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  background: transparent;
}

.footer-custom-link .chevron-icon {
  font-size: 0.65rem;
  margin-right: 0;
  width: 0;
  opacity: 0;
  color: #ef4444;
  transition: all 0.25s ease;
}

.footer-custom-link .icon-gap {
  margin-right: 10px;
  color: #94a3b8;
  transition: color 0.25s ease;
}

.footer-custom-link:not(.non-clickable):hover {
  background: rgba(255, 255, 255, 0.6);
  color: #ef4444;
  padding-left: 16px;
}

.footer-custom-link:not(.non-clickable):hover .chevron-icon {
  width: 10px;
  margin-right: 8px;
  opacity: 1;
}

.footer-custom-link:not(.non-clickable):hover .icon-gap {
  color: #ef4444;
}

.footer-custom-link.non-clickable {
  cursor: default;
  font-weight: 500;
  color: #64748b;
}

.dev-active:hover {
  transform: translateY(-2px);
  background: #ffffff !important;
  border-color: rgba(239, 68, 68, 0.2) !important;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.04) !important;
}

.footer-scroll-top-btn {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-scroll-top-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(239, 68, 68, 0.35) !important;
}

.footer-credit-group {
  display: flex;
  align-items: center;
  gap: 14px;
}


@media (max-width: 1200px) {
  .footer-grid-wrapper {
    grid-template-columns: 1.3fr 1fr 1fr !important;
  }
  .footer-col-brand {
    grid-column: span 3;
    margin-bottom: 10px;
  }
  .footer-contact-row {
    max-width: 100% !important;
    flex-direction: row !important;
  }
  .footer-contact-row .footer-glass-card {
    flex: 1;
  }
}

@media (max-width: 850px) {
  .footer-grid-wrapper {
    grid-template-columns: 1fr 1fr !important;
    gap: 30px !important;
  }
  .footer-col-brand {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .bottom-layout-row {
    flex-direction: column-reverse !important;
    justify-content: center !important;
    text-align: center !important;
    gap: 24px !important;
  }
  .footer-bottom-right-row {
    justify-content: center !important;
    width: 100%;
  }
}

@media (max-width: 550px) {
  footer {
    padding: 60px 24px 25px !important;
  }
  
  .footer-grid-wrapper {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
  }
  
  .footer-col-brand {
    grid-column: span 1;
    align-items: center !important;
    text-align: center !important;
  }
  
  .footer-logo-container {
    flex-direction: column !important;
    gap: 12px !important;
  }
  
  .footer-logo-text-box {
    text-align: center !important;
  }
  
  .footer-brand-desc {
    text-align: center !important;
    margin-bottom: 20px !important;
  }
  
  .footer-contact-row {
    flex-direction: column !important;
    width: 100% !important;
  }
  
  .footer-col-links {
    align-items: center !important;
    text-align: center !important;
  }
  
  .footer-links-box {
    align-items: center !important;
    width: 100%;
  }
  
  .footer-custom-link {
    justify-content: center !important;
    width: 100%;
    max-width: 280px;
  }
  
  .footer-custom-link .chevron-icon {
    display: none !important; 
  }
  
  .footer-custom-link:not(.non-clickable):hover {
    padding-left: 12px !important; 
  }
  
  .footer-bottom-right-row {
    flex-direction: column !important;
    gap: 16px !important;
  }
  
  .footer-credit-group {
    flex-direction: column !important;
    gap: 8px !important;
  }
  
  .footer-copyright-text {
    font-size: 0.82rem !important;
    line-height: 1.5;
  }
}
`;

export default Footer;
