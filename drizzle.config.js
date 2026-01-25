import 'dotenv/config'

export default {
    schema: "./src/db/Schema.js",
    out: "./src/db/migrations",
    dialect:"postgresql",
    dbCredentials: {url:process.env.DATABASE_URL}


}