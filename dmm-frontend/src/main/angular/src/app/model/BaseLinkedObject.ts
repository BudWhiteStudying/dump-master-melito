import { Link } from "./Link";

export interface BaseLinkedObject {
    _links: Record<string, Link>
    _embedded?: Record<string, BaseLinkedObject[]>
    [key: string]: any;
}