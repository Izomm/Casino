import React, { useState, useRef, useEffect } from "react";
import styles from "./scss/Vubbleimage.module.scss";

interface vubbleImageProps {
  anything?: string;
}

export const VubbleImage: React.FC<vubbleImageProps> = () => {
  const [selectedGame, setSelectedGame] = useState("");

  return (
    <div>
      <img src="/img/1efw 1 copy 2.png" alt="img" />
    </div>
  );
};

export default VubbleImage;
