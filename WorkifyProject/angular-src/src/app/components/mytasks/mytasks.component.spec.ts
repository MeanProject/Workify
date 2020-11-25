import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytasksComponent } from './mytasks.component';

describe('MytasksComponent', () => {
  let component: MytasksComponent;
  let fixture: ComponentFixture<MytasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
