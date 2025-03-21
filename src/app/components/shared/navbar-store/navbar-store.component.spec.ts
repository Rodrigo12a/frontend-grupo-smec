import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarStoreComponent } from './navbar-store.component';

describe('NavbarStoreComponent', () => {
  let component: NavbarStoreComponent;
  let fixture: ComponentFixture<NavbarStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
