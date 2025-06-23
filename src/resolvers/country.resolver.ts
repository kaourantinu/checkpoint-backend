import CountryService from "../services/country.service";

export const countryResolver = {
    Query: {
        countries: async () => {
            const countries = new CountryService().getAllCountries();
            return countries;
        },
        countryByCode: async (_: any, { code }: { code: string }) => {
            const country = await new CountryService().getCountryByCode(code);
            return country;
        },
        countriesByContinent: async (_: any, { continent }: { continent: string }) => {
            const countries = await new CountryService().getCountriesByContinent(continent);
            return countries;
        }
    },
    Mutation: {
        addCountry: async (_: any, { code, name, emoji, continent }: { code: string, name: string, emoji: string, continent: string }) => {
            const countryData = { code, name, emoji, continent };
            const country = new CountryService().createOneCountry(countryData);
            return country;
        }
    }
};