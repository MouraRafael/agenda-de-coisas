import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';
import { Pessoa } from '../models/pessoa.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  userPersonalData!:Pessoa

  constructor(
    private authService:AuthService,
    private auth:Auth,
    private firebaseService:FirebaseService
  ) {}

  ngOnInit(): void {
    this.firebaseService.encontrarPorId(this.auth.currentUser!.uid).subscribe(res=>{
      this.userPersonalData = res
    })
  }

}
