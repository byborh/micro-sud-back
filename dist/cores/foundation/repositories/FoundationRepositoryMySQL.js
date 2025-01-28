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
exports.FoundationRepositoryMySQL = void 0;
const Foundation_1 = require("../domain/Foundation");
const DynamicSQLQuery_1 = require("../utils/DynamicSQLQuery");
class FoundationRepositoryMySQL {
    constructor(db) {
        // Injection of database
        this.db = db;
    }
    findResourceByField(table, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // SQL query generation
                const { query, params } = DynamicSQLQuery_1.DynamicSQLQuery.generateSelectQuery(table, field);
                // Find a resource by field from the database
                const [rows] = yield this.db.query(query, params);
                console.log("Raw query result from findResourceByField in FoundationRepository:", rows);
                // Validate rows
                if (!rows || rows.length === 0) {
                    console.error("No resource found for field:", field, "with value:", value);
                    return null;
                }
                ;
                // Store the resource
                const resource = Array.isArray(rows) ? rows[0] : rows;
                console.log("Resource found:", resource);
                return resource;
            }
            catch (error) {
                console.error("Error finding resource by field:", error);
                throw new Error("Failed to find resource by field.");
            }
        });
    }
    findAllResources(table) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // SQL query
                const { query } = DynamicSQLQuery_1.DynamicSQLQuery.generateSelectQuery(table);
                // Find all resources from the database
                const [rows] = yield this.db.query(query);
                console.log("Raw query result from findAllResources in FoundationRepository:", rows);
                // Validate rows
                if (!rows || rows.length === 0) {
                    console.error("No resources found in the database");
                    return null;
                }
                ;
                // Store the resources
                const resources = Array.isArray(rows) ? rows : [rows];
                console.log("Resources found:", resources);
                return resources;
            }
            catch (error) {
                console.error("Error finding all resources:", error);
                throw new Error("Failed to find all resources.");
            }
        });
    }
    createResource(table, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, params } = DynamicSQLQuery_1.DynamicSQLQuery.generateInsertQuery(table, resource);
                // Execute the query
                const [result] = yield this.db.query(query, params);
                // Check if the resource was created
                if (result.affectedRows > 0) {
                    console.log("Resource created:", resource);
                    return new Foundation_1.Foundation(resource.data);
                }
                // Resource didn't created
                return null;
            }
            catch (error) {
                console.error("Error creating resource in FoundationRepository:", error);
                throw new Error("Failed to create resource.");
            }
        });
    }
    modifyResource(table, resource, field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, params } = DynamicSQLQuery_1.DynamicSQLQuery.generateUpdateQuery(table, resource, field);
                // Execute the query
                const [result] = yield this.db.query(query, params);
                // Check if the resource was modified
                if (result.affectedRows > 0) {
                    console.log("Resource modified:", resource);
                    return new Foundation_1.Foundation(resource.data);
                }
                // Resource didn't modified
                return null;
            }
            catch (error) {
                console.error("Error modifying resource in FoundationRepository:", error);
                throw new Error("Failed to modify resource.");
            }
        });
    }
    deleteResource(table, field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, params } = DynamicSQLQuery_1.DynamicSQLQuery.generateDeleteQuery(table, field);
                // Execute the query
                const [result] = yield this.db.query(query, params);
                // Return true if the resource is deleted, false otherwise
                return !result ? false : true;
            }
            catch (error) {
                console.error("Error deleting resource in FoundationRepository:", error);
                throw new Error("Failed to delete resource.");
            }
        });
    }
}
exports.FoundationRepositoryMySQL = FoundationRepositoryMySQL;
