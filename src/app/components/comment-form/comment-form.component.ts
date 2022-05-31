import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentFormComponent {
  @Output() comment: EventEmitter<any> = new EventEmitter()

  public commentForm: FormGroup = this.fb.group({
    comment: ['', Validators.required]
  });

  public onComment() {
    this.comment.emit(this.commentForm.value);
    this.commentForm.reset();
  }

  constructor(private fb: FormBuilder) { }

}
