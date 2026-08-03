import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./scss/Header.module.scss";

// Adjust this to match your actual store shape (see src/store.ts / types.ts)
interface RootState {
  auth?: {
    isAuthenticated: boolean;
    balance?: number;
    username?: string;
  };
}

export function Header() {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link to="/" className={styles.header__logo}>
          <span className={styles["header__logo-text"]}>Casino</span>
        </Link>

        <nav className={styles.header__nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__link} ${styles["header__link--active"]}`
                : styles.header__link
            }
          >
            Lobby
          </NavLink>
          <NavLink
            to="/games"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__link} ${styles["header__link--active"]}`
                : styles.header__link
            }
          >
            Games
          </NavLink>
        </nav>

        <div className={styles.header__account}>
          {auth?.isAuthenticated ? (
            <>
              <span className={styles.header__balance}>
                ${auth.balance?.toFixed(2) ?? "0.00"}
              </span>
              <span className={styles.header__username}>{auth.username}</span>
            </>
          ) : (
            <Link to="/login" className={styles.header__login}>
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
