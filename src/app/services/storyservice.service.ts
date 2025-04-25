import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../models/story';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private baseUrl:string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getStories(page = 1, pageSize = 20, query = ''): Observable<Story[]> {
    
    const params = { page, pageSize, query };
    return this.http.get<Story[]>(this.baseUrl, { params });
  }
}
