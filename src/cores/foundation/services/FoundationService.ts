import { TFoundation } from "../contracts/TFoundation";
import { Foundation } from "../domain/Foundation";
import { FoundationRepositoryMySQL } from "../repositories/FoundationRepositoryMySQL";
import { ETable } from "../contracts/ETable";

export class FoundationService {
    private foundationRepository: FoundationRepositoryMySQL;
    constructor(foundationRepository: FoundationRepositoryMySQL) {this.foundationRepository = foundationRepository;}


    async getResourceByField<T extends TFoundation>(field: string, table: ETable, value: string): Promise<Foundation<T> | null> {
        try {
            // Verify if field, table and value are provided
            if(!field || !table || !value) {
                throw new Error("Field, table and value are required.");
            };

            if(!Object.values(ETable).includes(table)) { throw new Error("Invalid table name."); }

            // Call FoundationRepositoryMySQL to find a resource by field
            const resource: Foundation<T> = await this.foundationRepository.findResourceByField<T>(table, field, value);

            // If no resource is found, return null
            if(!resource) return null;

            // Return the resource
            return resource;
        } catch (error) {
            console.error("Error finding resource in FoundationService:", error);
            throw new Error("Failed to find resource.");
        }
    }

    
    async getAllResources<T extends TFoundation>(table: ETable): Promise<Foundation<T>[] | null> { 
        try {
            // Verify if table is provided
            if(!table || !Object.values(ETable).includes(table)) {
                throw new Error("Table is required or invalid table name.");
            };

            // Call FoundationRepositoryMySQL to find resources
            const resource: Foundation<T>[] = await this.foundationRepository.findAllResources<T>(table);

            // If no resources is found, return null
            if(!resource) return null;

            // Return the resource
            return resource;
        } catch (error) {
            console.error("Error finding resources in FoundationService:", error);
            throw new Error("Failed to find resources.");
        }
    }
    

    async createResource<T extends TFoundation>(table: ETable, resource: Foundation<T>): Promise<Foundation<T> | null> {
        try {
            // Verify if table is provided
            if(!table || !Object.values(resource).includes(table)) {
                throw new Error("Table is required or invalid table name.");
            }

            // Call FoundationRepositoryMySQL to find resources
            const createdResource: Foundation<T> = await this.foundationRepository.createResource<T>(table, resource);

            // If no resource is created, return null
            if(!createdResource) return null;

            // Return the resource
            return createdResource;            
        } catch (error) {
            console.error("Error creating resource in FoundationService:", error);
            throw new Error("Failed to create resource.");
        }
    }
    

    async modifyResource<T extends TFoundation>(table: ETable, resource: Foundation<T>, field: string): Promise<Foundation<T> | null> {
        try {
            // Verify if field, table and value are provided
            if(!field || !table || !resource) {
                throw new Error("Field, table and resource are required.");
            };

            // Verify if table is provided
            if(!Object.values(ETable).includes(table)) {
                throw new Error("Invalid table name.");
            };

            // Verify if iD is existant
            if (!resource.data.getId()) {
                console.error("Invalid resource ID provided for modification:", resource.data);
                throw new Error("Resource ID is required.");
            }

            // Verify if this resource exist
            const resourceVerif: Foundation<T> | null = await this.getResourceByField("id", table, resource.data.getId());
            if(!resourceVerif) {
                console.error("Resource not found:", resourceVerif);
                throw new Error("Resource not found.");
            }

            console.log("resourceVerif:", resourceVerif);



            // Call FoundationRepositoryMySQL to find resources
            const modifiedResource: Foundation<T> = await this.foundationRepository.modifyResource<T>(table, resource, field);

            // If no resource is created, return null
            if(!modifiedResource) return null;

            // Return the resource
            return modifiedResource;            
        } catch (error) {
            console.error("Error modifying resource in FoundationService:", error);
            throw new Error("Failed to modify resource.");
        }
    }
    
    
    async deleteResource<T extends TFoundation>(table: ETable, field: string): Promise<boolean> { 
        try {
            // Verify if field, table are provided
            if(!field || !table) {
                throw new Error("Field and table are required.");
            };

            // Verify if table is provided
            if(!Object.values(ETable).includes(table)) {
                throw new Error("Invalid table name.");
            };

            // Call FoundationRepositoryMySQL to find resources
            const isDeleted: boolean = await this.foundationRepository.deleteResource<T>(table, field);

            // Return true if the resource is deleted, false otherwise
            return isDeleted;
        } catch (error) {
            console.error("Error deleting resource in FoundationService:", error);
            throw new Error("Failed to delete resource.");
        }
    }

    // Compare dynamicly values of new and old resource
    private compareResourceValues<T>(oldResource: T, newResource: T): boolean {
        // Verify if objects arn't similare
        if (oldResource === newResource) return false;

        // Compare all proparties dynamicly
        const oldKeys = Object.keys(oldResource);
        for (const key of oldKeys) {
            // if the value c hanged, return true
            if (oldResource[key] !== newResource[key]) {
                return true;
            }
        }

        // No difference
        return false;
    }
}