import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { ClientsService } from '../clients.service';
// helpers
import { formatDate, getAge } from 'src/shared/handleDates';

@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss'],
})
export class FormClientsComponent implements OnInit {
  form: FormGroup;

  alertType: string;
  submitted = false;
  message: string;

  userSelected: any;

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [
        this.clientsService.userSelected.nome,
        [Validators.required, Validators.minLength(5)],
      ],
      email: [
        this.clientsService.userSelected.email,
        [Validators.required, Validators.email],
      ],
      cpf: [this.clientsService.userSelected.cpf, Validators.required],
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

    this.clientsService.updateClient(this.form.value).subscribe(
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
