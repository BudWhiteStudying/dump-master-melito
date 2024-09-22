import { Link } from "./Link";

export interface BaseLinkedObject {
    _links: Record<string, Link> | null
    _embedded?: Record<string, BaseLinkedObject[]>
    [key: string]: any;
}