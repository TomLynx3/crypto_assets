import { NotificationType } from "../enums/global.enums";

export interface FormItem {
  value: number | string;
  error: string;
}

export interface BaseRequest {
  data: {};
  url: string;
}

export interface BaseGetReq {
  url: string;
}

export interface BaseResponse {
  success: boolean;
  result: any;
  errorMsg: string | null;
}

export interface AuthResponse extends BaseResponse {
  result: string;
}

export interface ProfitResponse extends BaseResponse {
  result: { fiat_total: number; crypto_to_eur: number };
}

export interface IHttpService {
  baseHttpPost(req: BaseRequest): any;
  baseHttpGet(req: BaseGetReq): any;
  httpPost(req: BaseRequest): any;
}

export interface NotifactionOptions {
  title: string;
  message: string | null;
  type: NotificationType;
}

export interface INotificationService {
  showNotifaction(options: NotifactionOptions): void;
}

export interface AddCryptoReq {
  symbol: string;
  amount: number;
  fiat_amount: number;
}

export interface GetAssetItemsReq extends BaseResponse {
  result: AssetItem[];
}

export interface AssetItem {
  full_name: string;
  symbol: string;
  amount: number;
  fiat_amount_invested: number;
  current_rate: number;
  total: number;
  profit: number;
  profit_ratio: number;
}
