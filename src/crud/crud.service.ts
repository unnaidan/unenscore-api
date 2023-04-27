import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { set } from 'lodash';

export interface Delegate {
    findUnique(args: unknown): unknown;
    findMany(args: unknown): unknown;
    count(args: unknown): unknown;
    create(args: unknown): unknown;
    update(args: unknown): unknown;
    delete(args: unknown): unknown;
}

export interface PrismaWhereInput {
    AND?: unknown;
    OR?: unknown;
    NOT?: unknown;
};

export interface FindManyParams<T> {
    where?: T;
    search?: string;
    sortBy?: string;
    sortOrder?: Prisma.SortOrder;
    skip?: number;
    take?: number;
    orderBy?: any;
};

@Injectable()
export abstract class CrudService<D extends Delegate, WhereInput extends PrismaWhereInput, CreateInput, UpdateInput>  {
    public searchableFields: string[] = [];

    constructor(public delegate: D) { }

    /**
     * Many-to-many where condition.
     *
     * @param {string} attr
     * @param {object} condition
     * @returns  
     */
    static whereHas(attr: string, condition: object): any {
        const where = set({}, `${attr}.some`, condition);
        return {
            where
        };
    }

    /**
     * Returns entities that match conditions.
     *
     * @param {FindManyParams} params
     * @returns  
     */
    async findMany(params: FindManyParams<WhereInput>) {
        const {
            sortBy = 'createdAt',
            sortOrder = 'desc',
            where,
            search,
            skip,
            take,
            orderBy
        } = params;

        const args = {
            where,
            skip,
            take,
            orderBy: orderBy || set({}, sortBy, sortOrder)
        };

        if (search) {
            set(args, 'where.OR', this.searchableFields.map(field => set({}, `${field}.contains`, search)));
        }

        const [
            count,
            edges
        ] = await Promise.all([
            this.delegate.count({ where: args.where }),
            this.delegate.findMany(args)
        ]);

        return {
            count,
            edges
        };
    }

    /**
     * Returns specific entity.
     *
     * @param {string|null} id
     * @returns {Promise}
     */
    async find(id: string | null, includes?: string[]): Promise<any> {
        const where = {
            id
        };
        return id && await this.delegate.findUnique({
            include: includes?.reduce((previousValue, currentValue) => set(previousValue, currentValue, true), {}),
            where
        });
    }

    /**
     * Creates new entity.
     *
     * @param {CreateInput} data 
     * @returns  
     */
    async create(data: CreateInput): Promise<any> {
        return await this.delegate.create({
            data
        });
    }

    /**
     * Updates specific entity.
     *
     * @param {string} id 
     * @param {UpdateInput} data 
     * @returns  
     */
    async update(id: string, data: UpdateInput): Promise<any> {
        const where = {
            id
        };
        return await this.delegate.update({
            where,
            data
        });
    }

    /**
     * Deletes specific entity.
     *
     * @param {string} id 
     * @returns  
     */
    async delete(id: string): Promise<any> {
        const where = {
            id
        };
        return await this.delegate.delete({
            where
        });
    }
}
