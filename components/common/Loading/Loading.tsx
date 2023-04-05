import React from "react";
import styles from "./styles.module.scss";

interface Props {
  isLoading: boolean;
}

const Loading: React.FC<Props> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCircle}></div>
    </div>
  );
};

export default Loading;
