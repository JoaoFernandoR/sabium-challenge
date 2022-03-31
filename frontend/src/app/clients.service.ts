import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clients = [];
  constructor(private http: HttpClient) {}

  getClients() {
    return (
      this.http
        .get('http://localhost:3222/api/v1/pacients/')
        // .get('https://odapp-challenge.herokuapp.com/api/v1/pacients/')
        .subscribe((data: any) => {
          this.clients = data.data;
        })
    );
  }

  createClient(values: any) {
    return this.http.post<any>(
      'http://localhost:3222/api/v1/pacients/',
      values
    );
  }
}
