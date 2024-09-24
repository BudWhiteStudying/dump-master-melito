import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeCreationComponent } from './node-creation.component';

describe('NodeCreationComponent', () => {
  let component: NodeCreationComponent;
  let fixture: ComponentFixture<NodeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NodeCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
