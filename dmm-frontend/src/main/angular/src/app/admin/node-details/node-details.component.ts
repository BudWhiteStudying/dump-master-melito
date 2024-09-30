import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Node } from '../../model/Node';
import { NodeType } from '../../model/NodeType';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrl: './node-details.component.scss'
})
export class NodeDetailsComponent {

  nodeTypes = Object.values(NodeType);

  @Input() node! : Node;
  @Output() nodeChange : EventEmitter<Node> = new EventEmitter();
}
