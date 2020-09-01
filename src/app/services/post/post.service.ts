import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/interface.models';
import { HttpClient } from '@angular/common/http';
import { APIRouterService } from '../apirouter.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postList$: Observable<Post[]>;
  
  constructor(private httpClient:HttpClient,
              private apirouterS: APIRouterService) { 
  }
  routerObj = {...this.apirouterS.httpOptions};
  loadPosts(){
    let a = {...this.routerObj.action, method:this.routerObj.methods.get, to:this.routerObj.to.post, url:"api/posts", data:""};
    this.postList$ = <Observable<Post[]>>this.httpClient.post(this.routerObj.baseUrl,a,this.routerObj.headerOption)
    return this.postList$;
  }
  loadPost(id){
    let a = { ...this.routerObj.action, 
                method: this.routerObj.methods.get, 
                to: this.routerObj.to.post, 
                url: this.routerObj.urls.getPost, 
                data: id };
    return <Observable<Post[]>>this.httpClient.post(this.routerObj.baseUrl, a, this.routerObj.headerOption)
  }
  loadBody(id){
    let a = {
      ...this.routerObj.action,
      method: this.routerObj.methods.get,
      to: this.routerObj.to.map,
      url: this.routerObj.urls.getPostMap,
      data: id
    };
    let q = <Observable<any>>this.httpClient.post(this.routerObj.baseUrl, a, this.routerObj.headerOption);
    return q;
  }
}
