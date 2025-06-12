import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessageDTO } from '@/app/models/chat-message-dto.model';
import { ChatMessage } from '@/app/models/Chat-message.model';



@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = `http://localhost:8081/api/chat`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  sendMessage(dto: ChatMessageDTO): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/send`, dto, {
      headers: this.getHeaders(),
    });
  }

  getAllMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/messages`, {
      headers: this.getHeaders(),
    });
  }

  markAsSeen(messageId: number): Observable<ChatMessage> {
    return this.http.put<ChatMessage>(`${this.apiUrl}/${messageId}/seen`, {}, {
      headers: this.getHeaders(),
    });
  }
}
