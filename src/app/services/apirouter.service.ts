import { Injectable } from '@angular/core';
import { Post, Comment,Like } from '../models/interface.models';

@Injectable({
  providedIn: 'root'
})
export class APIRouterService {
  private action = {
    url: "",
    data: "",
    to: "",
    method: "",
    do_action: ""
  }
  private options: {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }
  private newLike: Like = {
    _like_id: "",
    post_id: null,
    comment_id: null,
    like_author_id: "",
    like_timeStamp: new Date().toDateString(),
  }
  private newComment: Comment = {
    _comment_id: "",
    comment_text: "",
    comment_timeStamp: new Date().toDateString(),
    comment_author_id: "",
    comment_post_id: ""
  }
  private newPost: Post = {
    _post_id: "",
    post_author_id: "",
    post_timeStamp: new Date().toDateString(),
    post_title: "",
    description: ""
  }
  private users = [
    "513b43a1cc4b0d56f94f67a1",
    "523b43a1cc4b0d56f94f67b2",
    "533b43a1cc4b0d56f94f67c3",
    "543b43a1cc4b0d56f94f67d4",
    "5f3b43a1cc4b0d56f94f6kk1",
    "543b43a1cc4b0d56f94f67e5",
    "513b43a1cc4b0d56f94f67f6",
    "523b43a1cc4b0d56f94f67g7",
    "533b43a1cc4b0d56f94f67h8",
    "543b43a1cc4b0d56f94f6ni9",
    "543b43a1cc4b0d56f94f6jj0",
    "5f3b43a1cc4b0d56f94f6kk1"
  ]

  private routerObject = {
    action: this.action,
    baseUrl: "https://localhost:44319/api/router",
    headerOption: this.options,
    current_user: this.users[this.getRandomInt(this.users.length-1)],
    to: {
      post: "post",
      comment: "comment",
      like: "like",
      map: "map"
    },
    methods: {
      get: "get",
      post: "post",
      delete: "delete",
      put: "put",
    },
    urls:{
      getPostList:"api/posts",
      getPost:"api/posts",
      getPostMap:"api/maps/post",
      getPostLikes:"api/likes/post",
      getComments:"api/comments/post",
      getCommentsByUser:"api/comments/user",
      getCommentLikes:"api/likes/comment",
      addPostLike:"api/likes",
      comments:"api/comments"
    },
    newComment: this.newComment,
    newLike: this.newLike
  }
  constructor() { }
  httpOptions = {...this.routerObject};
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
