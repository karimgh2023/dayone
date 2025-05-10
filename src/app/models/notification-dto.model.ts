import { NotificationType } from "./NotificationType.enum";

export interface NotificationDTO {
  description: string;
  link: string;
  notificationType: NotificationType;
  userId: number;
}