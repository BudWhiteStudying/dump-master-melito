import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Node } from '../../model/Node';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrl: './node-tree.component.scss'
})
export class NodeTreeComponent {

  selectedNode? : Node = undefined;
  events: string[] = [];
  opened: boolean = false;

  constructor(private apiService: ApiService){
    this.loadNodes().subscribe(
      response => {
        console.info('fetched initial data')
        this.dataSource = response
      }
    );
  }
  ngOnInit(): void {
  }
  
  

  childrenAccessor = (node: Node) => this.loadNodes(node.id) ?? [];
  dataSource : Node[] = [];

  hasChild = (_: number, node: Node) => true; //TODO: make this veritable

  setSelectedNode(event : MouseEvent, node : Node) {
    event.stopPropagation();
    this.selectedNode = node;
  }

  loadNodes(nodeId? : number) : Observable<Node[]> {
    if(nodeId || nodeId===0) {
      return from(this.apiService.getCollectionResource<Node>(`http://localhost:8080/dump-master-melito/nodes/search/findByParentId?parentId=${nodeId}`, 'nodes'));
    }
    else {
      return from(this.apiService.getCollectionResource<Node>('http://localhost:8080/dump-master-melito/nodes/search/findByParentIsNull', 'nodes'));
    }
  }
}
