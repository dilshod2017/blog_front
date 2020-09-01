import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, tap, switchMap, flatMap, mergeMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-pos-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  post$;
  comments$:Observable<any>;
  post_id:string;
  postLikes$:Observable<any>;
  constructor(private mainService:MainService,
              private actRoute:ActivatedRoute) {
    this.actRoute.params.subscribe(id => {
      this.post_id = id["id"]
      this.mainService.$PostLoader.next(id["id"])
      this.mainService.$PostBodyLoader.next(id["id"]);
      this.mainService.$CommentsLoader.next(id["id"])
      this.mainService.$PostListLikesLoader.next(id["id"])
    })
  }

  ngOnInit(): void {
    this.mainService.post$.subscribe(x => {
      this.post$ = of(x);
    })
    this.postLikes$ = this.mainService.$PostListLikesLoader.pipe(
      filter(x=>x != null),
      switchMap(x=>this.mainService.loadPostLikes(x))
    )
  }
  action({ to, method, action }){
    console.log(to);
    
    switch (to) {
      case "like":
          if(method === "post"){
            this.mainService.addLikes({ post_id: this.post_id}).subscribe(x=>{
              this.postLikes$ = of(x);;
              console.log(x);
            })
          }
        break;
    
      default:
        break;
    }
  }

}
