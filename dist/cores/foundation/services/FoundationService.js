"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundationService = void 0;
const ETable_1 = require("../contracts/ETable");
const idGenerator_1 = require("@core/cryptography/idGenerator");
class FoundationService {
    constructor(foundationRepository) { this.foundationRepository = foundationRepository; }
    // Utils
    validateRequiredFields(resource, fields) {
        for (const field of fields) {
            if (!resource[field]) {
                throw new Error(`Field '${String(field)}' is required.`);
            }
        }
    }
    getResourceByField(field, table, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify if field, table and value are provided
                if (!field || !table || !value) {
                    throw new Error("Field, table and value are required.");
                }
                ;
                if (!Object.values(ETable_1.ETable).includes(table)) {
                    throw new Error("Invalid table name.");
                }
                // Call FoundationRepositoryMySQL to find a resource by field
                const resource = yield this.foundationRepository.findResourceByField(table, field, value);
                // If no resource is found, return null
                if (!resource)
                    return null;
                // Return the resource
                return resource;
            }
            catch (error) {
                console.error("Error finding resource in FoundationService:", error);
                throw new Error("Failed to find resource.");
            }
        });
    }
    getAllResources(table) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify if table is provided
                if (!table || !Object.values(ETable_1.ETable).includes(table)) {
                    throw new Error("Table is required or invalid table name.");
                }
                ;
                // Call FoundationRepositoryMySQL to find resources
                const resource = yield this.foundationRepository.findAllResources(table);
                // If no resources is found, return null
                if (!resource)
                    return null;
                // Return the resource
                return resource;
            }
            catch (error) {
                console.error("Error finding resources in FoundationService:", error);
                throw new Error("Failed to find resources.");
            }
        });
    }
    createResource(table, resource, lengthId, fieldToVerify, valueToVerify) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify if table is provided
                if (!table || !Object.values(resource).includes(table)) {
                    throw new Error("Table is required or invalid table name.");
                }
                if (fieldToVerify && valueToVerify) {
                    const field = String(fieldToVerify);
                    // Verify if this Resource exist
                    const resourceVerif = yield this.getResourceByField(field, table, valueToVerify);
                    if (resourceVerif)
                        return null;
                }
                // Declare variables
                let resourceId;
                let existingResource;
                // Initialize IdGenerator
                const idGenerator = idGenerator_1.IdGenerator.getInstance();
                // Make sure that ID is unique
                do {
                    resourceId = idGenerator.generateId(lengthId); // Generate a unique ID of 16 characters
                    // Verify if this id exist
                    existingResource = yield this.getResourceByField("id", table, resourceId);
                } while (existingResource !== null);
                console.log(`Generated ID: ${resourceId}, for table: ${table}`);
                // Assign id to resource
                resource.data.setId(resourceId);
                // Création de la ressource via le repository
                const createdResource = yield this.foundationRepository.createResource(table, resource);
                if (!createdResource) {
                    console.error("Failed to create resource in repository.");
                    return null;
                }
                console.log("Resource created successfully in foundation repository:", createdResource);
                return createdResource;
            }
            catch (error) {
                console.error("Error creating resource in FoundationService:", error);
                throw new Error(`Failed to create resource: ${error}`);
            }
        });
    }
    modifyResource(table, resource, updatedFields, keyField = "id") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation des paramètres
                if (!keyField || !table || !resource || !resource.data[keyField]) {
                    throw new Error("Table, resource, updated fields, and key field value are required.");
                }
                // Vérifiez si la table est valide
                if (!Object.values(ETable_1.ETable).includes(table)) {
                    throw new Error("Invalid table name.");
                }
                // Récupérez la ressource existante
                const existingResource = yield this.getResourceByField(keyField, table, resource.data[keyField]);
                if (!existingResource) {
                    console.error("Resource not found:", resource);
                    throw new Error("Resource not found.");
                }
                console.log("Existing resource:", existingResource);
                // Fusionner les champs mis à jour avec les données existantes
                const mergedData = Object.assign(Object.assign({}, existingResource.data), updatedFields);
                // Comparez les données fusionnées avec l'original
                const hasChanges = this.compareResourceValues(existingResource.data, mergedData);
                if (!hasChanges) {
                    console.log("No changes detected.");
                    return null;
                }
                // Mettez à jour la ressource avec les nouvelles données
                resource.data = mergedData;
                // Modifiez la ressource dans le dépôt
                const modifiedResource = yield this.foundationRepository.modifyResource(table, resource, keyField);
                if (!modifiedResource) {
                    throw new Error("Failed to modify resource in repository.");
                }
                return modifiedResource;
            }
            catch (error) {
                console.error("Error modifying resource in FoundationService:", error);
                throw new Error("Failed to modify resource.");
            }
        });
    }
    modifyResource1(table, resource, updatedFields, keyField = "id") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation des paramètres
                if (!keyField || !table || !resource || !resource.data[keyField]) {
                    throw new Error("Table, resource, updated fields, and key field value are required.");
                }
                // Vérifiez si la table est valide
                if (!Object.values(ETable_1.ETable).includes(table)) {
                    throw new Error("Invalid table name.");
                }
                // Récupérez la ressource existante
                const existingResource = yield this.getResourceByField(keyField, table, resource.data[keyField]);
                if (!existingResource) {
                    console.error("Resource not found:", resource);
                    throw new Error("Resource not found.");
                }
                console.log("Existing resource:", existingResource);
                // Fusionner les champs mis à jour avec les données existantes
                const mergedData = Object.assign(Object.assign({}, existingResource.data), updatedFields);
                // Comparez les données fusionnées avec l'original
                const hasChanges = this.compareResourceValues(existingResource.data, mergedData);
                if (!hasChanges) {
                    console.log("No changes detected.");
                    return null;
                }
                // Mettez à jour la ressource avec les nouvelles données
                resource.data = mergedData;
                // Modifiez la ressource dans le dépôt
                const modifiedResource = yield this.foundationRepository.modifyResource(table, resource, keyField);
                if (!modifiedResource) {
                    throw new Error("Failed to modify resource in repository.");
                }
                return modifiedResource;
            }
            catch (error) {
                console.error("Error modifying resource in FoundationService:", error);
                throw new Error("Failed to modify resource.");
            }
        });
    }
    deleteResource(table, field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify if field, table are provided
                if (!field || !table) {
                    throw new Error("Field and table are required.");
                }
                ;
                // Verify if table is provided
                if (!Object.values(ETable_1.ETable).includes(table)) {
                    throw new Error("Invalid table name.");
                }
                ;
                // Call FoundationRepositoryMySQL to find resources
                const isDeleted = yield this.foundationRepository.deleteResource(table, field);
                // Return true if the resource is deleted, false otherwise
                return isDeleted;
            }
            catch (error) {
                console.error("Error deleting resource in FoundationService:", error);
                throw new Error("Failed to delete resource.");
            }
        });
    }
    // Compare dynamicly values of new and old resource
    compareResourceValues(oldResource, newResource) {
        // Verify if objects arn't similare
        if (oldResource === newResource)
            return false;
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
exports.FoundationService = FoundationService;
