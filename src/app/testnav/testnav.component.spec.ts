
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestnavComponent } from './testnav.component';

describe('TestnavComponent', () => {
  let component: TestnavComponent;
  let fixture: ComponentFixture<TestnavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestnavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
