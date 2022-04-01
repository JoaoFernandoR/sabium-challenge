import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clients = [];
  userSelected: any;
  constructor(private http: HttpClient) {}

  getClients() {
    return this.http
      .get('https://sabium-challenge.herokuapp.com/api/v1/pacients/')
      .subscribe((data: any) => {
        this.clients = data.data;
      });
  }

  createClient(values: any) {
    return this.http.post<any>(
      'https://sabium-challenge.herokuapp.com/api/v1/pacients/',
      values
    );
  }

  updateClient(values: any) {
    return this.http.patch<any>(
      `https://sabium-challenge.herokuapp.com/api/v1/pacients/${this.userSelected._id}`,
      values
    );
  }

  deleteClient() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: this.userSelected._id,
      },
    };

    return this.http.delete<any>(
      `https://sabium-challenge.herokuapp.com/api/v1/pacients/`,
      options
    );
  }
}
