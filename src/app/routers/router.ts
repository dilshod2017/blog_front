import { Routes } from "@angular/router";
import { PostsPageComponent } from '../pages/posts/posts.component';
import { PostPageComponent } from '../pages/post-page/post-page.component';
export const routes: Routes = [
    {
        path: "posts", component:PostsPageComponent, pathMatch:"full"
    },
    {
        path:"post/:id", component:PostPageComponent,pathMatch:"full"
    },
    {
        path:" ", redirectTo:"posts"
    },
    {
        path:"**", redirectTo:"posts"
    },

]