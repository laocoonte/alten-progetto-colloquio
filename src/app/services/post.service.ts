import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { Post } from "../interfaces/post.interface";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = environment.API.base + environment.API.posts;
  constructor(private http: HttpClient) {}

  getPosts(page: number) {
    const params = new HttpParams()
      .set('_page', page)
      .set('_limit', 10)
    return this.http.get<Post[]>(this.url, {params}).pipe(delay(2000));
  }

  getPost(id: number) {
    return this.http.get<Post>(this.url + '/' + id);
  }

  deletePost(id: number) {
    return this.http.delete<Post>(this.url + '/' + id);
  }
}