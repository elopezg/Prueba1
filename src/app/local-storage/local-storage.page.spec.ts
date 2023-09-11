import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalStoragePage } from './local-storage.page';

describe('LocalStoragePage', () => {
  let component: LocalStoragePage;
  let fixture: ComponentFixture<LocalStoragePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalStoragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
