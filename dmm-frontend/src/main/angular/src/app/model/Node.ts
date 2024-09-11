import { BaseLinkedObject } from "./BaseLinkedObject";

export interface Node extends BaseLinkedObject {
    description : string
    kind : 'ROOT' | 'DIALOG' | 'CHOICE'
    text? : string
}