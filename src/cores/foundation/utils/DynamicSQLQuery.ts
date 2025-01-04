import { TFoundation } from "../contracts/TFoundation";
import { Foundation } from "../domain/Foundation";

export class DynamicSQLQuery {
    private static instance: DynamicSQLQuery;

    private constructor() {};

    public static getInstance(): DynamicSQLQuery {
        if(!DynamicSQLQuery.instance) {
            DynamicSQLQuery.instance = new DynamicSQLQuery();
        }
        return DynamicSQLQuery.instance;
    }

    private static validateTable(table: string): boolean {
        const tables: string[] = ["users", "permissions", "roles"];
        return tables.includes(table);
    }

    public static generateSelectQuery(table: string, specificField?: string): { query: string; params: any[] } {
        if (!this.validateTable(table)) {
            throw new Error(`Invalid table name: ${table}`);
        }

        const query = specificField
            ? `SELECT * FROM ${table} WHERE ${specificField} = ?;`
            : `SELECT * FROM ${table};`;

        const params = specificField ? [specificField] : [];

        return { query, params };
    }

    public static generateInsertQuery<T extends TFoundation>(table: string, resource: Foundation<T>): { query: string; params: any[] } {
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

    public static generateUpdateQuery<T extends TFoundation>(table: string, resource: Foundation<T>, specificField: string): { query: string; params: any[] } {
        if (!this.validateTable(table)) {
            throw new Error(`Invalid table name: ${table}`);
        }

        const keys = Object.keys(resource.data);
        const params = Object.values(resource.data);
        const updateFields = keys.map(key => `${key} = ?`).join(", ");
        const query = `UPDATE ${table} SET ${updateFields} WHERE id = ?;`;
        params.push(specificField);

        return { query, params };
    }

    public static generateDeleteQuery(table: string, specificField: string): { query: string; params: any[] } {
        if (!this.validateTable(table)) {
            throw new Error(`Invalid table name: ${table}`);
        }

        const query = `DELETE FROM ${table} WHERE id = ?;`;
        const params = [specificField];

        return { query, params };
    }
}
