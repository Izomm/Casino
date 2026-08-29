import React, { useState, useRef, useEffect } from "react";
import styles from "./scss/Rewards.module.scss";
import clsx from "clsx";

interface RewardsProps {
  anything?: string;
  className?: string;
}

export const Reward: React.FC<RewardsProps> = ({ className }) => {
  const [selectedGame, setSelectedGame] = useState("");

  return (
    <>
      <div className={styles.outermost_div}>
        <div className={styles.outer_div}>
          <h3>
            Try Jackpot now <span className={styles.Go}>Go</span>
          </h3>
        </div>

        <div className={styles.outer_div}>
          <h3>
            Join the weekly <span className={styles.gold}>Gold</span> Raffle{" "}
            <span className={styles.gold_box}>Join</span>
          </h3>
        </div>

        <div className={clsx(styles.outer_div, styles.fade)}>
          <h3>
            Vubble Airdrop Incoming. Register{" "}
            <span className={styles.unfade}>here</span>
          </h3>
        </div>

        <div className={clsx(styles.outer_div)}>
          <h3>
            <span className={styles.x}>X</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Reward;
