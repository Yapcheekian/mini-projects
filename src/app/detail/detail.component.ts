import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Commentt } from "../services/comment.interface";
import { Post } from "../services/post.interface";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  post: Post;
  comments: Commentt[];
  panelOpenState = false;
  form;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.getPostIdByRouteParams().subscribe((id) => {
      this.postService.getById(id).subscribe((post) => {
        this.post = post;
        this.postService.getCommentsById(post.id).subscribe((comments) => {
          this.comments = comments;
        });
      });
    });
  }

  submit(form) {
    this.comments = this.comments.filter((comment) => {
      return (
        comment.body.includes(form.text) ||
        comment.name.includes(form.text) ||
        comment.email.includes(form.text)
      );
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      text: ["", [Validators.required]],
    });
  }

  private getPostIdByRouteParams(): Observable<String> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => {
        const id = params.get("id");
        return id ? id : "";
      })
    );
  }
}
