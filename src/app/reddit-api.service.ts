import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


interface RedditPost{
  title:string;
  link:string;
  image:string;
}

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {
  //public http:HttpClient;
   posts: RedditPost[] = [];
  
  constructor(private http:HttpClient) { }

  getReddit():void{
    const url = 'https://www.reddit.com/r/aww/.json';
    this.http
    .get(url) // calling the API
    .subscribe(
      // subscribing to run our functions when the data returns
      (response:any) => {
        // this is what happens on success
        console.log(response);
        // convert object to an array
        const posts = response.data.children;
        for (let post of posts) {
          const reddiPost : RedditPost = {
           title: post.data.title,
           link:"https:/reddit.com" + post.data.permalink,
           image: post.data.thumbnail

          };
          this.posts.push(reddiPost);
        //  if (Object.prototype.hasOwnProperty.call(data, key)) {
        //    const imgList = data[key]; // individual villager
        //    imgList.title = imgList.title;
        //    this.awwList.push(imgList);
        //  }
        }
      },
      (error) => {
        // this is what happens on failure
        console.error(error);
      }
    );
  }
}

