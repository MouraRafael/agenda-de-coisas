import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,sendPasswordResetEmail } from '@angular/fire/auth';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
  ) { }

  registraUsuario(usuario: Pessoa){
    return  createUserWithEmailAndPassword(
        this.auth,
        usuario.email,
        usuario.senha
      )
  }

  async login(usuario: Pessoa) {
    try {
      const user = signInWithEmailAndPassword(
        this.auth,
        usuario.email,
        usuario.senha
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async esqueciSenha(email:string){
    const mail = sendPasswordResetEmail(this.auth,email);
    return mail;

  }

  logout() {
    return signOut(this.auth);
  }
}
