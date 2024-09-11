import { BaseLinkedObject } from "./BaseLinkedObject";

export interface Node extends BaseLinkedObject {
    id : number;
    description : string
    kind : 'ROOT' | 'DIALOG' | 'CHOICE'
    text? : string
}