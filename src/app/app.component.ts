import { Component } from '@angular/core';
import { MainService } from './services/main/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private mainService:MainService){
    this.mainService.$PostListLoader.next({});
  }
}
