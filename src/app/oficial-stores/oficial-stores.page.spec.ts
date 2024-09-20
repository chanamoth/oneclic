import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OficialStoresPage } from './oficial-stores.page';

describe('OficialStoresPage', () => {
  let component: OficialStoresPage;
  let fixture: ComponentFixture<OficialStoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OficialStoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
