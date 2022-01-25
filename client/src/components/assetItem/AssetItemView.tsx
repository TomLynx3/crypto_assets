import { Fragment } from "react";
import { AssetItem } from "../../helpers/interfaces/global.interfaces";
import styles from "./assetitem.module.scss";
interface IProps {
  item: AssetItem;
}

const AssetItemView = ({ item }: IProps) => {
  return (
    <Fragment>
      <div className={`${styles.wrapper}`}>
        <div className={styles.header}>
          <div className={styles.fullName}>
            <p>{item.full_name}</p>
          </div>
          <div className={styles.badges}>
            <div
              title="Profit"
              className={`${styles.badgeItem} ${styles.profit} ${
                item.profit > 0 ? "bg-success" : "bg-danger"
              }`}
            >
              <i className="fas fa-euro-sign"></i>
              {item.profit.toFixed(2)}
            </div>
            <div
              title="Ratio"
              className={`${styles.badgeItem} ${styles.ratio} ${
                item.profit > 0 ? "bg-success" : "bg-danger"
              }`}
            >
              <i className="fas fa-chart-line"></i>
              {item.profit_ratio.toFixed(2)}
            </div>
          </div>
          <div className={styles.controlPanel}>
            <div
              title="Edit"
              className={`${styles.controlPanelItem} ${styles.edit}  bg-black`}
            >
              <i title="Edit" className="fas fa-edit"></i>
            </div>
            <div
              title="Delete"
              className={`${styles.controlPanelItem} ${styles.delete} bg-danger`}
            >
              <i title="Delete" className="fas fa-trash"></i>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.data}>
            <div className={styles.dataItem}>
              <p className={styles.dataTitle}>Symbol:</p>
              <p>{item.symbol}</p>
            </div>
            <div className={styles.dataItem}>
              <p className={styles.dataTitle}>Amount:</p>
              <p>{item.amount}</p>
            </div>
            <div className={styles.dataItem}>
              <p className={styles.dataTitle}>Invested:</p>
              <div className={styles.moneyItem}>
                <i className="fas fa-euro-sign"></i>
                <p>
                  {item.fiat_amount_invested.toLocaleString("en", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className={styles.dataItem}>
              <p className={styles.dataTitle}>Rate:</p>
              <div className={styles.moneyItem}>
                <i className="fas fa-euro-sign "></i>
                <p>
                  {item.current_rate.toLocaleString("en", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <div className={styles.dataItem}>
              <p className={styles.dataTitle}>Total:</p>
              <div className={styles.moneyItem}>
                <i className="fas fa-euro-sign"></i>
                <p>
                  {item.total.toLocaleString("en", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.currencyIcon}>
            <img
              src={`https://cryptoicon-api.vercel.app/api/icon/${item.symbol?.toLowerCase()}`}
              width={156}
              height={156}
            ></img>
          </div>
        </div>
      </div>
      <div className={styles.mobileView}>
        <div className={styles.mobileHeader}>
          <div className={styles.mobileFullName}>{item.full_name}</div>
          <div className={styles.mobileToolBar}>
            <div
              title="Edit"
              className={`${styles.toolBarItem} ${styles.edit}  bg-black`}
            >
              <i title="Edit" className="fas fa-edit"></i>
            </div>
            <div
              title="Delete"
              className={`${styles.toolBarItem} ${styles.delete} bg-danger`}
            >
              <i title="Delete" className="fas fa-trash"></i>
            </div>
          </div>
        </div>
        <div className={styles.mobileContent}>
          <div className={styles.mobileData}>
            <div className={styles.mobileDataItem}>
              <span className={styles.mobileDataTitle}>Symbol:</span>
              <span>{item.symbol}</span>
            </div>
            <div className={styles.mobileDataItem}>
              <span className={styles.mobileDataTitle}>Amount:</span>
              <span>{item.amount}</span>
            </div>
            <div className={styles.mobileDataItem}>
              <span className={styles.mobileDataTitle}>Invested:</span>
              <div className={styles.mobileMoneyItem}>
                <i className="fas fa-euro-sign"></i>
                <span>
                  {item.fiat_amount_invested.toLocaleString("en", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <div className={styles.mobileDataItem}>
              <div className={styles.mobileDataTitle}>Rate:</div>
              <div className={styles.mobileMoneyItem}>
                <i className="fas fa-euro-sign "></i>
                <span>
                  {item.current_rate.toLocaleString("en", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <div className={styles.mobileDataItem}>
              <span className={styles.mobileDataTitle}>Total:</span>
              <div className={styles.mobileMoneyItem}>
                <i className="fas fa-euro-sign"></i>
                <span>
                  {item.total.toLocaleString("en", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.mobileCryptoLogo}>
            <img
              src={`https://cryptoicon-api.vercel.app/api/icon/${item.symbol?.toLowerCase()}`}
              width={75}
              height={75}
            ></img>
          </div>
        </div>
        <div className={styles.mobileBadges}>
          <div
            title="Profit"
            className={`${styles.mobileBadgeItem} ${styles.profit} ${
              item.profit > 0 ? "bg-success" : "bg-danger"
            }`}
          >
            <i className="fas fa-euro-sign"></i>
            {item.profit.toFixed(2)}
          </div>
          <div
            title="Ratio"
            className={`${styles.mobileBadgeItem} ${styles.ratio} ${
              item.profit > 0 ? "bg-success" : "bg-danger"
            }`}
          >
            <i className="fas fa-chart-line"></i>
            {item.profit_ratio.toFixed(2)}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AssetItemView;
