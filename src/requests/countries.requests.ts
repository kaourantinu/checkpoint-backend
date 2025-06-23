import { gql } from '@apollo/client';

export const FIND_ALL_COUNTRIES = gql`
    query FindAllCountries {
        countries {
            code
            emoji
            name
        }
    }
`;

export const FIND_COUNTRY_BY_CODE = gql`
    query FindCountryByCode($code: String!) {
        countryByCode(code: $code) {
            id
            name
            emoji
            continent
            code
        }
    }
`;

export const CREATE_COUNTRY = gql`
    mutation CreateCountry($code: String, $name: String, $emoji: String, $continent: String) {
    addCountry(code: $code, name: $name, emoji: $emoji, continent: $continent) {
        id
    }
    }
`;

export const FIND_COUNTRIES_BY_CONTINENT = gql`
    query FindCountriesByContinent($continent: String!) {
        countriesByContinent(continent: $continent) {
            code
            continent
            emoji
            id
            name
        }
    }
`;