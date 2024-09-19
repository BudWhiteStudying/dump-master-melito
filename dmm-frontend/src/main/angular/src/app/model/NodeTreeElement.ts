import { BaseLinkedObject } from "./BaseLinkedObject";
import { Link } from "./Link";
import { Node } from "./Node";

export class NodeTreeElement {
    id: number;
    description: string;
    kind: "ROOT" | "DIALOG" | "CHOICE";
    text?: string | undefined;
    expandable : boolean;
    level : number;
    children : NodeTreeElement[];

    constructor(node : Node, children : Node[], level : number) {
        this.id = node.id;
        this.description = node.description;
        this.kind = node.kind;
        this.text = node.text;
        this.children = children.map(c => new NodeTreeElement(c, [], level+1)); // this is not ok, breaks after 1 level
        this.expandable = children.length>0;
        this.level = level;
    }
}