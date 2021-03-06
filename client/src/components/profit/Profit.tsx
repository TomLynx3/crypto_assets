import { observer } from "mobx-react-lite";

import styles from "./profit.module.scss";
import { addCryptoStore } from "../../stores/addcrypto.store";
import Loading from "../loading/Loading";
import { Fragment } from "react";
const Profit = observer(() => {
  const refresh = () => {
    addCryptoStore.getProfit();
  };

  return (
    <Fragment>
      {addCryptoStore.isLoading ? <Loading></Loading> : null}
      <div className={styles.wrapper}>
        <div className={styles.profitContainer}>
          <div className={styles.refresh} onClick={refresh}>
            <i className="fas fa-sync"></i>
          </div>
          <div className="div">
            <i
              className={`fas fa-euro-sign ${
                addCryptoStore.totalProfit < 0 ? "error-color" : "success-color"
              }`}
            ></i>
            <span
              className={`${
                addCryptoStore.totalProfit < 0 ? "error-color" : "success-color"
              }`}
            >
              {addCryptoStore.totalProfit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default Profit;
