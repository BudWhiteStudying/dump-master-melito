import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Node } from '../model/Node';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  constructor(private apiService: ApiService) {}

  updateNode(node : Node) {
    console.debug(`updating node ${node.id}`);
    return this.apiService.updateResource(`/nodes/${node.id}`, node);
  }

  getNodes(nodeId? : number) : Observable<Node[]> {
    if(nodeId || nodeId===0) {
      return this.apiService.getCollectionResource<Node>(`/nodes/search/findByParentId?parentId=${nodeId}`, 'nodes');
    }
    else {
      return this.apiService.getCollectionResource<Node>('/nodes/search/findByParentIsNull', 'nodes');
    }
  }

  countNodeChildren(nodeId : number) : Observable<number> {
    return this.apiService.getNumber(`/nodes/search/countByParentId?parentId=${nodeId}`);
  }

  getFullNode(nodeId : number) : Observable<Node> {
    return (this.apiService.getItemResource<Node>(`/nodes/${nodeId}`, 'node', true) as Observable<Node>)
  }
}
