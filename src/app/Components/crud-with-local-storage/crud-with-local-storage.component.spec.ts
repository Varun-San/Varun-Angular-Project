import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudWithLocalStorageComponent } from './crud-with-local-storage.component';

describe('CrudWithLocalStorageComponent', () => {
  let component: CrudWithLocalStorageComponent;
  let fixture: ComponentFixture<CrudWithLocalStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudWithLocalStorageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudWithLocalStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
