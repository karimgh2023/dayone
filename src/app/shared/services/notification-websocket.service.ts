import { Injectable } from '@angular/core';
import { Client, Message, StompHeaders } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../../models/notification.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationWebSocketService {
  private stompClient!: Client;
  private connected = false;
  private lastSeenNotificationId: number | null = null;

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private wsEndpoint = `${environment.apiUrl.replace('/api', '')}/ws`;

  constructor() {
    console.log('✅ Using WS endpoint:', this.wsEndpoint);
    this.initializeWebSocket();
  }

  private initializeWebSocket(): void {
    this.stompClient = new Client({
      webSocketFactory: () => {
        const token = localStorage.getItem('token');
        return new SockJS(`${this.wsEndpoint}?token=${token}`);
      },
      reconnectDelay: 5000,
      debug: (str) => console.log('[WebSocket]', str),
      connectHeaders: this.buildConnectHeaders(),
    });

    this.setupWebSocketHandlers();
  }

  private setupWebSocketHandlers(): void {
    if (!this.stompClient) {
      console.error('WebSocket client not initialized');
      return;
    }

    this.stompClient.onConnect = (frame) => {
      console.log('✅ WebSocket connected:', frame);
      this.connected = true;

      // 📥 Receive new notifications
      this.stompClient.subscribe('/user/queue/notifications', (message: Message) => {
        console.log('📥 Incoming WebSocket message:', message.body);

        try {
          const incoming: Notification = JSON.parse(message.body);

          // 🔔 Show native browser notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(incoming.description, {
              body: 'Cliquez pour voir plus',
              icon: 'assets/free-notification.png',
            });
          }

          const current = this.notificationsSubject.value;
          const updated = [incoming, ...current.filter(n => n.id !== incoming.id)]
            .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

          this.notificationsSubject.next(updated);
        } catch (err) {
          console.error('❌ Error parsing WebSocket message:', err);
          this.notificationsSubject.error(err);
        }
      });

      // 🗑 Handle deleted notifications
      this.stompClient.subscribe('/user/queue/notifications/deleted', (msg: Message) => {
        console.log('📤 Notification deleted from socket:', msg.body);
        try {
          const deletedId = parseInt(msg.body, 10);
          const current = this.notificationsSubject.value;
          this.notificationsSubject.next(current.filter(n => n.id !== deletedId));
        } catch (err) {
          console.error('❌ Error parsing deleted message:', err);
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('❌ STOMP error:', frame);
      this.connected = false;
      this.notificationsSubject.error(new Error('STOMP error: ' + frame.body));
    };

    this.stompClient.onWebSocketError = (evt) => {
      console.error('❌ WebSocket error:', evt);
      this.connected = false;
      setTimeout(() => this.connect(), 5000);
    };

    this.stompClient.onWebSocketClose = (evt) => {
      console.log('🔌 WebSocket closed:', evt);
      this.connected = false;
      setTimeout(() => this.connect(), 5000);
    };
  }

  private buildConnectHeaders(): StompHeaders {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  initializeNotifications(): void {
    // Request notification permission if not already granted
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        console.log('🔐 Notification permission:', permission);
      });
    }

    // Connect to WebSocket if not already connected
    if (!this.connected) {
      this.connect();
    }
  }

  connect(): void {
    if (this.connected) {
      console.log('Already connected to WebSocket');
      return;
    }

    if (!this.stompClient) {
      console.error('WebSocket client not initialized');
      return;
    }

    console.log('Activating WebSocket client...');
    this.stompClient.activate();
  }

  disconnect(): void {
    if (!this.stompClient) {
      console.error('WebSocket client not initialized');
      return;
    }

    this.stompClient.deactivate();
    this.connected = false;
    console.log('🛑 WebSocket disconnected');
  }

  setInitialNotifications(initial: Notification[]) {
    this.notificationsSubject.next(initial);
    if (initial.length > 0) {
      this.lastSeenNotificationId = initial[0].id;
    }
  }

  public addOrUpdateNotification(notif: Notification): void {
    const current = this.notificationsSubject.value;
    const updated = [notif, ...current.filter(n => n.id !== notif.id)]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    this.notificationsSubject.next(updated);
  }

  public mergeNotifications(notifs: Notification[]): void {
    const current = this.notificationsSubject.value;
    const merged = [...notifs.filter(n => !current.some(c => c.id === n.id)), ...current]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    this.notificationsSubject.next(merged);
  }

  public getLastSeenNotificationId(): number | null {
    return this.lastSeenNotificationId;
  }

  public setLastSeenNotificationId(id: number): void {
    this.lastSeenNotificationId = id;
  }
} 