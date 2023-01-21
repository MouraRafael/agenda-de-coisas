import { Endereco } from "./endereco.model";
import { Materia } from "./materia.model";

export class Pessoa {
  uid!:string;
  id!:string;
  username!:string;
  senha!:string;
  nome!:string
  email!:string;
  cpf!:number;

  materias!: Materia[];
  endereco!:Endereco;

}
