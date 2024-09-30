import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Node } from '../../model/Node';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrl: './node-details.component.scss'
})
export class NodeDetailsComponent {

  @Input() node! : Node;
  @Output() nodeChange : EventEmitter<Node> = new EventEmitter();
}
