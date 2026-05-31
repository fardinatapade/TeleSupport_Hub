import React, { useEffect, useState } from "react";
import {
  FaHeadset,
  FaBars,
  FaTimes,
  FaHome,
  FaThLarge,
  FaTicketAlt,
  FaUserShield,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [hovered, setHovered] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);

  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("teleSupportUser");

    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("teleSupportUser");

    setIsLoggedIn(false);

    window.location.href = "/";
  };

  return (
    <>
      <style>{responsiveStyles}</style>

      <div
        className={`backdrop ${menuOpen ? "backdrop-show" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <nav
        style={{
          ...styles.navbar,
          transform: showNavbar ? "translateY(0)" : "translateY(-140%)",
        }}
        className="navbar-main"
      >
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <FaHeadset />
          </div>

          <div>
            <h2 style={styles.logoText}>TeleSupport Hub</h2>

            <p style={styles.logoSubText}>Cloud Telecom Support</p>
          </div>
        </div>

        <ul style={styles.desktopMenu}>
          <li>
            <a
              href="/"
              style={{
                ...styles.link,
                color: hovered === "home" ? "#ef4444" : "#1f2937",
              }}
              onMouseEnter={() => setHovered("home")}
              onMouseLeave={() => setHovered("")}
            >
              <FaHome />
              Home
            </a>
          </li>

          <li>
            <a
              href="/services"
              style={{
                ...styles.link,
                color: hovered === "services" ? "#ef4444" : "#1f2937",
              }}
              onMouseEnter={() => setHovered("services")}
              onMouseLeave={() => setHovered("")}
            >
              <FaThLarge />
              Services
            </a>
          </li>

          <li>
            <a
              href="/raise-ticket"
              style={{
                ...styles.link,
                color: hovered === "ticket" ? "#ef4444" : "#1f2937",
              }}
              onMouseEnter={() => setHovered("ticket")}
              onMouseLeave={() => setHovered("")}
            >
              <FaTicketAlt />
              Raise Ticket
            </a>
          </li>

          <li>
            <a
              href="/my-tickets"
              style={{
                ...styles.link,
                color: hovered === "mytickets" ? "#ef4444" : "#1f2937",
              }}
              onMouseEnter={() => setHovered("mytickets")}
              onMouseLeave={() => setHovered("")}
            >
              <FaClipboardList />
              My Tickets
            </a>
          </li>

          <li>
            <a
              href="/admin"
              style={{
                ...styles.link,
                color: hovered === "admin" ? "#ef4444" : "#1f2937",
              }}
              onMouseEnter={() => setHovered("admin")}
              onMouseLeave={() => setHovered("")}
            >
              <FaUserShield />
              Admin
            </a>
          </li>

          <li>
            {isLoggedIn ? (
              <button style={styles.authBtn} onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <a href="/login" style={styles.authBtn}>
                <FaUserCircle />
                Login
              </a>
            )}
          </li>
        </ul>

        <div
          style={styles.mobileMenuBtn}
          className={`mobile-menu-btn ${menuOpen ? "rotate-btn" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      <div className={`mobile-offcanvas ${menuOpen ? "offcanvas-open" : ""}`}>
        <div style={styles.offcanvasHeader}>
          <div style={styles.mobileLogo}>
            <div style={styles.mobileLogoIcon}>
              <FaHeadset />
            </div>

            <div>
              <h3 style={styles.mobileLogoText}>TeleSupport Hub</h3>

              <p style={styles.mobileLogoSub}>Telecom Support</p>
            </div>
          </div>

          <div style={styles.closeBtn} onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </div>
        </div>

        <div style={styles.mobileLinksWrapper}>
          <a
            href="/"
            style={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            <FaHome />
            Home
          </a>

          <a
            href="/services"
            style={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            <FaThLarge />
            Services
          </a>

          <a
            href="/raise-ticket"
            style={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            <FaTicketAlt />
            Raise Ticket
          </a>

          <a
            href="/my-tickets"
            style={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            <FaClipboardList />
            My Tickets
          </a>

          <a
            href="/admin"
            style={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            <FaUserShield />
            Admin
          </a>

          {isLoggedIn ? (
            <button style={styles.mobileAuthBtn} onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          ) : (
            <a
              href="/login"
              style={styles.mobileAuthBtn}
              onClick={() => setMenuOpen(false)}
            >
              <FaUserCircle />
              Login
            </a>
          )}
        </div>

        <div style={styles.mobileBottom}>
          <p style={styles.bottomText} className="text-center fw-semibold">
            Secure Cloud-Based Telecom Platform
          </p>
        </div>
      </div>
    </>
  );
};

const styles = {
  navbar: {
    width: "calc(100% - 24px)",
    height: "82px",
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(239,68,68,0.10)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 6%",
    position: "fixed",
    top: "12px",
    left: "12px",
    zIndex: 1200,
    boxSizing: "border-box",
    borderRadius: "24px",
    boxShadow: "0 12px 40px rgba(15,23,42,0.10)",
    transition: "all 0.45s ease",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    cursor: "pointer",
  },

  logoIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    background: "linear-gradient(135deg,#b91c1c,#ef4444)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "23px",
    boxShadow: "0 10px 25px rgba(239,68,68,0.25)",
  },

  logoText: {
    color: "#111827",
    fontSize: "1.45rem",
    fontWeight: "800",
    margin: 0,
  },

  logoSubText: {
    color: "#6b7280",
    margin: 0,
    fontSize: "0.76rem",
    marginTop: "3px",
  },

  desktopMenu: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    listStyle: "none",
    margin: 0,
  },

  link: {
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "700",
    transition: "0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },

  authBtn: {
    border: "none",
    textDecoration: "none",
    color: "white",
    padding: "13px 24px",
    borderRadius: "16px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    background: "linear-gradient(135deg,#b91c1c,#ef4444)",
    boxShadow: "0 10px 25px rgba(239,68,68,0.22)",
  },

  mobileMenuBtn: {
    display: "none",
    color: "#111827",
    fontSize: "1.9rem",
    cursor: "pointer",
    zIndex: 1400,
    transition: "0.4s ease",
  },

  offcanvasHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "28px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },

  closeBtn: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    background: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#111827",
    cursor: "pointer",
  },

  mobileLogo: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  mobileLogoIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#b91c1c,#ef4444)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "20px",
  },

  mobileLogoText: {
    margin: 0,
    color: "#111827",
    fontSize: "1.2rem",
    fontWeight: "800",
  },

  mobileLogoSub: {
    margin: 0,
    color: "#6b7280",
    fontSize: "0.78rem",
    marginTop: "4px",
  },

  mobileLinksWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "34px",
  },

  mobileLink: {
    textDecoration: "none",
    color: "#111827",
    fontSize: "1rem",
    fontWeight: "600",
    padding: "17px 16px",
    borderRadius: "18px",
    transition: "0.35s ease",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  mobileAuthBtn: {
    border: "none",
    color: "white",
    fontSize: "1rem",
    fontWeight: "700",
    padding: "18px",
    borderRadius: "18px",
    background: "linear-gradient(135deg,#b91c1c,#ef4444)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginTop: "8px",
    cursor: "pointer",
  },

  mobileBottom: {
    marginTop: "auto",
    paddingTop: "28px",
  },

  bottomText: {
    color: "#6b7280",
    fontSize: "0.9rem",
    lineHeight: "1.7",
  },
};

const responsiveStyles = `

*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

body{
  background:#f8fafc;
  font-family:Inter,sans-serif;
}

.backdrop{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.35);
  backdrop-filter:blur(4px);
  opacity:0;
  visibility:hidden;
  transition:all 0.4s ease;
  z-index:1250;
}

.backdrop-show{
  opacity:1;
  visibility:visible;
}

.mobile-offcanvas{
  position:fixed;
  top:0;
  right:-100%;
  width:340px;
  max-width:88%;
  height:100vh;
  background:#ffffff;
  padding:28px;
  z-index:1300;
  transition:all 0.55s cubic-bezier(0.22,1,0.36,1);
  display:flex;
  flex-direction:column;
  border-left:1px solid #e5e7eb;
  box-shadow:-20px 0 60px rgba(0,0,0,0.18);
}

.offcanvas-open{
  right:0;
}

.rotate-btn{
  transform:rotate(180deg);
}

.mobile-menu-btn:hover{
  transform:scale(1.08);
}

.mobile-offcanvas a:hover{
  transform:translateX(5px);
}

@media(max-width:1100px){

  nav ul{
    display:none !important;
  }

  .mobile-menu-btn{
    display:flex !important;
    align-items:center;
    justify-content:center;
  }

}

@media(max-width:768px){

  .navbar-main{
    padding:0 5% !important;
    height:76px !important;
    width:calc(100% - 20px) !important;
    left:10px !important;
    top:10px !important;
    border-radius:22px !important;
  }

  .mobile-offcanvas{
    width:320px;
  }

}

@media(max-width:500px){

  .navbar-main{
    width:calc(100% - 16px) !important;
    left:8px !important;
    top:8px !important;
    border-radius:20px !important;
    padding:0 5% !important;
  }

  .mobile-offcanvas{
    width:100%;
    max-width:100%;
    border-left:none;
    border-radius:0;
    padding:22px;
  }

}

@media(max-width:420px){

  nav h2{
    font-size:1rem !important;
  }

  nav p{
    font-size:0.66rem !important;
  }

}
`;

export default Navbar;
