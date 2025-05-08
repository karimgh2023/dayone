import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '@/app/models/department.model';
import { Plant } from '@/app/models/plant.model';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/public/departments`);
  }

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.apiUrl}/public/plants`);
  }
} 