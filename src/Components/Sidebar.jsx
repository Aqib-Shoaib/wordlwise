import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      {/* outlet is somewhat like children prop */}
      <footer className={styles.footer}>
        <span className={styles.copyright}>
          &copy; copyright by Lord Aqib {new Date().getFullYear()} as Practice
          Project
        </span>
      </footer>
    </div>
  );
}

export default Sidebar;
