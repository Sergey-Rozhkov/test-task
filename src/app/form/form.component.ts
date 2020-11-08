import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TimerService } from '../timer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent {
  timerForm = this.formBuilder.group({
    name: [null, Validators.required],
    duration: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
  });

  constructor(private formBuilder: FormBuilder, private timerService: TimerService, private route: ActivatedRoute, private router: Router) {
  }

  onSubmit(): void {
    if (this.timerForm.valid) {
      this.timerService.create(this.timerForm.value);
      this.router.navigate(['/']);
    }
  }

  onCancel(): void {
    if (this.timerForm.dirty && !confirm('Are your sure ?')) {
      return;
    }

    this.router.navigate(['/']);
  }
}
