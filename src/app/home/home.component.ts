import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "../services/post.interface";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.postService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  navigate(id: number) {
    this.router.navigateByUrl(`/${id}`);
  }
}
