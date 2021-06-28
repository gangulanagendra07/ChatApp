import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) { }

  addPost(body): Observable<any> {

    return this.http.post(`${BASEURL}/addpost`, body);
  }
  getAllPosts(): Observable<any> {
    return this.http.get(`${BASEURL}/posts`);
  }

  addLike(body): Observable<any> {

    return this.http.post(`${BASEURL}/addlike`, body);
  }
  addComment(postId, comment): Observable<any> {

    return this.http.post(`${BASEURL}/addcomment`, {
      postId,
      comment
    });
  }

  getPost(id): Observable<any>{
   return this.http.get(`${BASEURL}/post/${id}`);
  }


}
