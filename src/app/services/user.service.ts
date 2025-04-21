import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  /**
   * Get the current user's information
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/current`);
  }

  /**
   * Update user profile photo
   */
  updateProfilePhoto(userId: number, photo: File): Observable<User> {
    const formData = new FormData();
    formData.append('photo', photo);

    return this.http.post<User>(`${this.apiUrl}/${userId}/profile-photo`, formData);
  }

  /**
   * Get user by ID
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update user information
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  getAllUsersExceptAdmins() : Observable<User[]>  {
    return this.http.get<User[]>(`http://localhost:8081/api/public/non-admins`);
  }
}
