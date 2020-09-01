import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';
import { of } from 'rxjs';
import { FormGroup, FormControl } from "@angular/forms"
import { exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private mainService:MainService) { }
  comments$ = this.mainService.comments$;
  likes$;
  formGroup:FormGroup;
  ngOnInit(): void {
    this.comments$.subscribe(x=>{
      console.log(x);
      this.comments$ = of(x);
    })
    this.formGroup = new FormGroup({
      "text":new FormControl(null)
    })
  }
  action({to, action, data}){
    if(to === "comment"){
      if(action === 'delete'){
        
        this.mainService.commentAction({data: data._comment_id, action, post_id: data.comment_post_id}).subscribe(x=>{
          console.log(x);
          this.comments$ = of(x);
        })
      }
      else {
        
      }
    }
  }

}
