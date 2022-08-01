import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent implements OnInit {
  posts: Post[] = [];
  page: number = 1;
  isLoading: boolean;
  constructor(
    private postService: PostService
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.isLoading = true;
    this.postService.getPosts(this.page).subscribe({
      next: posts => {
        this.posts.push(...posts);
        this.page++;
      },
      error: () => this.isLoading = false,
      complete: () => this.isLoading = false,
    });
  }

  deletePost(post: Post) {
    this.postService.deletePost(post.id).subscribe(_ => {
      const postIndex = this.posts.findIndex(p => p.id === post.id);
      if (postIndex != null) {
        this.posts.splice(postIndex, 1);
      }
    });
  }
}
