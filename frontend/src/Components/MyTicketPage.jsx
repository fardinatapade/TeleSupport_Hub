import React, { useState, useEffect } from "react";
import {
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaSearch,
  FaHeadset,
} from "react-icons/fa";
import { API_URL } from "../config";

const MyTicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchUserTickets = async () => {
      const storedUser = localStorage.getItem("teleSupportUser");

      if (!storedUser) {
        setErrorMsg(
          "Authentication required. Please log in to view your tickets."
        );
        setIsLoading(false);
        return;
      }

      let userId = null;
      try {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser.id || parsedUser.userId || parsedUser.user_id;
      } catch (err) {
        console.error("Failed to parse storage profile data session:", err);
      }

      if (!userId) {
        setErrorMsg("Invalid user session. Please sign out and log back in.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_URL}/tickets/?user_id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();

          let backendTickets = [];
          if (data && data.success && Array.isArray(data.tickets)) {
            backendTickets = data.tickets;
          } else if (Array.isArray(data)) {
            backendTickets = data;
          }

          const myIsolatedTickets = backendTickets.filter(
            (ticket) => Number(ticket.user_id) === Number(userId)
          );

          setTickets(myIsolatedTickets);
        } else {
          setErrorMsg(
            "Failed to retrieve your support records. Please try again later."
          );
        }
      } catch (error) {
        console.error("Fetch tickets secure routing error:", error);
        setErrorMsg(
          "Network error. Unable to establish a secure database connection."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const searchString = search.toLowerCase();

    const ticketSubject = (ticket.subject || ticket.issue || "").toLowerCase();
    const ticketDesc = (ticket.description || "").toLowerCase();
    const ticketIdStr = (ticket.id || "").toString();

    return (
      ticketSubject.includes(searchString) ||
      ticketDesc.includes(searchString) ||
      ticketIdStr.includes(searchString)
    );
  });

  const getStatusColor = (status) => {
    const currentStatus = status?.trim() || "Pending";
    switch (currentStatus) {
      case "Resolved":
        return "#16a34a";
      case "Pending":
        return "#dc2626";
      case "In Progress":
      default:
        return "#d97706";
    }
  };

  const getStatusIcon = (status) => {
    const currentStatus = status?.trim() || "Pending";
    switch (currentStatus) {
      case "Resolved":
        return <FaCheckCircle style={styles.statusIcon} />;
      case "Pending":
        return <FaExclamationCircle style={styles.statusIcon} />;
      case "In Progress":
      default:
        return <FaClock style={styles.statusIcon} />;
    }
  };

  const getStatusClass = (status) => {
    const currentStatus = status?.trim() || "Pending";
    switch (currentStatus) {
      case "Resolved":
        return "status-resolved";
      case "Pending":
        return "status-pending";
      default:
        return "status-progress";
    }
  };

  return (
    <>
      <style>{responsiveStyles}</style>

      <div style={styles.container}>
        <div style={styles.blurOne}></div>
        <div style={styles.blurTwo}></div>

        <section style={styles.heroSection}>
          <div className="hero-center">
            <div style={styles.badge}>
              <FaTicketAlt />
              Customer Support Tickets
            </div>

            <h1 style={styles.heading}>
              My Support <br /> <span className="text-gradient">Tickets</span>
            </h1>

            <p style={styles.description}>
              Track your telecom support requests, monitor ticket status, and
              stay updated with real-time issue resolution progress.
            </p>
          </div>
        </section>

        {(tickets.length > 0 || search) && (
          <section style={styles.searchSection}>
            <div style={styles.searchWrapper}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by ticket ID, subject, or description parameters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </section>
        )}

        <section style={styles.ticketSection}>
          {isLoading ? (
            <div style={styles.messageState}>
              <div style={styles.spinner}></div>
              <p
                style={{
                  marginTop: "20px",
                  color: "#6b7280",
                  fontWeight: "600",
                }}
              >
                Loading your support records safely...
              </p>
            </div>
          ) : errorMsg ? (
            <div style={styles.messageState}>
              <FaExclamationCircle size={48} color="#ef4444" />
              <p
                style={{
                  marginTop: "16px",
                  color: "#b91c1c",
                  fontWeight: "700",
                }}
              >
                {errorMsg}
              </p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div style={styles.messageState}>
              <FaTicketAlt size={54} color="#fecaca" />
              <h3
                style={{
                  marginTop: "18px",
                  color: "#111827",
                  fontWeight: "800",
                  fontSize: "1.3rem",
                }}
              >
                {search ? "No matches found" : "No active tickets found"}
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  marginTop: "8px",
                  maxWidth: "400px",
                  lineHeight: "1.6",
                }}
              >
                {search
                  ? "We couldn't find any results matching your search parameters. Try adjusting keywords."
                  : "You haven't filed any customer service inquiries under this user session yet."}
              </p>
            </div>
          ) : (
            <div style={styles.grid} className="ticket-page-grid">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  style={styles.card}
                  className={`ticket-card ${getStatusClass(ticket.status)}`}
                >
                  <div style={styles.cardTop}>
                    <div
                      style={styles.ticketIcon}
                      className="card-headset-icon"
                    >
                      <FaHeadset />
                    </div>
                  </div>

                  <h2 style={styles.ticketTitle}>
                    {ticket.subject || "Untitled Support Query"}
                  </h2>

                  <p style={styles.ticketDescText}>
                    {ticket.description ||
                      "No description logs attached to this tracking matrix index reference."}
                  </p>

                  <div style={styles.infoWrapper} className="card-info-layout">
                    <div style={styles.infoBox} className="card-info-item">
                      <span style={styles.infoLabel}>Type</span>
                      <span style={styles.infoValue}>
                        {ticket.issue_type || "General"}
                      </span>
                    </div>

                    <div style={styles.infoBox} className="card-info-item">
                      <span style={styles.infoLabel}>Filed Date</span>
                      <span style={styles.infoValue}>
                        {ticket.created_at
                          ? new Date(ticket.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Recent"}
                      </span>
                    </div>

                    <div
                      style={{ ...styles.infoBox, ...styles.centerInfoBox }}
                      className="card-info-item status-full-width"
                    >
                      <span style={styles.infoLabel}>Ticket Status</span>
                      <span
                        style={{
                          ...styles.infoValue,
                          color: getStatusColor(ticket.status),
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          width: "100%",
                        }}
                      >
                        {getStatusIcon(ticket.status)}
                        {ticket.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
      "linear-gradient(135deg, #fdf8f8 0%, #fff5f5 50%, #ffffff 100%)",
    paddingTop: "120px",
    color: "#111827",
  },
  blurOne: {
    position: "absolute",
    top: "-120px",
    left: "-80px",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(239,68,68,0.14)",
    filter: "blur(110px)",
    pointerEvents: "none",
  },
  blurTwo: {
    position: "absolute",
    bottom: "-120px",
    right: "-80px",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(248,113,113,0.08)",
    filter: "blur(110px)",
    pointerEvents: "none",
  },
  heroSection: {
    padding: "40px 8% 20px",
    position: "relative",
    zIndex: 2,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
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
    marginBottom: "22px",
    letterSpacing: "-1.5px",
    color: "#111827",
  },
  description: {
    color: "#4b5563",
    fontSize: "1.08rem",
    lineHeight: "1.85",
    maxWidth: "720px",
  },
  searchSection: {
    padding: "20px 8%",
    position: "relative",
    zIndex: 2,
  },
  searchWrapper: {
    position: "relative",
    maxWidth: "500px",
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: "18px",
    transform: "translateY(-50%)",
    color: "#94a3b8",
  },
  searchInput: {
    width: "100%",
    height: "58px",
    borderRadius: "18px",
    border: "1px solid #e2e8f0",
    background: "rgba(255,255,255,0.85)",
    padding: "0 18px 0 50px",
    color: "#111827",
    outline: "none",
    fontSize: "0.96rem",
    boxSizing: "border-box",
    backdropFilter: "blur(12px)",
    transition: "all 0.2s ease",
  },
  ticketSection: {
    position: "relative",
    zIndex: 2,
    padding: "40px 8% 120px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "32px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "30px",
    padding: "36px",
    border: "1px solid #e2e8f0",
    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: "0 10px 30px rgba(15,23,42,0.02)",
    position: "relative",
    overflow: "hidden",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "26px",
    gap: "15px",
  },
  ticketIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    color: "white",
    boxShadow: "0 10px 20px rgba(239,68,68,0.15)",
  },
  ticketTitle: {
    fontSize: "1.45rem",
    fontWeight: "800",
    marginBottom: "12px",
    color: "#111827",
    lineHeight: "1.35",
    letterSpacing: "-0.5px",
  },
  ticketDescText: {
    color: "#4b5563",
    fontSize: "0.95rem",
    lineHeight: "1.65",
    marginBottom: "28px",
  },
  infoWrapper: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    width: "100%",
  },
  infoBox: {
    flex: 1,
    minWidth: "110px",
    background: "#f8fafc",
    border: "1px solid #f1f5f9",
    padding: "16px 12px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
    boxSizing: "border-box",
  },
  centerInfoBox: {
    alignItems: "center",
    textAlign: "center",
  },
  infoLabel: {
    color: "#94a3b8",
    fontSize: "0.75rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  infoValue: {
    color: "#1e293b",
    fontWeight: "700",
    fontSize: "0.95rem",
    lineHeight: 1.2,
  },
  statusIcon: {
    fontSize: "1rem",
    flexShrink: 0,
  },
  messageState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255,255,255,0.5)",
    borderRadius: "24px",
    border: "1px dashed rgba(239,68,68,0.15)",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(239,68,68,0.1)",
    borderTopColor: "#dc2626",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

const responsiveStyles = `
@keyframes spin {
  to { transform: rotate(360deg); }
}

.text-gradient {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ticket-card:hover {
  transform: translateY(-6px);
  border-color: #cbd5e1 !important;
  box-shadow: 0 20px 40px rgba(15,23,42,0.06) !important;
}

.ticket-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
}
.ticket-card.status-pending::after { background: #ef4444; }
.ticket-card.status-progress::after { background: #f59e0b; }
.ticket-card.status-resolved::after { background: #10b981; }

input:focus {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 4px rgba(239,68,68,0.08) !important;
}

.card-tracking-ref {
  font-size: 0.88rem;
  font-weight: 800;
  color: #475569;
  background: #f1f5f9;
  padding: 6px 14px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

@media(max-width: 992px) {
  .hero-center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media(max-width: 768px) {
  .ticket-page-grid {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }
  .ticket-card {
    text-align: center;
  }
  .card-headset-icon {
    margin: 0 auto !important;
  }
  .ticket-card .card-top {
    justify-content: center !important;
    margin-bottom: 20px !important;
  }
  .card-info-layout {
    flex-direction: row !important;
    justify-content: space-between !important;
  }
  .card-info-item {
    flex: 1 1 calc(50% - 7px) !important;
    width: auto !important;
  }
  .status-full-width {
    flex: 1 1 100% !important;
    width: 100% !important;
  }
}

@media(max-width: 500px) {
  section {
    padding-left: 5% !important;
    padding-right: 5% !important;
  }
  .ticket-card {
    padding: 28px 20px !important;
    border-radius: 24px !important;
  }
  .card-info-layout {
    flex-direction: column !important;
    gap: 10px !important;
  }
  .card-info-item {
    width: 100% !important;
    flex: 1 1 100% !important;
  }
}
`;

export default MyTicketPage;