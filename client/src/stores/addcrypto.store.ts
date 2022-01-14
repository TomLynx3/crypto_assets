import { action, makeObservable, observable } from "mobx";
import { NotificationType } from "../helpers/enums/global.enums";
import {
  AuthResponse,
  BaseGetReq,
  BaseRequest,
  IHttpService,
  INotificationService,
  ProfitResponse,
} from "../helpers/interfaces/global.interfaces";
import { HttpService } from "../services/httpService";
import { NotificationService } from "../services/notificationService";

class AddCryptoStore {
  constructor(
    private readonly httpService: IHttpService,
    private readonly notificationService: INotificationService
  ) {
    makeObservable(this, {
      isLoading: observable,
      addAsset: action,
      setLoading: action,
      getProfit: action,
      totalProfit: observable,
      setProfit: action,
    });
    this.getProfit();
  }

  public totalProfit = 0;

  public isLoading = false;

  public setLoading(value: boolean) {
    this.isLoading = value;
  }

  public async addAsset(
    symbol: string,
    cryptoAmmount: number,
    fiatAmount: number
  ) {
    this.setLoading(true);
    const req: BaseRequest = {
      data: {
        symbol: symbol,
        amount: cryptoAmmount,
        fiat_amount: fiatAmount,
      },
      url: "/crypto_assets",
    };

    try {
      const res = await this.httpService.httpPost(req);

      const data: AuthResponse = res.data;

      if (data.success) {
        this.notificationService.showNotifaction({
          title: "Success",
          message: " Asset succesfully added",
          type: NotificationType.SUCCESS,
        });
        this.setLoading(false);
        return true;
      } else {
        this.notificationService.showNotifaction({
          title: "Error",
          message: data.errorMsg ?? "",
          type: NotificationType.DANGER,
        });
        this.setLoading(false);
        return false;
      }
    } catch (err) {
      this.notificationService.showNotifaction({
        title: "Error",
        message: "Oops..Something went wrong",
        type: NotificationType.DANGER,
      });
      this.setLoading(false);
      return false;
    }
  }

  public async getProfit() {
    this.setLoading(true);
    try {
      const req: BaseGetReq = { url: "/profit" };
      const res = await this.httpService.baseHttpGet(req);
      const data: ProfitResponse = res.data;
      if (data.success) {
        this.setProfit(data.result.crypto_to_eur - data.result.fiat_total);
      }
    } catch (err) {
      console.log(err);
    }

    this.setLoading(false);
  }

  public setProfit(value: number) {
    this.totalProfit = value;
  }
}

export const addCryptoStore = new AddCryptoStore(
  new HttpService(),
  new NotificationService()
);
