import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Firestore,doc, collection,setDoc, collectionData, docSnapshots } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { map, Observable } from 'rxjs';


import { Pessoa } from '../models/pessoa.model';


const NOME_DB = 'pessoas';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private auth: Auth,
    private fireStore: Firestore
  ) {}

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

  logout() {
    return signOut(this.auth);
  }






  //FireStore
  cadastra(pessoa: Pessoa): Promise<void>{
    const document = doc(collection(this.fireStore, NOME_DB));
    return setDoc(document, pessoa)
  }


  listar():Observable<Pessoa[]>{
    const pessoasCollection = collection(this.fireStore,NOME_DB);

    return collectionData(pessoasCollection, {idField: 'uid'})
    .pipe(
      map(result => result as Pessoa[])
    );
  }

  buscarUserName(user: string):Observable<Pessoa[]>{
    const listaDePessoas = this.listar();

    return listaDePessoas.pipe(
      map((usuarios)=>
      usuarios.filter((pessoa)=>{

        const nome = pessoa.username;

        return nome.match(user)
      })
      )
    )
  }
  buscarEmail(mail: string):Observable<Pessoa[]>{
    const listaDePessoas = this.listar();

    return listaDePessoas.pipe(
      map((usuarios)=>
      usuarios.filter((pessoa)=>{

        const nome = pessoa.email;

        return nome.match(mail)
      })
      )
    )
  }


  encontrarPorId(id:string):Observable<Pessoa>{
    const document = doc(this.fireStore, `${NOME_DB}/${id}`);

    return docSnapshots(document).pipe(
      map(doc =>{
        const id = doc.id;
        const data = doc.data();

        return { id, ...data } as Pessoa;
      })
    );
  }

  atualizar(pessoa:Pessoa): Promise<void>{
    const document = doc(this.fireStore, NOME_DB, pessoa?.id)
    const {id, ...data} = pessoa;

    return setDoc(document,data)
  }
  remover(id: string): Promise<void>{
    const document = doc(this.fireStore, NOME_DB,id)
    return deleteDoc(document)
  }
}
