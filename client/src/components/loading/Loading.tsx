import styles from "./loading.module.scss";
import Image from "../../assets/ethereum_logo.png";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <img
        src={Image}
        alt="loader"
        width={50}
        height={80}
        className={styles.loader}
      />
      <div className={styles.loadingText}>Loading...</div>
    </div>
  );
};

export default Loading;
