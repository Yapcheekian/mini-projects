import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Commentt } from "./comment.interface";
import { Post } from "./post.interface";

const url = "https://jsonplaceholder.typicode.com";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${url}/posts`);
  }

  getById(id: String): Observable<Post> {
    return this.http.get<Post>(`${url}/posts/${id}`);
  }

  getCommentsById(id: number): Observable<Commentt[]> {
    return this.http.get<Commentt[]>(`${url}/comments?postId=${id}`);
  }
}
