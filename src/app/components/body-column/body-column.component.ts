import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-body-column',
  templateUrl: './body-column.component.html',
  styleUrls: ['./body-column.component.css']
})
export class BodyColumnComponent implements OnInit {
  @Input("row") row:any
  hover: boolean = true;
  constructor() { }
  ngOnInit(): void {
 
    
  }

}
