import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post?: Post;
  @Input() currentUser?: User;
  @Output() comment: EventEmitter<any> = new EventEmitter();
  @Output() deletePost: EventEmitter<any> = new EventEmitter();
  @Output() editPost: EventEmitter<any> = new EventEmitter();

  public isCollapsed = false;
  
  onComment(event: any) {
    this.comment.emit({event, postId: this.post?.id})
  }

  onDelete() {
    this.deletePost.emit(this.post?.id);
  }

  onEdit(form: any) {
    this.modalService.open(form);
  }

  onSave(postFormData: any) {
    this.editPost.emit({postFormData, postId: this.post?.id});
    this.modalService.dismissAll()
  }

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getAuthData()?.currentUser;
  }

}
