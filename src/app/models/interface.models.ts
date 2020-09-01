
export interface Post {
    _post_id : string;
    post_author_id : string;
    post_timeStamp : string;
    post_title : string;
    description : string;
    likes?:any;
    comments?:any;
}

export interface Comment {
    _comment_id: string;
    comment_text: string;
    comment_timeStamp: string;
    comment_author_id: string;
    comment_post_id: string;
}
export interface Like {
    _like_id : string;
    post_id : string;
    comment_id : string;
    like_author_id : string;
    like_timeStamp : string;
}