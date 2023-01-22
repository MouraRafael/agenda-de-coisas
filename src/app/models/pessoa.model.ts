import { Endereco } from "./endereco.model";
import { Aluno } from "./aluno.model";

export class Pessoa {
  uid!:string;
  id!:string;
  username!:string;
  senha!:string;
  nome!:string
  email!:string;
  cpf!:number;

  Alunos!: Aluno[];
  endereco!:Endereco;

}
