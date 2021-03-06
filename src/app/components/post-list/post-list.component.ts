import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppRoles } from 'src/app/consts/roles.constants';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() posts?: Array<Post> | null;
  @Input() currentUser?: User;
  @Input() adminRole?: number;
  @Output() comment: EventEmitter<any> = new EventEmitter();
  @Output() deletePost: EventEmitter<any> = new EventEmitter();
  @Output() editPost: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onComment(event: any) {
    this.comment.emit(event);
  }

  onDelete(event: any) {
    this.deletePost.emit(event)
  }

  onEdit(postFormData: any) {
    this.editPost.emit(postFormData);
  }
}
