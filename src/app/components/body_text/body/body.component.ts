import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';
import { Observable, of } from 'rxjs';
import { tap, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
 
  postBody$:Observable<any>;
  constructor(private mainService:MainService) { }

  ngOnInit(): void {
    this.mainService.postBody$.subscribe(x=>{      
      let q = {...x, text:JSON.parse(x.text)}
  
      
      this.postBody$ = of(q)
    })
  }

}
