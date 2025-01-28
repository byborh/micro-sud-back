import { IDatabase } from "@db/contract/IDatabase";
import { Foundation } from "../domain/Foundation";
import { TFoundation } from "../contracts/TFoundation";
import { ResultSetHeader } from "mysql2";

export class FoundationRepositoryMySQL {
    private db: IDatabase;
    
    constructor(db: IDatabase) {
        // Injection of database
        this.db = db;
    }

    async findResourceByField<T extends TFoundation>(table: string, field: string, value: string): Promise<Foundation<T> | null> {
        try {
            // SQL query generation
            const { query, params } = DynamicSQLQuery.generateSelectQuery(table, field);

            // Find a resource by field from the database
            const [rows]: [any[], any] = await this.db.query(query, params);

            console.log("Raw query result from findResourceByField in FoundationRepository:", rows);

            // Validate rows
            if (!rows || rows.length === 0) {
                console.error("No resource found for field:", field, "with value:", value);
                return null;
            };

            // Store the resource
            const resource: Foundation<T> = Array.isArray(rows) ? rows[0] : rows;

            console.log("Resource found:", resource);

            return resource;
        } catch(error) {
            console.error("Error finding resource by field:", error);
            throw new Error("Failed to find resource by field.");
        }
    }

    async findAllResources<T extends TFoundation>(table: string): Promise<Foundation<T>[] | null> {
        try {
            // SQL query
            const { query } = DynamicSQLQuery.generateSelectQuery(table);

            // Find all resources from the database
            const [rows]: [any[], any] = await this.db.query(query);

            console.log("Raw query result from findAllResources in FoundationRepository:", rows);

            // Validate rows
            if (!rows || rows.length === 0) {
                console.error("No resources found in the database");
                return null;
            };

            // Store the resources
            const resources: Foundation<T>[] = Array.isArray(rows) ? rows : [rows];

            console.log("Resources found:", resources);

            return resources;
        } catch(error) {
            console.error("Error finding all resources:", error);
            throw new Error("Failed to find all resources.");
        }
    }

    async createResource<T extends TFoundation>(table: string, resource: Foundation<T>): Promise<Foundation<T> | null> {
        try {
            const { query, params } = DynamicSQLQuery.generateInsertQuery(table, resource);

            // Execute the query
            const [result]: [ResultSetHeader, any] = await this.db.query(query, params);

            // Check if the resource was created
            if(result.affectedRows > 0) {
                console.log("Resource created:", resource);
                return new Foundation<T>(resource.data);
            }

            // Resource didn't created
            return null;
        } catch (error) {
            console.error("Error creating resource in FoundationRepository:", error);
            throw new Error("Failed to create resource.");
        }
    }

    async modifyResource<T extends TFoundation>(table: string, resource: Foundation<T>, field: string): Promise<Foundation<T> | null> {
        try {
            const { query, params } = DynamicSQLQuery.generateUpdateQuery(table, resource, field);

            // Execute the query
            const [result]: [ResultSetHeader, any] = await this.db.query(query, params);

            // Check if the resource was modified
            if(result.affectedRows > 0) {
                console.log("Resource modified:", resource);
                return new Foundation<T>(resource.data);
            }

            // Resource didn't modified
            return null;
        } catch (error) {
            console.error("Error modifying resource in FoundationRepository:", error);
            throw new Error("Failed to modify resource.");
        }
    }

    async deleteResource<T extends TFoundation>(table: string, field: string): Promise<boolean> {
        try {
            const { query, params } = DynamicSQLQuery.generateDeleteQuery(table, field);

            // Execute the query
            const [result]: [ResultSetHeader, any] = await this.db.query(query, params);

            // Return true if the resource is deleted, false otherwise
            return !result ? false : true;
        } catch (error) {
            console.error("Error deleting resource in FoundationRepository:", error);
            throw new Error("Failed to delete resource.");
        }
    }
}