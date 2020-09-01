import { Injectable } from '@angular/core';
import { PostService } from '../post/post.service';
import { tap, filter, switchMap, exhaustMap, distinct, distinctUntilKeyChanged, takeUntil, distinctUntilChanged, flatMap, map, mergeMap, exhaust } from "rxjs/operators"
import { BehaviorSubject, from, Observable, EMPTY } from 'rxjs';
import { LikeService } from '../likes/like.service';
import { Post, Comment } from 'src/app/models/interface.models';
import { CommentsService } from '../comments/comments.service';
import { APIRouterService } from '../apirouter.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  $PostListLoader = new BehaviorSubject(null);
  $PostLoader = new BehaviorSubject(null);
  $PostBodyLoader = new BehaviorSubject(null);
  $PostListLikesLoader = new BehaviorSubject(null);
  $CommentsLoader = new BehaviorSubject(null);
  $CommentsLikeLoader = new BehaviorSubject(null);

  //#region  observables
  postList$ = this.postService.postList$;
  postLikeList$ = this.likeService.postLikes$;
  commentLikes$:Observable<any>;
  post$:Observable<any>;
  comments$:Observable<any>;
  commentsLike$:Observable<any>;
  postBody$:Observable<any>;
  //#endregion
  constructor(private postService:PostService,
              private likeService: LikeService,
              private commentService: CommentsService,
              private apiWebService:APIRouterService
             ) {
      this.postList$ = this.$PostListLoader.pipe(
        filter(x=>x != null),
        exhaustMap(x=>this.postService.loadPosts())
      )
      this.postLikeList$ = this.$PostListLikesLoader.pipe(
        filter(x=>x!= null),
        exhaustMap(x=>this.likeService.postLikes$)
      )
      this.post$ = this.$PostLoader.pipe(
        filter(x=>x!=null),
        exhaustMap(x=>this.postService.loadPost(x))
      )
      this.postBody$ = this.$PostBodyLoader.pipe(
        filter(x=>x!=null),
        exhaustMap(x=>this.postService.loadBody(x))
      )
      this.comments$ = this.$CommentsLoader.pipe(
        filter(x=>x!= null),
        exhaustMap(x=>this.commentService.loadComments(x))
      )
      this.commentsLike$ = this.$CommentsLikeLoader.pipe(
        filter(x=>x != null),
        exhaustMap(x=>this.likeService.loadCommentLikes(x))
      )
  }
  loadPostLikes(id){
    
    return id !== null ? this.likeService.loadPostLikes(id):EMPTY
  }
  loadCommentLikes(id){
    return this.likeService.loadCommentLikes(id);
  }
  loadComments(id){
    return this.commentService.loadComments(id);
  }
  loadBody(id){
    return this.postService.loadBody(id)
  }
  addLikes({comment_id=null, post_id=null}){
    return this.likeService.addLike({comment_id,post_id}).pipe(
      switchMap(x=>{
         if(post_id !== null){
          return this.loadPostLikes(post_id)
        }
        else {
          return this.loadCommentLikes(comment_id)
        }
      })
    )
  }
  commentAction({data, action, post_id}){  
     if(action === 'delete'){
      return this.commentService.deleteComment(data, post_id).pipe(
        switchMap(()=>{
          console.log(data);
          return this.loadComments(post_id);
        })
      )
    }
    else {
      let comment: Comment = { 
        ...this.apiWebService.httpOptions.newComment,
         comment_text: data,
        comment_author_id: this.apiWebService.httpOptions.current_user,
        comment_post_id: post_id
       }
      return this.commentService.saveComment(comment).pipe(
        exhaustMap(()=>this.loadComments(post_id))
      )
    }
  }

}
