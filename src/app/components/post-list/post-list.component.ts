import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() posts?: Array<Post> | null;
  @Output() comment: EventEmitter<any> = new EventEmitter()

  constructor() { }

  onComment(event: any) {
    this.comment.emit(event);
  }
}
