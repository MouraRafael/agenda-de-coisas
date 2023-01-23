import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SenhaEsquecidaComponent } from './senha-esquecida.component';

describe('SenhaEsquecidaComponent', () => {
  let component: SenhaEsquecidaComponent;
  let fixture: ComponentFixture<SenhaEsquecidaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SenhaEsquecidaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SenhaEsquecidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
