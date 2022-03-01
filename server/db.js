import pg from 'pg'

const {Pool} = pg;
const pool = new Pool({
    user: "postgres",
    password: "Pranit123",
    host: "localhost",
    port: 5432,
    database: "jwtauth"
});

export default pool