import axios from "axios";
import {
  BaseGetReq,
  BaseRequest,
  IHttpService,
} from "../helpers/interfaces/global.interfaces";

export class HttpService implements IHttpService {
  // private baseUrl: string = window.location.origin + "/api";
  private baseUrl: string = "http://localhost:4000/api";
  private token: string | null = window.localStorage.getItem("token");
  private config: any = {
    headers: {
      "x-auth-token": this.token ?? "",
    },
  };
  private axiosInstance: any;
  public constructor() {
    this.setBaseUrl();
  }
  public baseHttpGet(req: BaseGetReq) {
    //this.config.headers["x-auth-token"] = this.getToken();
    console.log(this.axiosInstance);
    return this.axiosInstance.get(req.url, this.config);
  }

  private setBaseUrl(): void {
    if (
      process.env.NODE_ENV === "development" &&
      process.env.REACT_APP_BASE_URL
    ) {
      this.baseUrl = process.env.REACT_APP_BASE_URL;
    }

    this.axiosInstance = axios.create({ baseURL: this.baseUrl });
  }

  public baseHttpPost(req: BaseRequest) {
    console.log(this.baseUrl);
    return this.axiosInstance.post(req.url, req.data);
  }

  public httpPost(req: BaseRequest) {
    // this.config.headers["x-auth-token"] = this.getToken();
    console.log(this.axiosInstance);
    return this.axiosInstance.post(req.url, req.data, this.config);
  }

  private getToken(): string | null {
    return window.localStorage.getItem("token");
  }
}
