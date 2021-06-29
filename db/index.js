const { Promise } = require("bluebird");
const { Client } = require("pg");


/**
 * Just write sql here or make an object like this
 * {text: "SELECT * FROM X WHERE X = $1", values: [X]}
 * @param {any} query
 */

module.exports = function(query) {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "development") {
            console.log("started")
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