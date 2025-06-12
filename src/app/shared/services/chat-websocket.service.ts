import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChatMessage } from '@/app/models/Chat-message.model';

@Injectable({ providedIn: 'root' })
export class ChatWebSocketService {
  private stompClient!: Client;
  private connected = false;

  // One for initial bulk load
  private allMessagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  allMessages$ = this.allMessagesSubject.asObservable();

  // One for real-time updates
  private singleMessageSubject = new Subject<ChatMessage>();
  singleMessage$ = this.singleMessageSubject.asObservable();

  private wsEndpoint = `http://localhost:8081/ws`;

  constructor() {
    console.log('📡 Chat WS endpoint:', this.wsEndpoint);
    this.initializeWebSocket();
  }

  private initializeWebSocket(): void {
    this.stompClient = new Client({
      webSocketFactory: () => {
        const token = localStorage.getItem('token');
        return new SockJS(`${this.wsEndpoint}?token=${token}`);
      },
      reconnectDelay: 5000,
      debug: (str) => console.log('[ChatWebSocket]', str),
    });

    this.setupHandlers();
    this.connect();
  }

  private setupHandlers(): void {
    this.stompClient.onConnect = (frame) => {
      console.log('✅ Chat WebSocket connected:', frame);
      this.connected = true;

      const user = JSON.parse(localStorage.getItem('user')!);

      this.stompClient.subscribe('/user/queue/chat', (message: Message) => {
        const chat: ChatMessage = JSON.parse(message.body);
        console.log('💬 Incoming chat message:', chat);

        // Emit single new message to subscribers
        this.singleMessageSubject.next(chat);

        // Also update the full list internally (optional)
        const current = this.allMessagesSubject.value;
        const updated = [chat, ...current.filter(m => m.id !== chat.id)];
        this.allMessagesSubject.next(updated);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('❌ STOMP chat error:', frame);
      this.connected = false;
      this.allMessagesSubject.error(new Error(frame.body));
    };

    this.stompClient.onWebSocketClose = () => {
      console.warn('🔌 Chat WebSocket disconnected');
      this.connected = false;
      setTimeout(() => this.connect(), 5000);
    };
  }

  connect(): void {
    if (!this.connected && this.stompClient) {
      console.log('🚀 Activating WebSocket...');
      this.stompClient.activate();
    }
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.connected = false;
    }
  }

  setInitialMessages(initial: ChatMessage[]): void {
    this.allMessagesSubject.next(initial);
  }
}
