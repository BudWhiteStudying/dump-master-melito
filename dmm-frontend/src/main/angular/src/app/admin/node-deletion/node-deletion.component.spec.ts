import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDeletionComponent } from './node-deletion.component';

describe('NodeDeletionComponent', () => {
  let component: NodeDeletionComponent;
  let fixture: ComponentFixture<NodeDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NodeDeletionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
