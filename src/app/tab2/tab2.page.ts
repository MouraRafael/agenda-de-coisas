import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(
    private firebase:FirebaseService,
    private auth:Auth
  ) {}

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.firebase.listar().subscribe(res=>{
      console.log(res)
    });

  }

}
