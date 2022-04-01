import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Interfaces
import { ColDef, SelectionChangedEvent } from 'ag-grid-community';
// Services
import { ClientsService } from '../clients.service';

import { ModalListComponent } from './modal-list/modal-list.component';
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

  constructor(
    public clientService: ClientsService,
    private router: Router,
    private modalService: NgbModal
  ) {
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
    this.router.navigate(['/clients']);
  }

  deleteUser() {
    if (this.isClientSelected) {
      const modalRef = this.modalService.open(ModalListComponent, {
        centered: true,
        size: 'md',
      });
      this.isClientSelected = 0;
    }
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const rowCount = event.api.getSelectedNodes().length;
    this.isClientSelected = rowCount;

    const selectedRow = event.api.getSelectedRows();
    this.clientService.userSelected = selectedRow[0];
  }
}
