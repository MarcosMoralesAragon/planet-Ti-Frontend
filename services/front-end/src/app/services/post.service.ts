import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';

// Url doents needs the start "http://localhost:8080" because it was predefined in the 
// proxy file to fix CORS
const url = "/api/"
const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(pageSize: number, page: number){
    return this.http.get(url + "posts?limit=" + pageSize + "&page=" + page, {'headers': headers})
  }

  postNewPost(post: Post){
    return this.http.post(url + "posts", post)
  }
}
