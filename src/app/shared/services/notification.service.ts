import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationDTO } from '../../models/notification-dto.model';
import { Notification } from '../../models/notification.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  getUserNotifications(): Observable<Notification[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Notification[]>(`${this.apiUrl}/user`, { headers });
  }

  createNotification(dto: NotificationDTO): Observable<Notification> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Notification>(`${this.apiUrl}/add`, dto, { headers });
  }

  deleteNotification(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers });
  }

  markAsSeen(notificationId: number): Observable<Notification> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Notification>(
      `${this.apiUrl}/${notificationId}/seen`,
      {},
      { headers }
    );
  }
} 