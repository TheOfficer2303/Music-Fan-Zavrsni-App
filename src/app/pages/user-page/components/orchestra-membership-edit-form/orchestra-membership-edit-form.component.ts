import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Orchestra, OrchestraMembership } from 'src/app/models/orchestra.model';

@Component({
  selector: 'app-orchestra-membership-edit-form',
  templateUrl: './orchestra-membership-edit-form.component.html',
  styleUrls: ['./orchestra-membership-edit-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrchestraMembershipEditFormComponent implements OnInit {
  @Input() oldOm?: OrchestraMembership | null;
  @Output() om: EventEmitter<any> = new EventEmitter();

  public omForm: FormGroup = this.fb.group({
    instrument: ['', Validators.required],
    joinedAt: ['', Validators.required],
    orchestraId: []
  });

  public onSave() {
    this.om.emit(this.omForm.value);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.omForm.get('instrument')?.setValue(this.oldOm?.instrument);       
    this.omForm.get('joinedAt')?.setValue(this.oldOm?.joinedAt);       
    this.omForm.get('orchestraId')?.setValue(this.oldOm?.orchestra.id);       
  }
}
