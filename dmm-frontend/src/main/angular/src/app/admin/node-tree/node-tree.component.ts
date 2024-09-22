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

  updateInProgress : boolean = false;
  updateCompleted : boolean = false;
  updateFailed : boolean = false;


  constructor(private apiService: ApiService){
    this.getNodes().subscribe(
      response => {
        console.debug(`fetched initial data:\n${JSON.stringify(response, null, 4)}`)
        this.dataSource = response
      }
    );
  }
  
  childrenAccessor = (node: Node) => from(this.getNodes(node.id)) ?? [];

  hasChild = (node: Node) => {
    if(!node || node.id===undefined) {
      console.debug('hasChild invoked with null argument, returning false')
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

  setSelectedNode(node : Node, event? : MouseEvent) {
    event?.stopPropagation();
    this.selectedNode = {
      id : node.id,
      description : node.description,
      text : node.text,
      kind : node.kind,
      _links : node._links
    };
  }

  hasBeenModified(node : Node) : boolean {
    const nodeFromBackend : Node = this.dataSource.filter(n => n.id===node.id)[0];
    const isModified = node.description !== nodeFromBackend.description
    || node.kind !== nodeFromBackend.kind
    || node.text !== nodeFromBackend.text;
    return isModified;
  }

  updateNode(node : Node) {
    console.debug(`updating node ${node.id}`);
    this.updateInProgress = true;
    this.apiService.updateResource(`nodes/${node.id}`, node).subscribe(
      response => {
        this.updateInProgress = false;
        this.updateCompleted = true;
        this.dataSource = this.dataSource.map(
          n => n.id === node.id ? node : n
        );
        this.setSelectedNode(node);
        setTimeout(()=>this.updateCompleted = false, 1000);
        console.debug(JSON.stringify(response))
      }
      //TODO: handle error case
    );
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
