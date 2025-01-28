"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicSQLQuery = void 0;
class DynamicSQLQuery {
    constructor() { }
    ;
    static getInstance() {
        if (!DynamicSQLQuery.instance) {
            DynamicSQLQuery.instance = new DynamicSQLQuery();
        }
        return DynamicSQLQuery.instance;
    }
    static validateTable(table) {
        const tables = ["users", "permissions", "roles"];
        return tables.includes(table);
    }
    static generateSelectQuery(table, specificField) {
        if (!this.validateTable(table)) {
            throw new Error(`Invalid table name: ${table}`);
        }
        const query = specificField
            ? `SELECT * FROM ${table} WHERE ${specificField} = ?;`
            : `SELECT * FROM ${table};`;
        const params = specificField ? [specificField] : [];
        return { query, params };
    }
    static generateInsertQuery(table, resource) {
        if (!this.validateTable(table)) {
            throw new Error(`Invalid table name: ${table}`);
        }
        const keys = Object.keys(resource.data);
        const params = Object.values(resource.data);
        const columns = keys.join(", ");
        const placeholders = keys.map(() => "?").join(", ");
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders});`;
        return { query, params };
    }
    static generateUpdateQuery(table, resource, specificField = "id") {
        if (!this.validateTable(table)) {
            throw new Error(`Invalid table name: ${table}`);
        }
        // Obtenez uniquement les champs à mettre à jour
        const keys = Object.keys(resource.data);
        const params = Object.values(resource.data);
        // Créez la clause SET
        const updateFields = keys.map(key => `${key} = ?`).join(", ");
        // Construisez la requête avec WHERE basé sur specificField
        const query = `UPDATE ${table} SET ${updateFields} WHERE ${String(specificField)} = ?;`;
        params.push(resource.data[specificField]);
        return { query, params };
    }
    static generateDeleteQuery(table, specificField) {
        if (!this.validateTable(table)) {
            throw new Error(`Invalid table name: ${table}`);
        }
        const query = `DELETE FROM ${table} WHERE id = ?;`;
        const params = [specificField];
        return { query, params };
    }
}
exports.DynamicSQLQuery = DynamicSQLQuery;
