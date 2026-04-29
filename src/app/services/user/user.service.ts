import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../../dto/user/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UserDTO[]>(this.baseUrl);
  }

  createUser(user: UserDTO) {
    return this.http.post<UserDTO>(this.baseUrl, user);
  }

  updateUser(user: UserDTO) {
    return this.http.put<UserDTO>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
