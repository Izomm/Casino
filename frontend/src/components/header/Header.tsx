import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./scss/Header.module.scss";
import bubblestyles from "./scss/Bubble.module.scss";
import React, { useState } from "react";
import "./Glassdropdown";

import { Reward } from "./rewards";

import { VubbleImage } from "./vubble";
import { Bubble } from "./bubble";
import GlassDropdown, { Glassdropdown } from "./Glassdropdown";
import clsx from "clsx";

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
  const [selectedGame, setSelectedGame] = useState("");
  const gameOptions = [
    { label: "Blackjack", value: "blackjack" },
    { label: "Roulette", value: "roulette" },
    { label: "Submarine", value: "holdem" },
    { label: "Baccarat", value: "baccarat", disabled: true },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.vubble_box_div}>
          <VubbleImage />
          <div className={bubblestyles.bubbles_div}>
            <Bubble className={clsx(bubblestyles.margin, bubblestyles.size1)} />
            <Bubble className={clsx(bubblestyles.margin, bubblestyles.size2)} />
          </div>

          <Glassdropdown
            label="label"
            placeholder="Games"
            options={gameOptions}
            value="holdem"
            onChange={setSelectedGame}
          />
        </div>

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
              Connect
            </Link>
          )}
        </div>
      </div>
      <Reward />
    </header>
  );
}

export default Header;
