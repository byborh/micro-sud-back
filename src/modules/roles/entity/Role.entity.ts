import { Column, Entity, PrimaryColumn } from "typeorm";
import { RoleContract } from "../contracts/IRole";

@Entity("roles")
export class Role implements RoleContract {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;

    /*
    ----------------------------------------------------------------------------------
        Add liaisons here with other Entities
        Ex :
            - @OneToMany
                entityName: EntityName
            - @OneToMany
                entityName: EntityName
            - @ManyToMany
                entityName: EntityName
            - @ManyToMany
                entityName: EntityName
    ----------------------------------------------------------------------------------
    */

    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public getId(): string { return this.id; }
    public getName(): string { return this.name; }
    public getDescription(): string { return this.description; }

    public setId(id: string): void { this.id = id; }
    public setName(name: string): void { this.name = name; }
    public setDescription(description: string): void { this.description = description; }
}