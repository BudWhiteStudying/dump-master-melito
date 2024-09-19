import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Node } from '../../model/Node';
import { from } from 'rxjs';

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

  constructor(private apiService: ApiService){
    this.getNodes().then(
      response => {
        console.info(`fetched initial data:\n${JSON.stringify(response, null, 4)}`)
        this.dataSource = response
      }
    );
  }
  
  childrenAccessor = (node: Node) => from(this.getNodes(node.id)) ?? [];

  hasChild = async (_: number, node: Node) => {
    let childrenCount = await this.countChildren(node.id);
    console.debug(`hasChild is about to return ${childrenCount > 0}`);
    return childrenCount > 0;
  };

  setSelectedNode(event : MouseEvent, node : Node) {
    event.stopPropagation();
    this.selectedNode = node;
  }

  async getNodes(nodeId? : number) : Promise<Node[]> {
    if(nodeId || nodeId===0) {
      return await this.apiService.getCollectionResource<Node>(`http://localhost:8080/dump-master-melito/nodes/search/findByParentId?parentId=${nodeId}`, 'nodes');
    }
    else {
      return await this.apiService.getCollectionResource<Node>('http://localhost:8080/dump-master-melito/nodes/search/findByParentIsNull', 'nodes');
    }
  }

  async countChildren(nodeId : number) {
    return await this.apiService.getNumber(`nodes/search/countByParentId?parentId=${nodeId}`);
  }

  async getFullNodeTree(vertexNodeId : number) {
    return await this.apiService.getItemResource<Node>(`http://localhost:8080/dump-master-melito/nodes/${vertexNodeId}`, 'node', true)
  }
}
