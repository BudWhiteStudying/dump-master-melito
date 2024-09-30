import { BaseLinkedObject } from "./BaseLinkedObject";

export interface Node extends BaseLinkedObject {
    id : number | null;
    description : string
    kind : 'ROOT' | 'DIALOG' | 'CHOICE'
}