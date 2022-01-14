import { store } from "react-notifications-component";
import {
  INotificationService,
  NotifactionOptions,
} from "../helpers/interfaces/global.interfaces";

export class NotificationService implements INotificationService {
  public showNotifaction(options: NotifactionOptions): void {
    store.addNotification({
      title: options.title,
      message: options.message,
      type: options.type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  }
}
