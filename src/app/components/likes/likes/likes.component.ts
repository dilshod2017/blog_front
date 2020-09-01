import { Component, OnInit, Input } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';
import { Observable, EMPTY, of } from 'rxjs';
import { tap, catchError, exhaust, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  @Input("comment_id") comment_id:string
  constructor(private mainService:MainService) { }
  likes$:Observable<any>;
  error:Observable<any>;
  ngOnInit(): void {    
    this.mainService.$CommentsLikeLoader.next(this.comment_id)
     this.likes$ = this.mainService.$CommentsLikeLoader.pipe(
       exhaustMap(()=> this.mainService.commentsLike$)
     )
  }
  action({ to, method, action}){
      switch (to) {
        case "like":
          if(action == "add"){            
            this.mainService.addLikes({comment_id:this.comment_id}).subscribe(x=>{
              this.likes$ = of(x);
            })
          }
          break;
      
        default:
          break;
      }
  }

}
