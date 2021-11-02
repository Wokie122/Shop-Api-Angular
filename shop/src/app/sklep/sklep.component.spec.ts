import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SklepComponent } from './sklep.component';

describe('SklepComponent', () => {
  let component: SklepComponent;
  let fixture: ComponentFixture<SklepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SklepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SklepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
