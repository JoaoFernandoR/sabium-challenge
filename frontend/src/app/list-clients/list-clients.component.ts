import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Interfaces
import {
  ColDef,
  RowSelectedEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';
// Services
import { ClientsService } from '../clients.service';

import ColumnDefs from './column-defs';
import DefaultColDef from './default-column-defs';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent implements OnInit {
  columnDefs: ColDef[] = ColumnDefs;
  defaultColDef = {};
  isClientSelected = 0;
  public clientSelected = {};

  constructor(public clientService: ClientsService, private router: Router) {
    this.columnDefs = ColumnDefs;
    this.defaultColDef = DefaultColDef;
  }

  ngOnInit(): void {
    this.clientService.getClients();
  }

  createUser() {
    this.router.navigateByUrl('/create');
  }

  editUser() {
    this.router.navigate(['/clients'], {
      queryParams: this.clientSelected,
    });
  }

  onRowSelected(event: RowSelectedEvent) {
    this.clientSelected = event.data;
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const rowCount = event.api.getSelectedNodes().length;
    this.isClientSelected = rowCount;
  }
}
