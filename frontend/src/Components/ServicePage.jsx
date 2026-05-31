import React, { useState } from "react";
import {
  FaWifi,
  FaMobileAlt,
  FaShieldAlt,
  FaHeadset,
  FaPhoneAlt,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaWifi />,
    title: "Network Support",
    description:
      "Get instant help for slow internet, network outages, and connectivity issues anytime.",
  },
  {
    id: 2,
    icon: <FaMobileAlt />,
    title: "Recharge Services",
    description:
      "Manage prepaid plans, recharge offers, and telecom subscriptions smoothly.",
  },
  {
    id: 3,
    icon: <FaShieldAlt />,
    title: "Secure Account Support",
    description:
      "Keep your telecom account protected with secure authentication and assistance.",
  },
  {
    id: 4,
    icon: <FaHeadset />,
    title: "24/7 Customer Support",
    description:
      "Dedicated support agents available around the clock for quick issue resolution.",
  },
  {
    id: 5,
    icon: <FaPhoneAlt />,
    title: "Call & SIM Assistance",
    description:
      "Resolve SIM activation, calling issues, and telecom-related service problems easily.",
  },
  {
    id: 6,
    icon: <FaGlobe />,
    title: "Broadband Services",
    description:
      "Get reliable broadband support, troubleshooting, and service guidance.",
  },
];

const ServicePage = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{responsiveStyles}</style>

      <div style={styles.container}>
        <div style={styles.blurOne} className="ambient-blob-1"></div>
        <div style={styles.blurTwo} className="ambient-blob-2"></div>

        <section style={styles.heroSection}>
          <div className="hero-center animate-fade-in">
            <div style={styles.badge} className="pulse-badge">
              <FaHeadset style={{ marginRight: "4px" }} />
              Telecom Customer Services
            </div>

            <h1 style={styles.heading} className="hero-headline">
              Reliable Telecom <br />
              <span className="text-gradient">Support Services</span>
            </h1>

            <p style={styles.description}>
              Explore modern telecom support solutions designed to help
              customers manage services, solve connectivity issues, and receive
              seamless support experiences.
            </p>
          </div>
        </section>

        <section style={styles.servicesSection}>
          <div style={styles.grid}>
            {services.map((service) => (
              <div
                key={service.id}
                style={{
                  ...styles.card,
                  transform:
                    hovered === service.id
                      ? "translateY(-8px)"
                      : "translateY(0px)",
                  border:
                    hovered === service.id
                      ? "1px solid rgba(239,68,68,0.22)"
                      : "1px solid rgba(255,255,255,0.5)",
                  boxShadow:
                    hovered === service.id
                      ? "0 20px 40px rgba(239,68,68,0.08)"
                      : "0 10px 30px rgba(0,0,0,0.02)",
                }}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                className="service-card"
              >
                <div style={styles.iconWrapper} className="icon-wrapper">
                  <div style={styles.iconBox} className="service-icon-box">
                    {service.icon}
                  </div>
                </div>

                <h2 style={styles.cardTitle}>{service.title}</h2>
                <p style={styles.cardText}>{service.description}</p>

                <div style={styles.featureWrapper} className="feature-wrapper">
                  <div style={styles.feature} className="feature-tag">
                    <FaCheckCircle style={styles.checkIcon} />
                    <span>Fast Response</span>
                  </div>

                  <div style={styles.feature} className="feature-tag">
                    <FaCheckCircle style={styles.checkIcon} />
                    <span>Customer Friendly</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #ffffff 0%, #fff6f6 45%, #ffffff 100%)",
    paddingTop: "120px",
    color: "#111827",
  },
  blurOne: {
    position: "absolute",
    top: "-80px",
    left: "-60px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(239,68,68,0.10) 0%, rgba(255,255,255,0) 70%)",
    filter: "blur(60px)",
    pointerEvents: "none",
  },
  blurTwo: {
    position: "absolute",
    bottom: "-80px",
    right: "-60px",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(248,113,113,0.08) 0%, rgba(255,255,255,0) 70%)",
    filter: "blur(70px)",
    pointerEvents: "none",
  },
  heroSection: {
    padding: "40px 8% 10px",
    position: "relative",
    zIndex: 2,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
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
    maxWidth: "680px",
  },
  servicesSection: {
    position: "relative",
    zIndex: 2,
    padding: "40px 8% 120px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
    gap: "32px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.65)",
    borderRadius: "32px",
    padding: "38px",
    backdropFilter: "blur(20px)",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "28px",
  },
  iconBox: {
    width: "72px",
    height: "72px",
    borderRadius: "22px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.75rem",
    color: "white",
    boxShadow: "0 10px 25px rgba(239,68,68,0.20)",
    transition: "all 0.3s ease",
  },
  cardTitle: {
    fontSize: "1.45rem",
    marginBottom: "14px",
    fontWeight: "800",
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  cardText: {
    color: "#4b5563",
    lineHeight: "1.75",
    marginBottom: "32px",
    fontSize: "0.96rem",
  },
  featureWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    borderTop: "1px solid rgba(0, 0, 0, 0.04)",
    paddingTop: "20px",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#374151",
    fontSize: "0.92rem",
    fontWeight: "600",
  },
  checkIcon: {
    color: "#16a34a",
    fontSize: "1.05rem",
    flexShrink: 0,
  },
};

const responsiveStyles = `
.text-gradient {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.service-card:hover .service-icon-box {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%) !important;
  transform: scale(1.04);
  box-shadow: 0 12px 30px rgba(185,28,28,0.3) !important;
}

@keyframes driftBlob {
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.05); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.ambient-blob-1 { animation: driftBlob 10s ease-in-out infinite; }
.ambient-blob-2 { animation: driftBlob 12s ease-in-out infinite alternate; }

@media(max-width:992px){
  .hero-center{
    text-align:center !important;
    display:flex !important;
    flex-direction:column !important;
    align-items:center !important;
  }
}

@media(max-width:768px){
  .service-card {
    text-align:center !important;
    padding: 38px 28px !important;
  }

  .service-card .icon-wrapper {
    justify-content:center !important;
  }

  .service-card .feature-wrapper {
    align-items:center !important;
  }
  
  .service-card .feature-tag {
    justify-content:center !important;
    width:100%;
  }
}

@media(max-width:500px){
  section {
    padding-left:6% !important;
    padding-right:6% !important;
  }

  .service-card {
    padding:32px 20px !important;
    border-radius:26px !important;
  }
}
`;

export default ServicePage;
