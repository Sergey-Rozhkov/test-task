import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TimerService } from '../../services/timer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
  timerForm = this.formBuilder.group({
    name: [null, Validators.required],
    duration: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
  });
  private timerId: string;

  constructor(
    private formBuilder: FormBuilder,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmService: ConfirmService
  ) {
  }

  onSubmit(): void {
    if (!this.timerForm.valid) {
      return;
    }

    if (this.timerId) {
      this.timerService.update(this.timerId, this.timerForm.value);
    } else {
      this.timerService.create(this.timerForm.value);
    }

    this.router.navigate(['/']);
  }

  onCancel(): void {
    if (this.timerForm.dirty) {
      this.confirmService.showConfirm('Are you sure, you want to remove an employee')
        .pipe(
          filter(value => value)
        )
        .subscribe(value => {
          this.router.navigate(['/']);
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.routeConfig.path === 'add') {
      return;
    }

    this.timerId = this.activatedRoute.snapshot.params.id;
    const timer = this.timerService.getById(this.timerId);

    if (!timer) {
      this.router.navigate(['/']);
    }

    this.timerForm.patchValue({
      name: timer.name,
      duration: timer.getTimeLeft()
    });
  }
}
