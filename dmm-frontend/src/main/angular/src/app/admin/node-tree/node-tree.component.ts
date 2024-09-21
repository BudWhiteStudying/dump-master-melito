import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Node } from '../../model/Node';
import { from, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrl: './node-tree.component.scss'
})
export class NodeTreeComponent {

  selectedNode? : Node = undefined;
  events: string[] = [];
  opened: boolean = false;
  dataSource : Node[] = [];
  hasChildCache: Map<number, Observable<boolean>> = new Map();


  constructor(private apiService: ApiService){
    this.getNodes().subscribe(
      response => {
        console.info(`fetched initial data:\n${JSON.stringify(response, null, 4)}`)
        this.dataSource = response
      }
    );
  }
  
  childrenAccessor = (node: Node) => from(this.getNodes(node.id)) ?? [];

  hasChild = (node: Node) => {
    if(!node || node.id===undefined) {
      console.log('hasChild invoked with null argument, returning false')
      return of(false);
    }
    if (this.hasChildCache.has(node.id)) {
      return this.hasChildCache.get(node.id)!;
    }
        // If not cached, compute and cache it
        const observable = this.countChildren(node.id).pipe(
          map(count => {
            console.log(`hasChild invoked with node id ${node.id}, returning ${count > 0}`);
            return count > 0;
          })
        );
    
        this.hasChildCache.set(node.id, observable);
    
        return observable;
  };

  setSelectedNode(event : MouseEvent, node : Node) {
    event.stopPropagation();
    this.selectedNode = node;
  }

  getNodes(nodeId? : number) : Observable<Node[]> {
    if(nodeId || nodeId===0) {
      return this.apiService.getCollectionResource<Node>(`http://localhost:8080/dump-master-melito/nodes/search/findByParentId?parentId=${nodeId}`, 'nodes');
    }
    else {
      return this.apiService.getCollectionResource<Node>('http://localhost:8080/dump-master-melito/nodes/search/findByParentIsNull', 'nodes');
    }
  }

  countChildren(nodeId : number) : Observable<number> {
    return this.apiService.getNumber(`nodes/search/countByParentId?parentId=${nodeId}`);
  }

  getFullNodeTree(vertexNodeId : number) : Observable<Node[] | Node | null> {
    return this.apiService.getItemResource<Node>(`http://localhost:8080/dump-master-melito/nodes/${vertexNodeId}`, 'node', true)
  }
}
