import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Node } from '../../model/Node';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrl: './node-tree.component.scss'
})
export class NodeTreeComponent {

  nodeTree : string = '';

  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.apiService.getItemResource<Node>('http://localhost:8080/dump-master-melito/nodes/2', 'nodes', true).then(
      (response) => {
        console.log(JSON.stringify(response, null, 4));
        this.nodeTree = JSON.stringify(response, null, 4);
      }
    ).catch(
      (error)=> {
        console.warn(`Could not display nodes: ${JSON.stringify(error)}`);
      }
    );
  }
}
