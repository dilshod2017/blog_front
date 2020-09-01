import { Component, OnInit, EventEmitter } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';
import { tap, flatMap, mergeMap, map } from "rxjs/operators"
import { of, Observable } from "rxjs"
import { LikeService } from 'src/app/services/likes/like.service';
import { Post } from 'src/app/models/interface.models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsPageComponent implements OnInit {
  
  constructor(private mainSerivce:MainService,
              private router:Router) { }
  postList$:Observable<Post[]>;
  ngOnInit(): void {
    this.mainSerivce.postList$.subscribe(x=>{  
      let q = x.map(d=>{
        this.loadLikes(d._post_id).subscribe(dd => d.likes = dd)
        this.loadComments(d._post_id).subscribe(dd=>d.comments=dd)
        return d;
      })
      this.postList$ = of(q);
    })
  }
  loadLikes(id){
    let e = new EventEmitter();
    this.mainSerivce.loadPostLikes(id).subscribe(x=>{
      console.log(x);
        e.emit(x.length);
    })
    return e;
  }
  loadComments(id) {
    let e = new EventEmitter();
    this.mainSerivce.loadComments(id).subscribe((x:any) => {
      e.emit(x.length);
    })
    return e;
  }
  action(obj){
    if(obj && obj.nav){
      console.log(obj);
      this.mainSerivce.$PostListLikesLoader.next(obj.data)

      this.mainSerivce.$CommentsLoader.next(obj.data)
      this.router.navigate(["post/"+obj.data])
    }
  }
}
