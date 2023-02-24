import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  postList: Post[] = []

  // Fake pagination array
  pagination: number[] = [1,2,3,4,5]

  actualPage: number = 1
  gridSize: number = 9;

  constructor(private postService: PostService,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPostList(this.gridSize,this.actualPage)
  }

  // **
  // This function handles the service request to provide a list of post
  // **
  loadPostList(pageSize: number, page:number, noSnackbar?: boolean){
    this.postService.getPosts(pageSize, page).subscribe({
      next: (r:any) => {
        this.postList = []
        // Go through all the post in the response
        r.data.data.forEach(post => {
          this.postList.push(this.createNewPost(post.data))
        })
        if(!noSnackbar){
          this.openSnackbar("✅ List updated")
        }
      },
      error: (err) =>{
        this.openSnackbar("⛔ Error updating the list")
      }
    })
  }

  // **
  // Handles the change of the pagination in the grid
  // **
  changePagination(page: number){
    this.actualPage = page
    this.loadPostList(this.gridSize, page)
  }

  // **
  // Handles the http POST request to create a new reddit post
  // **
  translatePost(post: Post){
    // Sets the original post Id and the language
    post.originalPostId = post.id
    post.language = "ES"
    // If its not okay, needs to be trimed
    if(!this.checkIfTtitleOk(post.title)){
      post.title = this.fixTitle(post.title)
    }
    this.postService.postNewPost(post).subscribe({
      next: (r:any) => {
        this.openSnackbar("✅ Post created")
        this.loadPostList(this.gridSize, this.actualPage, true)
      },
      error: (err) =>{
        this.openSnackbar("⛔ Error creating the new post")
      }
    })
  }

  // **
  // Creates a new post object from the data given
  // **
  createNewPost(data: any): Post{
    return {
      id: data.id,
      author: data.author,
      author_fullname: data.author_fullname,
      category: data.subreddit,
      language: data.language,
      originalPostId: data.original_post_id,
      title: data.title
    } as Post
  }

  // **
  // Checks if the title is not okay for the upload (over 20 or bellow 5)
  // **
  checkIfTtitleOk(title: string): boolean{
    if(title.length > 20 || title.length < 5){
      return false;
    } else {
      return true;
    }
  }

  // **
  // Fix if the title, 
  // if its over 20 cuts down the string, 
  // if its bellow 5, adds spaces
  // 
  // @returns fixed title
  // **
  fixTitle(title: string) : string{
    if(title.length > 20){
      var splitedTitle = title.split('')
      splitedTitle = splitedTitle.slice(0,19)
      return splitedTitle.join('');
    }else{
      // This means the text is under 5 characters
      do {
        title += " "
      } while (title.length < 5)
      return title;
    }
  }

  // Create a snackbar with a input message
  openSnackbar(message: string){
    this.snackbar.open(message, "X", {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 1000
    })
  }
}
