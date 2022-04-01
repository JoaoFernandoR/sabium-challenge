import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from 'src/app/clients.service';

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.scss'],
})
export class ModalListComponent implements OnInit {
  constructor(
    private clientsService: ClientsService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  deleteClient() {
    this.clientsService.deleteClient().subscribe((data) => {
      if (data.status === 'success') {
        this.clientsService.clients = data.data;
        this.activeModal.dismiss('Button');
      }
    });
  }
}
