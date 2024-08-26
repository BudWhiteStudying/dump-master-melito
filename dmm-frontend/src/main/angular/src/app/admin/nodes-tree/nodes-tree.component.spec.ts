import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesTreeComponent } from './nodes-tree.component';

describe('NodesTreeComponent', () => {
  let component: NodesTreeComponent;
  let fixture: ComponentFixture<NodesTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NodesTreeComponent]
    });
    fixture = TestBed.createComponent(NodesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
