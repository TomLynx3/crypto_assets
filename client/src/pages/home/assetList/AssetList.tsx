import { observer } from "mobx-react";
import { useEffect } from "react";
import { Fragment } from "react";
import AssetItemView from "../../../components/assetItem/AssetItemView";
import Loading from "../../../components/loading/Loading";
import { AssetItem } from "../../../helpers/interfaces/global.interfaces";
import { assetItemsStore } from "../../../stores/assetitems.store";
import styles from "./assetlist.module.scss";

const AssetList = observer(() => {
  useEffect(() => {
    assetItemsStore.getAssetItems();
    const interval = setInterval(() => {
      assetItemsStore.getAssetItems();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <div className={`${styles.wrapper} card`}>
        {assetItemsStore.assetItems.length <= 0 ? (
          <Loading></Loading>
        ) : (
          assetItemsStore.assetItems.map((assetItem, index) => {
            return <AssetItemView item={assetItem} key={index}></AssetItemView>;
          })
        )}
      </div>
    </Fragment>
  );
});

export default AssetList;
