import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessageDTO } from '@/app/models/chat-message-dto.model';
import { ChatMessage } from '@/app/models/Chat-message.model';
import { User } from '@/app/models/user.model';
import { AuthService } from '@/app/shared/services/auth.service';
import { ChatWebSocketService } from '@/app/shared/services/chat-websocket.service';
import { ChatService } from '@/app/shared/services/chat.service';
import { SharedModule } from '../../../shared/common/sharedmodule';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, FormsModule, SharedModule]
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatBody') chatBody!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messages: ChatMessage[] = [];
  groupedConversations: { [key: number]: ChatMessage[] } = {};
  selectedUserId: number | null = null;
  currentUser: User | null = null;
  activeTab: 'chat' | 'contacts' = 'chat';
  sortedContactIds: number[] = [];
  newMessage: string = '';

  objectKeys = Object.keys;

  constructor(
    private chatSocketService: ChatWebSocketService,
    private chatService: ChatService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.chatBody?.nativeElement) {
          this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
        }
      }, 100);
    } catch (err) {
      console.error('Erreur scrollToBottom:', err);
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromToken();
    if (!this.currentUser?.id) return;

    this.chatService.getAllMessages().subscribe((msgs) => {
      this.messages = msgs;
      this.groupMessages();
      this.chatSocketService.setInitialMessages(msgs);
      this.cdr.detectChanges();
      this.scrollToBottom();
    });

    this.chatSocketService.singleMessage$.subscribe((newMessage) => {
      this.messages.push(newMessage);
      this.groupMessages();
      this.scrollToBottom();
      this.cdr.detectChanges();
    });
  }

  sendMessage(): void {
    const content = this.newMessage.trim();
    if (!this.selectedUserId || !content) return;

    this.newMessage = '';

    const messageDTO: ChatMessageDTO = {
      content,
      receiverId: this.selectedUserId,
    };

    this.chatService.sendMessage(messageDTO).subscribe({
      next: (sentMessage) => {
        this.messages.push(sentMessage);
        this.groupMessages();
        this.scrollToBottom();

        setTimeout(() => this.messageInput?.nativeElement.focus(), 100);
      },
      error: (err) => {
        console.error('❌ Error sending message:', err);
      }
    });
  }

  getContactUser(contactId: number): User | undefined {
    const conversation = this.groupedConversations[contactId];
    if (!conversation?.length) return undefined;

    const firstMsg = conversation[0];
    return firstMsg.sender.id === this.currentUser?.id ? firstMsg.receiver : firstMsg.sender;
  }

  getLastMessage(contactId: number): ChatMessage | undefined {
    const messages = this.groupedConversations[contactId];
    return messages?.length ? messages[messages.length - 1] : undefined;
  }

  isLastMessageUnseen(contactId: number): boolean {
    const lastMsg = this.getLastMessage(contactId);
    return !!(lastMsg && lastMsg.receiver?.id === this.currentUser?.id && lastMsg.status !== 'SEEN');
  }

  isUserOnline(user: User | undefined): boolean {
    return !!user?.loggedIn;
  }

  groupMessages() {
    this.groupedConversations = {};

    for (const msg of this.messages) {
      const contactId = msg.sender.id === this.currentUser?.id ? msg.receiver.id : msg.sender.id;

      if (!this.groupedConversations[contactId]) {
        this.groupedConversations[contactId] = [];
      }

      this.groupedConversations[contactId].push(msg);
    }

    this.sortedContactIds = Object.keys(this.groupedConversations)
      .map(id => +id)
      .sort((a, b) => {
        const aLast = this.groupedConversations[a][this.groupedConversations[a].length - 1];
        const bLast = this.groupedConversations[b][this.groupedConversations[b].length - 1];
        return new Date(bLast.timestamp).getTime() - new Date(aLast.timestamp).getTime();
      });
  }

  selectUser(contactId: number): void {
    this.selectedUserId = contactId;

    const unseenMessages = this.groupedConversations[contactId]?.filter(
      (msg) => msg.status !== 'SEEN' && msg.receiver?.id === this.currentUser?.id
    ) || [];

    unseenMessages.forEach((msg) => {
      this.chatService.markAsSeen(msg.id).subscribe({
        next: (updatedMsg) => {
          this.messages = this.messages.map((m) =>
            m.id === updatedMsg.id ? updatedMsg : m
          );
          this.groupMessages();
          this.scrollToBottom();
        },
        error: (err) => {
          console.error('❌ Erreur API markAsSeen:', err);
        },
      });
    });

    this.scrollToBottom();
    setTimeout(() => this.messageInput?.nativeElement.focus(), 100);
  }

  switchTab(tab: 'chat' | 'contacts') {
    this.activeTab = tab;
  }

  getDisplayMessages(): ChatMessage[] {
    return this.selectedUserId ? this.groupedConversations[this.selectedUserId] || [] : [];
  }

  isSentByMe(msg: ChatMessage): boolean {
    return msg.sender.id === this.currentUser?.id;
  }

  onMessageClick(msg: ChatMessage): void {
    if (msg.status !== 'SEEN' && msg.receiver.id === this.currentUser?.id) {
      this.chatService.markAsSeen(msg.id).subscribe({
        next: (updatedMsg) => {
          this.messages = this.messages.map(m => m.id === updatedMsg.id ? updatedMsg : m);
          this.groupMessages();
          this.scrollToBottom();
        },
        error: (err) => {
          console.error('❌ Error marking message as seen:', err);
        }
      });
    }
  }

  getUserFromConversation(contactId: number): User | null {
    const conv = this.groupedConversations[contactId]?.[0];
    if (!conv) return null;
    return conv.sender.id === this.currentUser?.id ? conv.receiver : conv.sender;
  }
}
