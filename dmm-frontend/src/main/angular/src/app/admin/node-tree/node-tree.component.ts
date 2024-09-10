import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrl: './node-tree.component.scss'
})
export class NodeTreeComponent {

  nodeTree : string = '';

  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.apiService.getResource('nodes').subscribe(
      (response) => {
        console.log(JSON.stringify(response, null, 4));
        this.nodeTree = JSON.stringify(response, null, 4);
      }
    );
  }
}
