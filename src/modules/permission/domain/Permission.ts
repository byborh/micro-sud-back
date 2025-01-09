import { PermissionContract } from "../contracts/IPermission";

export class Permission implements PermissionContract {
    id: string;
    action: string;
    resource: string;
    description: string;

    public data: Record<string, any>;

    constructor(id: string, action: string, resource: string, description: string) {
        this.id = id;
        this.action = action;
        this.resource = resource;
        this.description = description;
    }

    public getId(): string { return this.id; }
    public getAction(): string { return this.action; }
    public getResource(): string { return this.resource; }
    public getDescription(): string { return this.description; }

    public setId(id: string): void { this.id = id; }
    public setAction(action: string): void { this.action = action; }
    public setResource(resource: string): void { this.resource = resource; }
    public setDescription(description: string): void { this.description = description; }
}