import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Node } from '../../model/Node';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrl: './node-tree.component.scss'
})
export class NodeTreeComponent {

  nodes : Node[] = [];

  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.loadNodes();
  }

  loadNodes(nodeId? : number){
    if(nodeId || nodeId===0) {
      this.apiService.getCollectionResource<Node>(`http://localhost:8080/dump-master-melito/nodes/search/findByParentId?parentId=${nodeId}`, 'nodes').then(
        (response) => {
          console.log(JSON.stringify(response, null, 4));
          this.nodes = response;
        }
      ).catch(
        (error)=> {
          console.warn(`Could not display nodes: ${JSON.stringify(error)}`);
        }
      );
    }
    else {
      this.apiService.getCollectionResource<Node>('http://localhost:8080/dump-master-melito/nodes/search/findByParentIsNull', 'nodes').then(
        (response) => {
          console.log(JSON.stringify(response, null, 4));
          this.nodes = response;
        }
      ).catch(
        (error)=> {
          console.warn(`Could not display nodes: ${JSON.stringify(error)}`);
        }
      );
    }
  }
}
