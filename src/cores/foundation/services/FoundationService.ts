import { TFoundation } from "../contracts/TFoundation";
import { Foundation } from "../domain/Foundation";
import { FoundationRepositoryMySQL } from "../repositories/FoundationRepositoryMySQL";
import { ETable } from "../contracts/ETable";
import { IdGenerator } from "@core/cryptography/idGenerator";

export class FoundationService {
    private foundationRepository: FoundationRepositoryMySQL;
    constructor(foundationRepository: FoundationRepositoryMySQL) {this.foundationRepository = foundationRepository;}

    // Utils
    private validateRequiredFields<T extends TFoundation>(resource: Foundation<T>, fields: (keyof Foundation<T>)[]): void {
        for (const field of fields) {
            if (!resource[field]) {
                throw new Error(`Field '${String(field)}' is required.`);
            }
        }
    }    


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
    


    async createResource<T extends TFoundation>(table: ETable, resource: Foundation<T>, lengthId: number, fieldToVerify?: keyof T, valueToVerify?: string): Promise<Foundation<T> | null> {
        try {
            // Verify if table is provided
            if(!table || !Object.values(resource).includes(table)) {
                throw new Error("Table is required or invalid table name.");
            }

            if(fieldToVerify && valueToVerify) {
                const field: string = String(fieldToVerify);
                // Verify if this Resource exist
                const resourceVerif: Foundation<T> | null = await this.getResourceByField<T>(field, table, valueToVerify);
                if(resourceVerif) return null;
            }


            // Declare variables
            let resourceId: string;
            let existingResource: Foundation<T> | null;
            
            // Initialize IdGenerator
            const idGenerator = IdGenerator.getInstance();
        
            // Make sure that ID is unique
            do {
                resourceId = idGenerator.generateId(lengthId); // Generate a unique ID of 16 characters
        
                // Verify if this id exist
                existingResource = await this.getResourceByField<T>("id", table, resourceId);
        
            } while (existingResource !== null);
        
            console.log(`Generated ID: ${resourceId}, for table: ${table}`);

            // Assign id to resource
            resource.data.setId(resourceId);


            // Création de la ressource via le repository
            const createdResource = await this.foundationRepository.createResource<T>(table, resource);
    
            if (!createdResource) {
                console.error("Failed to create resource in repository.");
                return null;
            }
    
            console.log("Resource created successfully in foundation repository:", createdResource);
    
            return createdResource;
        } catch (error) {
            console.error("Error creating resource in FoundationService:", error);
            throw new Error(`Failed to create resource: ${error}`);
        }
    }
     
    
    

    async modifyResource<T extends TFoundation>(
        table: ETable,
        resource: Foundation<T>,
        updatedFields: Partial<T>,
        keyField: keyof T = "id"
    ): Promise<Foundation<T> | null> {
        try {
            // Validation des paramètres
            if (!keyField || !table || !resource || !resource.data[keyField]) {
                throw new Error("Table, resource, updated fields, and key field value are required.");
            }
    
            // Vérifiez si la table est valide
            if (!Object.values(ETable).includes(table)) {
                throw new Error("Invalid table name.");
            }
    
            // Récupérez la ressource existante
            const existingResource: Foundation<T> | null = await this.getResourceByField(
                keyField as string,
                table,
                resource.data[keyField]
            );
    
            if (!existingResource) {
                console.error("Resource not found:", resource);
                throw new Error("Resource not found.");
            }
    
            console.log("Existing resource:", existingResource);
    
            // Fusionner les champs mis à jour avec les données existantes
            const mergedData = {
                ...existingResource.data,
                ...updatedFields,
            };
    
            // Comparez les données fusionnées avec l'original
            const hasChanges = this.compareResourceValues(existingResource.data, mergedData);
            if (!hasChanges) {
                console.log("No changes detected.");
                return null;
            }
    
            // Mettez à jour la ressource avec les nouvelles données
            resource.data = mergedData;
    
            // Modifiez la ressource dans le dépôt
            const modifiedResource: Foundation<T> = await this.foundationRepository.modifyResource(
                table,
                resource,
                keyField as string
            );
    
            if (!modifiedResource) {
                throw new Error("Failed to modify resource in repository.");
            }
    
            return modifiedResource;
        } catch (error) {
            console.error("Error modifying resource in FoundationService:", error);
            throw new Error("Failed to modify resource.");
        }
    }


    async modifyResource1<T extends TFoundation>(
        table: ETable,
        resource: Foundation<T>,
        updatedFields: Partial<T>,
        keyField: keyof T = "id"
    ): Promise<Foundation<T> | null> {
        try {
            // Validation des paramètres
            if (!keyField || !table || !resource || !resource.data[keyField]) {
                throw new Error("Table, resource, updated fields, and key field value are required.");
            }
    
            // Vérifiez si la table est valide
            if (!Object.values(ETable).includes(table)) {
                throw new Error("Invalid table name.");
            }
    
            // Récupérez la ressource existante
            const existingResource: Foundation<T> | null = await this.getResourceByField(
                keyField as string,
                table,
                resource.data[keyField]
            );
    
            if (!existingResource) {
                console.error("Resource not found:", resource);
                throw new Error("Resource not found.");
            }
    
            console.log("Existing resource:", existingResource);
    
            // Fusionner les champs mis à jour avec les données existantes
            const mergedData = {
                ...existingResource.data,
                ...updatedFields,
            };
    
            // Comparez les données fusionnées avec l'original
            const hasChanges = this.compareResourceValues(existingResource.data, mergedData);
            if (!hasChanges) {
                console.log("No changes detected.");
                return null;
            }
    
            // Mettez à jour la ressource avec les nouvelles données
            resource.data = mergedData;
    
            // Modifiez la ressource dans le dépôt
            const modifiedResource: Foundation<T> = await this.foundationRepository.modifyResource(
                table,
                resource,
                keyField as string
            );
    
            if (!modifiedResource) {
                throw new Error("Failed to modify resource in repository.");
            }
    
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