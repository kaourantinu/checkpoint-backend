import { Repository } from "typeorm";
import CountryEntity from "../entities/Country.entity";
import datasource from "../lib/datasource";

type CreateCountryInput = Pick<CountryEntity, 'code' | 'name' | 'emoji' | 'continent'>;

export default class CountryRepository extends Repository<CountryEntity> {
    constructor() {
        super(CountryEntity, datasource.createEntityManager());
    }

    async findAll(): Promise<CountryEntity[]> {
        return this.find();
    }

    async createCountry(data: CreateCountryInput): Promise<CountryEntity> {
        const country = this.create(data);
        const saving = await this.save(country);
        return country;
    }
}