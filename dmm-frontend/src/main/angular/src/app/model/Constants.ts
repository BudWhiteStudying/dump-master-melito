import { Node } from "./Node";
import { NodeType } from "./NodeType";

export const EMPTY_NODE : Node = {
    id : null,
    description : '',
    kind : NodeType.DIALOG,
    _links : null
};