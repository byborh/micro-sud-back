import { FoundationRepositoryMySQL } from "../repositories/FoundationRepositoryMySQL";

export class FoundationService {
    private foundationRepository: FoundationRepositoryMySQL;
    constructor(foundationRepository: FoundationRepositoryMySQL) {this.foundationRepository = foundationRepository;}

    async getResourceByField(field: string, value: string): Promise<any> {}
}