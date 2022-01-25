import { action, makeObservable, observable } from "mobx";
import {
  AssetItem,
  BaseGetReq,
  GetAssetItemsReq,
  IHttpService,
  INotificationService,
} from "../helpers/interfaces/global.interfaces";
import { HttpService } from "../services/httpService";
import { NotificationService } from "../services/notificationService";

class AssetItemsStore {
  constructor(
    private readonly httpService: IHttpService,
    private readonly notificationService: INotificationService
  ) {
    makeObservable(this, {
      assetItems: observable,
      isLoading: observable,
      getAssetItems: action,
      setLoading: action,
    });
  }

  public isLoading = false;
  public assetItems: AssetItem[] = [];
  public setLoading(value: boolean) {
    this.isLoading = value;
  }

  public async getAssetItems() {
    this.setLoading(true);
    const req: BaseGetReq = { url: "/get-asset-items" };

    try {
      const res = await this.httpService.baseHttpGet(req);
      this.assetItems = res.data.result;
    } catch (e) {
      console.log(e);
    }

    this.setLoading(false);
    console.log(this.isLoading);
  }
}
export const assetItemsStore = new AssetItemsStore(
  new HttpService(),
  new NotificationService()
);
