import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss'],
})
export class FormClientsComponent implements OnInit {
  userSelected: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userSelected = this.route.snapshot.queryParams.cpf;
  }
}
