import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Like } from 'src/app/models/interface.models';
import { HttpClient } from '@angular/common/http';
import { APIRouterService } from '../apirouter.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  postLikes$:Observable<Like[]> = of([])
  commentLikes$:Observable<Like[]> = of([])
  constructor(private httpClient:HttpClient,
              private apiService:APIRouterService) { 
    
  }
  routerObj = {...this.apiService.httpOptions};
  loadPostLikes(post_id){
    let a = {...this.routerObj.action, 
                method:this.routerObj.methods.get, 
                to:this.routerObj.to.like, 
                url:this.routerObj.urls.getPostLikes,
                data:post_id
            }
    
    return <Observable<Like[]>>this.httpClient.post(this.routerObj.baseUrl, a, this.routerObj.headerOption)
  }
  counter=0;
  loadCommentLikes(comment_id){
     
    let a = {
      ...this.routerObj.action,
      method: this.routerObj.methods.get,
      to: this.routerObj.to.like,
      url: this.routerObj.urls.getCommentLikes,
      data: comment_id
    }
    return <Observable<Like[]>>this.httpClient.post(this.routerObj.baseUrl, a, this.routerObj.headerOption).pipe(
      catchError((err, v)=>{
        return err;
      })
    )
  }
  addLike({comment_id= null, post_id = null}) {
    let e = new BehaviorSubject<any>(null)
    let like = { ...this.routerObj.newLike };
    if(comment_id != null){
      like.comment_id = comment_id;
    }
    else {
      like.post_id = post_id;
    }
    
    like.like_author_id = this.routerObj.current_user;
    let a  = {
      url: this.routerObj.urls.addPostLike,
      data: JSON.stringify(like),
      to: this.routerObj.to.like,
      method: this.routerObj.methods.post,
      do_action: "post"
    }
    this.httpClient.post(this.routerObj.baseUrl, a, this.routerObj.headerOption).subscribe(x=>{
      if(comment_id == null){
        this.postLikes$ = this.loadPostLikes(post_id);
        e.next({})
      }
      else {
        this.commentLikes$ = this.loadCommentLikes(comment_id);
        e.next({});
      }
    })
      return e 
  }
}
