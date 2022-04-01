import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { ClientsService } from '../clients.service';
// helpers
import { formatDate, getAge } from 'src/shared/handleDates';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  form: FormGroup;

  alertType: string;
  submitted = false;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.message = '';
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formattedDate = formatDate(this.form.value.dataNascimento);

    if (getAge(formattedDate)) {
      this.alertType = 'danger';
      this.message = 'Sua idade deve ser maior que 18 anos';
      return;
    }
    this.form.patchValue({
      dataNascimento: formattedDate,
    });

    console.log(this.form.value);

    this.clientsService.createClient(this.form.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.alertType = 'danger';
        this.message = error.error.message;
      }
    );
  }
}
