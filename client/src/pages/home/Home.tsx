import { Fragment } from "react";
import Navigation from "../../components/navigation/Navigation";
import Profit from "../../components/profit/Profit";
import AssetList from "./assetList/AssetList";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <Fragment>
      <div className="main-container">
        <div className={styles.wrapper}>
          <Profit></Profit>
          <AssetList></AssetList>
        </div>
      </div>
      <Navigation></Navigation>
    </Fragment>
  );
};

export default Home;
