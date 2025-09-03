import { Database } from '../Database/Database.js';

export abstract class AbstractModel {
    protected tableName: string;
    protected database: Database;

    constructor(tableName: string) {
        this.tableName = tableName;
        this.database = Database.getInstance();
    }

    /**
     * Implemente o metodo load para carregar os dados do modelo.
     *
     * @returns this
     */
    public abstract load(...args: any[]): Promise<AbstractModel | null>;

    /**
     * Implemente o metodo save para salvar os dados do modelo.
     *
     * @returns self
     */
    public abstract save(): Promise<AbstractModel>;

    /**
    * Implemente o metodo delete para excluir os dados do modelo.
    *
    * @returns self
    */
    public abstract delete(): Promise<boolean>;


    public getTableName(): string {
        return this.tableName;
    }

}
