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
  FaEnvelope,
  FaPhoneAlt,
  FaHome,
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
          {isSuccess ? "Success" : "Notification"}
        </strong>
        <p style={toastStyles.message}>{message}</p>
      </div>
      <button onClick={onClose} style={toastStyles.closeBtn}>
        <FaTimes />
      </button>
    </div>
  );
};

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleHomeNavigation = () => {
    window.location.href = "/";
  };

  const sortTicketsByPriority = (ticketArray) => {
    if (!Array.isArray(ticketArray)) return [];

    return [...ticketArray].sort((a, b) => {
      const statusOrder = { Pending: 1, "In Progress": 2, Resolved: 3 };
      const orderA = statusOrder[a.status] || 4;
      const orderB = statusOrder[b.status] || 4;
      return orderA - orderB;
    });
  };

  const fetchAllTickets = async () => {
    try {
      setIsLoading(true);
      const cleanBaseUrl = API_URL.replace(/\/+$/, "");

      const response = await fetch(`${cleanBaseUrl}/tickets/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        let rawTickets = [];
        if (data && Array.isArray(data.tickets)) {
          rawTickets = data.tickets;
        } else if (Array.isArray(data)) {
          rawTickets = data;
        }
        setTickets(sortTicketsByPriority(rawTickets));
      } else {
        triggerToast("Failed to load incoming support tickets.", "error");
      }
    } catch (error) {
      console.error("Dashboard fetching engine failure:", error);
      triggerToast("Connection failed. Support server is offline.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const targetTicket = tickets.find((t) => t.id === id);
    if (!targetTicket) return;

    const payload = {
      user_id: Number(targetTicket.user_id || 1),
      full_name: targetTicket.full_name || targetTicket.user || "Client User",
      issue_type:
        targetTicket.issue_type || targetTicket.type || "Network Issue",
      subject: targetTicket.subject || targetTicket.issue || "Support Request",
      description: targetTicket.description || "No description provided",
      email: targetTicket.email || "info@example.com",
      phone: targetTicket.phone || "0000000000",
      status: String(newStatus),
    };

    try {
      const cleanBaseUrl = API_URL.replace(/\/+$/, "");

      const response = await fetch(`${cleanBaseUrl}/tickets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setTickets((prevTickets) => {
          const updated = prevTickets.map((ticket) =>
            ticket.id === id ? { ...ticket, status: newStatus } : ticket
          );
          return sortTicketsByPriority(updated);
        });
        triggerToast(
          `Ticket #${id} updated to ${newStatus} successfully!`,
          "success"
        );
      } else {
        triggerToast("Server rejected status update.", "error");
      }
    } catch (error) {
      console.error("Status lifecycle modification failure:", error);
      triggerToast(
        "Network error. Unable to sync status with server.",
        "error"
      );
    }
  };

  const totalTickets = tickets.length;
  const pendingCount = tickets.filter(
    (t) =>
      (t.status || "").trim() === "Pending" ||
      (t.status || "").trim() === "In Progress"
  ).length;
  const resolvedCount = tickets.filter(
    (t) => (t.status || "").trim() === "Resolved"
  ).length;

  const filteredTickets = tickets.filter((ticket) => {
    const searchString = search.toLowerCase();
    const ticketIssue = (ticket.issue || ticket.subject || "").toLowerCase();
    const ticketUser = (ticket.user || ticket.full_name || "").toLowerCase();
    const ticketEmail = (ticket.email || "").toLowerCase();
    const ticketPhone = (ticket.phone || "").toLowerCase();
    const ticketIdStr = (ticket.id || "").toString();

    const matchesSearch =
      ticketIssue.includes(searchString) ||
      ticketUser.includes(searchString) ||
      ticketEmail.includes(searchString) ||
      ticketPhone.includes(searchString) ||
      ticketIdStr.includes(searchString);

    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Resolved":
        return "status-resolved";
      case "Pending":
        return "status-pending";
      default:
        return "status-progress";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Network Issue":
      case "Network":
        return "#3b82f6";
      case "Recharge Problem":
      case "Recharge":
        return "#ec4899";
      case "SIM Issue":
      case "SIM":
        return "#8b5cf6";
      default:
        return "#06b6d4";
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
          <div className="hero-center-panel">
            <div className="header-badge-row">
              <div className="premium-badge">
                <FaUserShield className="badge-icon" />
                Admin Control Center
              </div>

              <button
                onClick={handleHomeNavigation}
                className="home-nav-btn"
                title="Go to Home"
              >
                <FaHome className="home-icon" />
                <span>Home</span>
              </button>
            </div>

            <h1 style={styles.heading} className="dashboard-title">
              Support Dashboard & <br />
              Ticket Management
            </h1>

            <p style={styles.description}>
              Review incoming service logs, troubleshoot client connections, and
              update support ticket resolution statuses in real-time.
            </p>
          </div>
        </section>

        <section style={styles.metricsSection}>
          <div className="metrics-grid">
            <div className="metric-box total">
              <div className="metric-icon-wrap">
                <FaClipboardList />
              </div>
              <div>
                <span className="metric-title">Total Tickets</span>
                <h2 className="metric-number">{totalTickets}</h2>
              </div>
            </div>

            <div className="metric-box pending">
              <div className="metric-icon-wrap">
                <FaExclamationCircle />
              </div>
              <div>
                <span className="metric-title">Active</span>
                <h2 className="metric-number">{pendingCount}</h2>
              </div>
            </div>

            <div className="metric-box resolved">
              <div className="metric-icon-wrap">
                <FaCheckCircle />
              </div>
              <div>
                <span className="metric-title">Resolved Cases</span>
                <h2 className="metric-number">{resolvedCount}</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="controls-layout-wrapper">
          <div className="search-bar-container">
            <FaSearch className="input-embed-icon" />
            <input
              type="text"
              placeholder="Search by issue description, ID, name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dashboard-search-input"
            />
          </div>

          <div className="filter-select-container">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="dashboard-filter-dropdown"
            >
              <option value="All">All Tickets</option>
              <option value="Pending">Pending Validation</option>
              <option value="In Progress">Under Investigation</option>
              <option value="Resolved">Resolved & Closed</option>
            </select>
          </div>
        </section>

        <section style={styles.ticketSection}>
          {isLoading ? (
            <div style={styles.messageState}>
              <div style={styles.spinner}></div>
              <p
                style={{
                  marginTop: "20px",
                  color: "#64748b",
                  fontWeight: "700",
                }}
              >
                Loading support logs...
              </p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="empty-state-fallback">
              <div className="empty-state-radar">
                <FaLayerGroup />
              </div>
              <h3>No match found.</h3>
              <p>
                Try refining your search keyword filters or switch category
                views.
              </p>
            </div>
          ) : (
            <div className="dashboard-matrix-grid">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`ultra-ticket-card ${getStatusClass(
                    ticket.status
                  )}`}
                >
                  <div className="card-top-row">
                    <div className="card-identity-block">
                      <div
                        style={styles.headsetIconBg}
                        className="headset-icon-bg"
                      >
                        <FaHeadset />
                      </div>
                      <div>
                        <span className="tracking-id-tag">
                          Ticket ID: #{ticket.id}
                        </span>
                        <span
                          className="category-pill"
                          style={{
                            "--pill-color": getTypeColor(
                              ticket.issue_type || ticket.type
                            ),
                          }}
                        >
                          {ticket.issue_type || ticket.type || "General"}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        className={`state-indicator-badge ${getStatusClass(
                          ticket.status
                        )}`}
                      >
                        {ticket.status || "Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="client-meta-profile">
                    <div
                      style={styles.avatarPlaceholder}
                      className="avatar-placeholder"
                    >
                      <FaUserAlt />
                    </div>
                    <div>
                      <p className="client-meta-label">Customer Name</p>
                      <h4 className="client-meta-name">
                        {ticket.full_name || ticket.user || "Unknown Customer"}
                      </h4>
                    </div>
                  </div>

                  <h3 className="ticket-main-headline">
                    {ticket.subject || ticket.issue || "No Subject Given"}
                  </h3>
                  <p
                    style={{
                      color: "#475569",
                      fontSize: "0.92rem",
                      marginBottom: "20px",
                      lineHeight: "1.5",
                    }}
                  >
                    {ticket.description}
                  </p>

                  <div style={styles.detailsGrid}>
                    <div style={styles.detailsItem}>
                      <FaEnvelope style={styles.detailsIcon} />
                      <span style={styles.detailsText}>
                        {ticket.email || "No Email"}
                      </span>
                    </div>
                    <div style={styles.detailsItem}>
                      <FaPhoneAlt style={styles.detailsIcon} />
                      <span style={styles.detailsText}>
                        {ticket.phone || "No Phone"}
                      </span>
                    </div>
                  </div>

                  <div
                    className="ticket-timeline-anchor"
                    style={styles.timelineContainer}
                  >
                    <div style={styles.timelineItem}>
                      <FaCalendarAlt className="timeline-icon" />
                      <span>
                        Created:{" "}
                        <strong>
                          {ticket.created_at
                            ? new Date(ticket.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "N/A"}
                        </strong>
                      </span>
                    </div>
                    <div style={styles.timelineItem}>
                      <FaClock className="timeline-icon" />
                      <span>
                        Updated:{" "}
                        <strong>
                          {ticket.updated_at
                            ? new Date(ticket.updated_at).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "N/A"}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div className="card-action-divider"></div>

                  <div className="control-manipulation-area">
                    <div className="manipulation-meta">
                      <FaExchangeAlt />
                      <span>Change Status</span>
                    </div>

                    <select
                      value={ticket.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(ticket.id, e.target.value)
                      }
                      className="internal-state-selector"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
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
    background:
      "linear-gradient(135deg, #f8fafc 0%, #fff1f2 50%, #f8fafc 100%)",
    paddingTop: "130px",
    color: "#0f172a",
  },
  blurOne: {
    position: "absolute",
    top: "-50px",
    left: "-50px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(239, 68, 68, 0.06)",
    filter: "blur(120px)",
    pointerEvents: "none",
  },
  blurTwo: {
    position: "absolute",
    bottom: "-50px",
    right: "-50px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(244, 63, 94, 0.04)",
    filter: "blur(120px)",
    pointerEvents: "none",
  },
  heroSection: {
    padding: "30px 6% 10px",
    position: "relative",
    zIndex: 2,
  },
  heading: {
    fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
    fontWeight: "900",
    lineHeight: "1.15",
    color: "#0f172a",
    letterSpacing: "-1.5px",
    margin: 0,
  },
  description: {
    color: "#475569",
    fontSize: "1.02rem",
    lineHeight: "1.75",
    maxWidth: "680px",
    marginTop: "16px",
    fontWeight: "500",
  },
  metricsSection: {
    padding: "20px 6%",
    position: "relative",
    zIndex: 3,
  },
  ticketSection: {
    position: "relative",
    zIndex: 2,
    padding: "20px 6% 100px",
  },
  headsetIconBg: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#475569",
    fontSize: "1.1rem",
  },
  avatarPlaceholder: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ef4444",
    fontSize: "0.85rem",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
    background: "#f8fafc",
    padding: "12px 16px",
    borderRadius: "16px",
    marginBottom: "16px",
    border: "1px solid #f1f5f9",
  },
  detailsItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  detailsIcon: {
    color: "#ef4444",
    fontSize: "1rem",
    flexShrink: 0,
  },
  detailsText: {
    fontSize: "0.88rem",
    color: "#334155",
    fontWeight: "500",
  },
  timelineContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
  },
  timelineItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#64748b",
    fontSize: "0.85rem",
  },
  messageState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "80px 20px",
    background: "rgba(255,255,255,0.5)",
    borderRadius: "24px",
    border: "1px dashed rgba(239,68,68,0.15)",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(239, 68, 68, 0.1)",
    borderTopColor: "#dc2626",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

const responsiveStyles = `
@keyframes spin {
  to { transform: rotate(360deg); }
}

.header-badge-row {
  display: flex;
  align-items: center;
  justifyContent: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.premium-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
}

.home-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
  transition: all 0.2s ease-in-out;
}

.home-nav-btn:hover {
  background: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
}

.badge-icon, .home-icon {
  font-size: 1rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  width: 100%;
}

.dashboard-matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 32px;
}

.metric-box {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid #f1f5f9;
  border-radius: 24px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.02);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.metric-box:hover {
  transform: translateY(-4px);
}

/* Perfect centering implementation for icons inside square boundaries */
.metric-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.metric-box.total .metric-icon-wrap { background: #f1f5f9; color: #475569; }
.metric-box.pending .metric-icon-wrap { background: #fef2f2; color: #dc2626; }
.metric-box.resolved .metric-icon-wrap { background: #f0fdf4; color: #16a34a; }

.metric-title {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-number {
  font-size: 2rem;
  font-weight: 900;
  color: #0f172a;
  margin: 2px 0 0 0;
  line-height: 1;
}

.controls-layout-wrapper {
  padding: 20px 6%;
  display: flex;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

.search-bar-container {
  position: relative;
  flex: 1;
}

.input-embed-icon {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1rem;
}

.dashboard-search-input {
  width: 100%;
  height: 60px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.85);
  padding: 0 20px 0 54px;
  color: #0f172a;
  outline: none;
  font-size: 0.96rem;
  font-weight: 600;
  box-sizing: border-box;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.01);
  transition: all 0.25s ease;
}

.dashboard-filter-dropdown {
  height: 60px;
  min-width: 240px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.85);
  padding: 0 24px;
  color: #0f172a;
  outline: none;
  font-size: 0.96rem;
  font-weight: 700;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.01);
}

.dashboard-search-input:focus, .dashboard-filter-dropdown:focus {
  border-color: #ef4444;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.08);
}

.ultra-ticket-card {
  background: #ffffff;
  border-radius: 30px;
  padding: 32px;
  box-sizing: border-box;
  position: relative;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 35px rgba(15, 23, 42, 0.02);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.ultra-ticket-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
}

.ultra-ticket-card.status-pending::after { background: #ef4444; }
.ultra-ticket-card.status-progress::after { background: #f59e0b; }
.ultra-ticket-card.status-resolved::after { background: #10b981; }

.ultra-ticket-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.07);
  border-color: #cbd5e1;
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 12px;
}

.card-identity-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tracking-id-tag {
  display: block;
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
}

.category-pill {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--pill-color);
  background: rgba(255, 255, 255, 1);
  border: 1px solid var(--pill-color);
  padding: 1px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  margin-top: 2px;
  letter-spacing: 0.3px;
}

.state-indicator-badge {
  font-size: 0.82rem;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 10px;
}

.state-indicator-badge.status-pending { background: #fef2f2; color: #dc2626; }
.state-indicator-badge.status-progress { background: #fffbeb; color: #b45309; }
.state-indicator-badge.status-resolved { background: #f0fdf4; color: #15803d; }

.client-meta-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  padding: 12px 16px;
  border-radius: 16px;
  margin-bottom: 20px;
}

.client-meta-label {
  margin: 0;
  font-size: 0.68rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.client-meta-name {
  margin: 1px 0 0 0;
  font-size: 0.95rem;
  font-weight: 800;
  color: #1e293b;
}

.ticket-main-headline {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.35;
  margin: 0 0 10px 0;
}

.timeline-icon {
  color: #94a3b8;
}

.card-action-divider {
  width: 100%;
  height: 1px;
  border-top: 1px dashed #e2e8f0;
  margin-bottom: 18px;
}

.control-manipulation-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.manipulation-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.internal-state-selector {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  padding: 0 16px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e293b;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.internal-state-selector:focus {
  border-color: #ef4444;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08);
}

.empty-state-fallback {
  text-align: center;
  padding: 80px 20px;
  color: #64748b;
}

.empty-state-radar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f1f5f9;
  display: inline-flex;
  align-items: center;
  justifyContent: center;
  font-size: 2.2rem;
  color: #94a3b8;
  margin-bottom: 20px;
}

.empty-state-fallback h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 6px;
}

@keyframes toastSlideIn {
  from { opacity: 0; transform: translateY(-40px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media(max-width: 1024px) {
  .dashboard-matrix-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
    gap: 24px !important;
  }
}

@media(max-width: 768px) {
  .controls-layout-wrapper {
    flex-direction: column !important;
    gap: 12px !important;
    padding: 10px 6% !important;
  }
  
  .dashboard-filter-dropdown {
    width: 100% !important;
  }
  
  div[style*="position: fixed; top: 24px"] {
    right: 12px !important;
    left: 12px !important;
    top: 16px !important;
    width: calc(100% - 24px) !important;
  }
}

@media(max-width: 480px) {
  .hero-center-panel {
    text-align: center !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
  
  .header-badge-row {
    justify-content: center !important;
  }

  .ultra-ticket-card {
    padding: 24px !important;
    border-radius: 24px !important;
  }
  
  .card-top-row {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 14px !important;
  }
  
  .state-indicator-badge {
    align-self: flex-start !important;
  }
  
  .dashboard-matrix-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

export default AdminDashboard;
