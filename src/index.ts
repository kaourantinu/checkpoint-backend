import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { countryResolver } from "./resolvers/country.resolver";
import datasource from "./lib/datasource";
import { makeExecutableSchema } from "graphql-tools";
import { DataSource } from "typeorm";
import { Builder, fixturesIterator, Loader, Parser, Resolver } from "typeorm-fixtures-cli";
import path from "path";
import { CommandUtils } from 'typeorm/commands/CommandUtils';

const typeDefs = `#graphql
    type Country {
        id: String
        code: String
        name: String
        emoji: String
        continent: String
    }

    type Mutation {
        addCountry(code: String, name: String, emoji: String, continent: String): Country!
    }

    type Query {
        countries: [Country!]
        countryByCode(code: String!): Country
        countriesByContinent(continent: String!): [Country!]
    }

    input CreateCountryInput {
        code: String!
        name: String!
        emoji: String!
        continent: String!
    }
`;

const resolvers = countryResolver;

const server = new ApolloServer<{}>({
  typeDefs,
  resolvers,
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const loadFixtures = async (fixturesPath: string) => {
  let dataSource: DataSource | undefined = undefined;

  try {
    await datasource.initialize();
    await datasource.synchronize(true);

    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(datasource, new Parser(), false);

    for (const fixture of fixturesIterator(fixtures)) {
      const entity: any = await builder.build(fixture);
      await datasource.getRepository(fixture.entity).save(entity);
    }
  } catch (err) {
    throw err;
  } finally {
    if (datasource) {
      await datasource.destroy();
    }
  }
};

async function main(){
    await loadFixtures('./src/fixtures')
    .then(() => {
        console.log('Fixtures are successfully loaded.');
    })
    .catch((err) => {
        console.log(err);
    });

    await datasource.initialize()
    console.log("Database connected");

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
}

main()