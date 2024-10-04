import { Component, inject } from '@angular/core';
import { Node } from '../../model/Node';
import { from, map, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NodeDeletionComponent } from '../node-deletion/node-deletion.component';
import { NodeCreationComponent } from '../node-creation/node-creation.component';
import { TranslationService } from '../../services/translation.service';
import { SettingsService } from '../../services/settings.service';
import { NodesService } from '../../services/nodes.service';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrl: './node-tree.component.scss'
})
export class NodeTreeComponent {

  selectedNodeInitialState? : Node = undefined;
  selectedNode? : Node = undefined;
  opened: boolean = false;
  dataSource : Node[] = [];
  hasChildCache: Map<number, Observable<boolean>> = new Map();

  updateInProgress : boolean = false;
  updateCompleted : boolean = false;
  updateFailed : boolean = false;
  readonly dialog = inject(MatDialog);

  constructor(
    public translationService : TranslationService,
    public settingsService : SettingsService,
    private nodesService : NodesService
  ){
    this.initializeDatasource();
  }

  openDeletionDialog(nodeToDelete : Node, event? : MouseEvent): void {
    event?.stopPropagation();
    const dialogRef = this.dialog.open(NodeDeletionComponent, {
      data: nodeToDelete,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.debug(`The deletion dialog was closed, result is ${result}`);
      if(result) {
        this.initializeDatasource();
      }
    });
  }

  openCreationDialog(parentNode : Node, event? : MouseEvent): void {
    event?.stopPropagation();
    const dialogRef = this.dialog.open(NodeCreationComponent, {
      data: parentNode.id,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.debug(`The creation dialog was closed, result is ${result}`);
      if(result) {
        this.hasChildCache.delete(parentNode.id!);
        this.initializeDatasource();
      }
    });
  }
  
  childrenAccessor = (node: Node) => from(this.nodesService.getNodes(node.id!)) ?? [];

  hasChild = (node: Node) => {
    if(!node || node.id===undefined || node.id===null) {
      console.debug('hasChild invoked with null argument, returning false')
      return of(false);
    }
    if (this.hasChildCache.has(node.id)) {
      return this.hasChildCache.get(node.id)!;
    }
        // If not cached, compute and cache it
        const observable = this.nodesService.countNodeChildren(node.id).pipe(
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
    this.selectedNodeInitialState = {
      id : node.id,
      description : node.description,
      kind : node.kind,
      _links : node._links
    };
    this.selectedNode = {
      id : node.id,
      description : node.description,
      kind : node.kind,
      _links : node._links
    };
    
    // this.nodesService.getFullNode(node.id!).subscribe(
    //   response => {
    //     console.debug(`full node is ${JSON.stringify(response, null, 4)}`)
    //   }
    // )
  }

  hasBeenModified(node : Node) : boolean {
    const isModified = node.description !== this.selectedNodeInitialState!.description
    || node.kind !== this.selectedNodeInitialState!.kind;
    return isModified;
  }

  updateNode(node : Node) {
    console.debug(`updating node ${node.id}`);
    this.updateInProgress = true;
    this.nodesService.updateNode(node).subscribe(
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

  initializeDatasource() {
    this.nodesService.getNodes().subscribe(
      response => {
        console.debug(`fetched initial data:\n${JSON.stringify(response, null, 4)}`)
        this.dataSource = response
      }
    );
  }
}
