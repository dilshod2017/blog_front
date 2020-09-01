import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from '@angular/router';
import { routes } from './routers/router';
import { PostsPageComponent } from './pages/posts/posts.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { MainService } from './services/main/main.service';
import { PostService } from './services/post/post.service';
import { LikeService } from './services/likes/like.service';
import { CommentsService } from './services/comments/comments.service';
import { CommentsComponent } from './components/comments/comments.component';
import { LikesComponent } from './components/likes/likes/likes.component';
import { BodyComponent } from './components/body_text/body/body.component';
import { BodyColumnComponent } from './components/body-column/body-column.component';
import { CommentComponent } from './components/comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsPageComponent,
    PostPageComponent,
    CommentsComponent,
    LikesComponent,
    BodyComponent,
    BodyColumnComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    MainService,
    PostService,
    LikeService,
    CommentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
