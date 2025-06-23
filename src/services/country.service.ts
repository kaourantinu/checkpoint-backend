import CountryEntity from "../entities/Country.entity";
import CountryRepository from "../repositories/Country.repository";

type CreateCountryInput = Pick<CountryEntity, 'code' | 'name' | 'emoji' | 'continent'>;

export default class CountryService {
    db: CountryRepository;

    constructor() {
        this.db = new CountryRepository();
    }

    async getAllCountries() {
        return await this.db.findAll();
    }

    async getCountryByCode(code: string) {
        const country = await this.db.findOneBy({
            code: code
        });
        return country;
    }

    async getCountriesByContinent(continent: string) {
        const countries = await this.db.findBy({
            continent: continent
        });
        return countries;
    }

    async createOneCountry(data: CreateCountryInput) {
        const country = await this.db.createCountry(data);
        return country;
    }
}