import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Node } from '../../model/Node';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMPTY_NODE } from '../../model/Constants';

@Component({
  selector: 'app-node-creation',
  templateUrl: './node-creation.component.html',
  styleUrl: './node-creation.component.scss'
})
export class NodeCreationComponent {

  readonly parentNodeId = inject<number>(MAT_DIALOG_DATA);
  nodeToCreate : Node = EMPTY_NODE ;

  constructor(
    public dialogRef: MatDialogRef<NodeCreationComponent>,
    private apiService: ApiService){}
  
  confirm() {
    console.debug('Confirmed');
    this.createNode(this.nodeToCreate, this.parentNodeId);
  }

  createNode(nodeToCreate : Node, parentNodeId : number) {
    console.debug(`creating new node`);
    this.apiService.createResource(`/nodes`, nodeToCreate).subscribe(
      creationResponse => {
        console.debug(`new node created with id ${creationResponse.id}`)
        this.apiService.createRelationship('/nodes', 'parent', creationResponse.id!, parentNodeId).subscribe(
          relationshipResponse => {
            console.log('relationship created');
            this.dialogRef.close(true);
          }
        )
      }
      //TODO: handle error case
    );
  }
}
