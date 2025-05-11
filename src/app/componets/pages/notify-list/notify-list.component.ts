import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { NotificationWebSocketService } from '../../../shared/services/notification-websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Notification } from '../../../models/notification.model';
import { NotificationService } from '../../../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/common/sharedmodule';

@Component({
  selector: 'app-notify-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, SharedModule],
})
export class NotifyListComponent implements OnInit {
  notifications: Notification[] = [];
  errorMessage: string | null = null;

  constructor(
    private socketService: NotificationWebSocketService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromToken();
    console.log('User:', user, 'Token:', localStorage.getItem('token'));
    if (!user?.id) {
      this.errorMessage = 'No user ID found. Please log in again.';
      console.error(this.errorMessage);
      return;
    }

    // Load user notifications
    this.notificationService.getUserNotifications().subscribe({
      next: (initial) => {
        const sorted = initial.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        this.socketService.setInitialNotifications(sorted);
        this.notifications = sorted;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Failed to load notifications: ' + err.message;
        console.error('Error fetching notifications:', err);
      }
    });

    // Listen for real-time updates
    this.socketService.notifications$.subscribe({
      next: (notifList) => {
        const sorted = notifList.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        this.notifications = sorted;
        this.errorMessage = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('WebSocket notification error:', err);
        this.errorMessage = 'Error receiving WebSocket notifications';
      }
    });
  }

  onNotificationClick(notif: Notification) {
    if (!notif.seen) {
      this.notificationService.markAsSeen(notif.id).subscribe({
        next: (updated) => {
          console.log('📬 Notification marked as seen:', updated);
          this.socketService.addOrUpdateNotification(updated);
          this.socketService.setLastSeenNotificationId(updated.id);
        },
        error: (err) => {
          console.error('❌ Error updating notification status:', err);
        }
      });
    }

    if (notif.link) {
      this.router.navigateByUrl(notif.link);
    }
  }

  onDeleteNotification(notificationId: number): void {
    this.notificationService.deleteNotification(notificationId).subscribe({
      next: () => {
        console.log(`✅ Notification ${notificationId} deleted`);
      },
      error: (err) => {
        console.error('❌ Error deleting notification:', err);
      }
    });
  }
}
