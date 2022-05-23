import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts?: Array<Post> | null;

  constructor() { }

  ngOnInit(): void {
  }

}
