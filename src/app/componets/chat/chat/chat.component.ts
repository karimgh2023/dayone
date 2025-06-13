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
import { OpenAiService } from '@/app/shared/services/open-ai.service';
import { MessageStatus } from '@/app/models/message-status.enum';
import { Role } from '@/app/models/role.enum';

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
    private cdr: ChangeDetectorRef,
    private openAiService: OpenAiService
  ) {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatBody?.nativeElement) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    }, 100);
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromToken();
    if (!this.currentUser?.id) return;

    this.chatService.getAllMessages().subscribe((msgs) => {
      this.messages = msgs;

      const aiUser: User = this.getAiUser();

      const aiWelcomeMessage: ChatMessage = {
        id: -1,
        content: 'Bonjour, je suis votre assistant IA. Posez-moi une question !',
        sender: aiUser,
        receiver: this.currentUser!,
        timestamp: new Date().toISOString(),
        status: MessageStatus.SEEN
      };

      const hasAIMessage = msgs.some(m => m.sender.id === 0 || m.receiver.id === 0);
      if (!hasAIMessage) {
        this.messages.unshift(aiWelcomeMessage);
      }

      this.groupMessages();
      this.chatSocketService.setInitialMessages(this.messages);
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
    const isAI = this.selectedUserId === 0;

    if ((this.selectedUserId === null || this.selectedUserId === undefined) && !isAI) return;
    if (!content) return;

    this.newMessage = '';
    const aiUser: User = this.getAiUser();

    if (isAI) {
      const userMsg: ChatMessage = {
        id: Date.now(),
        content,
        sender: this.currentUser!,
        receiver: aiUser,
        timestamp: new Date().toISOString(),
        status: MessageStatus.SENT
      };

      this.groupedConversations[0] = this.groupedConversations[0] || [];
      this.groupedConversations[0].push(userMsg);
      this.scrollToBottom();
      setTimeout(() => this.messageInput?.nativeElement.focus(), 100);

      this.openAiService.askAi(content).subscribe({
        next: (reply) => {
          const aiReply: ChatMessage = {
            id: Date.now() + 1,
            content: reply,
            sender: aiUser,
            receiver: this.currentUser!,
            timestamp: new Date().toISOString(),
            status: MessageStatus.SEEN
          };

          this.groupedConversations[0].push(aiReply);
          this.scrollToBottom();
        },
        error: (err) => {
          console.error('❌ Failed to contact OpenAI:', err);
        }
      });

      return;
    }

    const messageDTO: ChatMessageDTO = {
      content,
      receiverId: Number(this.selectedUserId)
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

  getAiUser(): User {
    return {
      id: 0,
      email: 'ai@bot.com',
      firstName: 'AI',
      lastName: 'Bot',
      phoneNumber: '',
      profilePhoto: 'https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-chatbot-icon-chat-bot-robot-png-image_4841963.png',
      role: Role.EMPLOYEE,
      department: { id: 0, name: 'AI' },
      plant: { id: 0, name: 'AI', address: '' },
      loggedIn: true,
      isVerified: true
    };
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
        if (a === 0) return -1;
        if (b === 0) return 1;
        const aLast = this.groupedConversations[a].at(-1)!;
        const bLast = this.groupedConversations[b].at(-1)!;
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
        }
      });
    });

    this.scrollToBottom();
    setTimeout(() => this.messageInput?.nativeElement.focus(), 100);
  }

  switchTab(tab: 'chat' | 'contacts') {
    this.activeTab = tab;
  }

  getDisplayMessages(): ChatMessage[] {
    if (this.selectedUserId === 0 && this.groupedConversations[0]) {
      return this.groupedConversations[0];
    }
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
    return conv ? (conv.sender.id === this.currentUser?.id ? conv.receiver : conv.sender) : null;
  }
}
