import cx from "classnames";
import * as React from "react";

import styles from "./index.module.scss";

// Feel free to add more colors
const COLOR_TO_CLASS_NAME = {
  ink: styles.colorInk,
  ink80: styles.colorInk80,
  ink50: styles.colorInk50,
  ink30: styles.colorInk30,
  ink10: styles.colorInk10,
  white: styles.colorWhite,
  white80: styles.colorWhite80,
  white50: styles.colorWhite50,
  white30: styles.colorWhite30,
  white10: styles.colorWhite10,
};

type Props = {
  className?: string;
  style?: React.CSSProperties;
  color?: keyof typeof COLOR_TO_CLASS_NAME;
};

export default function Divider$Horizontal$CustomDash({
  className,
  style,
  color = "ink50",
}: Props) {
  return (
    <div
      className={cx(styles.container, className, COLOR_TO_CLASS_NAME[color])}
      style={style}
    >
      <svg width="100%" height="100%" fill="none">
        <line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="currentColor"
          strokeOpacity="100%"
          strokeDasharray="1 4" // 1 dot, 4 spaces, i.e. #____#____#____
        />
      </svg>
    </div>
  );
}
