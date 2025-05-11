import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';
import { NotificationWebSocketService } from '../../services/notification-websocket.service';
import { Notification } from '../../../models/notification.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.scss'
})
export class RightSidebarComponent implements OnInit, OnDestroy {
  activeOffcanvas = inject(NgbActiveOffcanvas);
  isNotifyEmpty: boolean = true;
  notificationCount: number = 0;
  notifications: Notification[] = [];
  private notificationSubscription: Subscription = new Subscription();

  constructor(
    private notificationService: NotificationService,
    private notificationWebSocketService: NotificationWebSocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNotifications();
    this.setupWebSocket();
  }

  private loadNotifications() {
    this.notificationService.getUserNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.notificationCount = notifications.filter(n => !n.seen).length;
        this.isNotifyEmpty = this.notifications.length === 0;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
      }
    });
  }

  private setupWebSocket() {
    this.notificationSubscription = this.notificationWebSocketService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
      this.notificationCount = notifications.filter(n => !n.seen).length;
      this.isNotifyEmpty = this.notifications.length === 0;
    });
  }

  onNotificationClick(notification: Notification) {
    if (!notification.seen) {
      this.notificationService.markAsSeen(notification.id).subscribe({
        next: (updatedNotification) => {
          const index = this.notifications.findIndex(n => n.id === notification.id);
          if (index !== -1) {
            this.notifications[index] = updatedNotification;
            this.notificationCount = this.notifications.filter(n => !n.seen).length;
          }
        },
        error: (error) => {
          console.error('Error marking notification as seen:', error);
        }
      });
    }
    
    if (notification.link) {
      this.router.navigate([notification.link]);
      this.activeOffcanvas.close('Close click');
    }
  }

  onDeleteNotification(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.notificationService.deleteNotification(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.notificationCount = this.notifications.filter(n => !n.seen).length;
        this.isNotifyEmpty = this.notifications.length === 0;
      },
      error: (error) => {
        console.error('Error deleting notification:', error);
      }
    });
  }

  handleCardClick(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}