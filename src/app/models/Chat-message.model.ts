import { MessageStatus } from './message-status.enum';
import { User } from './user.model';

export interface ChatMessage {
  id: number;
  content: string;
  sender: User;
  receiver: User;
  status: MessageStatus;
  timestamp: string;
}
