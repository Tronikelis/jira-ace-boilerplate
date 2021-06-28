import { Promise } from "bluebird";
import { Client } from "pg";


/**
 * Just write sql here or make an object like this
 * {text: "SELECT * FROM X WHERE X = $1", values: [X]}
 * @param {any} query
 */
function query(query) {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "development") {
            // change these to your local database
            const client = new Client({
                host: "localhost",
                port: 5432,
                user: "postgres",
                database: "test"
            });
            
            client.connect(() => {
                client.query(query, (err, res) => {
                    
                    client.end(() => {
                        if (err) reject(err);
                        else resolve(res.rows);
                    });
                });
            });

        } else {
            // intended for heroku
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });

            client.connect(() => {
                client.query(query, (err, res) => {
                    
                    client.end(() => {
                        if (err) reject(err);
                        else resolve(res.rows);
                    });
                });
            })
        }
    });
};

export { query };