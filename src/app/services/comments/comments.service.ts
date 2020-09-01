import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIRouterService } from '../apirouter.service';
import { exhaustMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  commentsList$;
  routeObj;
  constructor(private httpClient:HttpClient,
              private apiService:APIRouterService) { 
                  this.routeObj = {...this.apiService.httpOptions}
              }
  loadComments(id){
    let a = {... this.routeObj.action, 
                 url: this.routeObj.urls.getComments,
                 method:this.routeObj.methods.get,
                 to:this.routeObj.to.comment,
                 data:id}
    return this.httpClient.post(this.routeObj.baseUrl, a, this.routeObj.headerOption)
  }
  saveComment(comment){
    let e = new EventEmitter();
    let a = {
      ... this.routeObj.action,
      url: this.apiService.httpOptions.urls.comments,
      method: this.routeObj.methods.post,
      to: this.routeObj.to.comment,
      data: JSON.stringify(comment),
      do_action:"post"
    }
    this.httpClient.post(this.routeObj.baseUrl, a, this.routeObj.headerOption).pipe(
      tap((x) => {
        console.log(x);
        this.commentsList$ = this.loadComments(comment._post_id);
        e.emit({})
      })
    )
    return e;
  }
  deleteComment(id, post_id):Observable<any>{
    let e = new EventEmitter();
    let a = {
      ... this.routeObj.action,
      url: this.apiService.httpOptions.urls.comments,
      method: this.routeObj.methods.delete,
      to: this.routeObj.to.comment,
      data: id,
    }
    console.log(a);
    
    this.httpClient.post(this.routeObj.baseUrl, a, this.routeObj.headerOption).subscribe(x=>{
      this.commentsList$ = this.loadComments(post_id);
      console.log("emitted");
      e.emit();
    })
    return e;
  }
}
