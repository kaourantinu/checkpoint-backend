import { DataSource } from "typeorm";
import CountryEntity from "../entities/Country.entity";

export default new DataSource({
    type: "sqlite",
    database: "checkpoint-backend-db.sqlite3",
    synchronize: true,
    logging: false,
    entities: [CountryEntity],
})