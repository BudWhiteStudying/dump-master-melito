import { Component, inject, Input, model } from '@angular/core';
import { Node } from '../../model/Node';
import { ApiService } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-node-deletion',
  templateUrl: './node-deletion.component.html',
  styleUrl: './node-deletion.component.scss'
})
export class NodeDeletionComponent {
  readonly nodeToDelete = inject<Node>(MAT_DIALOG_DATA);
  deleted : Boolean = false;
  readonly deletedModel = model(this.deleted);

  constructor(private apiService: ApiService){}
  
  confirm() {
    console.debug('Confirmed');
    this.deleted = true;
    this.deleteNode(this.nodeToDelete);
  }

  deleteNode(node : Node) {
    console.debug(`deleting node ${node.id}`);
    this.apiService.deleteResource(`/nodes/${node.id}`).subscribe(
      response => {
        console.info(`Successfully deleted node ${node.id}, invoking callback`);
      }
      //TODO: handle error case
    );
  }
}
