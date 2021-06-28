import { Promise } from "bluebird";
import { Client } from "pg";


function query(query) {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "development") {
            
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
            const client = new Client({
                connectionString: process.env.DATABASE_URL
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