import {
  action,
  autorun,
  comparer,
  computed,
  makeObservable,
  observable,
} from "mobx";
import { NotificationType } from "../helpers/enums/global.enums";
import {
  AuthResponse,
  BaseRequest,
  IHttpService,
  INotificationService,
} from "../helpers/interfaces/global.interfaces";
import { HttpService } from "../services/httpService";
import { NotificationService } from "../services/notificationService";

class AuthStore {
  constructor(
    private readonly httpService: IHttpService,
    private readonly notificationService: INotificationService
  ) {
    this.checkIfAuthenticated();
    makeObservable(this, {
      checkIfAuthenticated: action,
      isLoading: observable,
      setLoading: action,
      isAuthenticated: observable,
      signIn: action,
      isAuth: computed,
      signOut: action,
    });
  }

  public isLoading: boolean = false;
  public isAuthenticated: boolean = true;

  public setLoading(value: boolean) {
    this.isLoading = value;
  }

  get isAuth() {
    return this.isAuthenticated;
  }

  public async checkIfAuthenticated(): Promise<void> {
    this.setLoading(true);
    try {
      const res = await this.httpService.baseHttpGet({ url: "/check" });

      const data: AuthResponse = res.data;

      if (data.success) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    } catch (err) {
      console.log(err);
      this.isAuthenticated = false;
    }

    this.setLoading(false);
  }

  public async signIn(username: string, password: string) {
    this.setLoading(true);
    const req: BaseRequest = {
      data: { username: username, password: password },
      url: "/login",
    };

    try {
      const res = await this.httpService.baseHttpPost(req);

      const data: AuthResponse = res.data;

      if (data.success) {
        this.saveToLocalStorage(data.result);

        this.notificationService.showNotifaction({
          title: "Success",
          message: "Welcome!",
          type: NotificationType.SUCCESS,
        });
        this.setLoading(false);
        this.isAuthenticated = true;
        return true;
      } else {
        this.notificationService.showNotifaction({
          title: "Error",
          message: data.errorMsg,
          type: NotificationType.DANGER,
        });
        this.setLoading(false);

        return false;
      }
    } catch (err) {
      this.notificationService.showNotifaction({
        title: "Error",
        message: "Server Error",
        type: NotificationType.DANGER,
      });
      this.setLoading(false);
      return false;
    }
  }

  private deleteFromLocalStorage() {
    localStorage.removeItem("token");
  }

  public signOut() {
    this.deleteFromLocalStorage();
    this.isAuthenticated = false;
  }

  private saveToLocalStorage(token: string) {
    localStorage.setItem("token", token);
  }
}

export const authStore = new AuthStore(
  new HttpService(),
  new NotificationService()
);
