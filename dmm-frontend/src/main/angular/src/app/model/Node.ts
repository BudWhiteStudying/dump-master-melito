import { BaseLinkedObject } from "./BaseLinkedObject";
import { NodeType } from "./NodeType";

export interface Node extends BaseLinkedObject {
    id : number | null;
    description : string
    kind : NodeType
}