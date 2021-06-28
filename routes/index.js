import Express from "express";

import { query } from "../db/index";

/**
 * @param {Express.Application} app
 * @param {Express.Request} req
 * @param {Express.Response} res
 */


export default function routes(app, addon) {

    app.get("atlassian-connect.json", async (req, res) => {
        return res.redirect('/atlassian-connect.json');
    });

    app.get("/", async (req, res) => {
        // ? check if your db works
        console.log(
            await query("SELECT * FROM main")
        );
        // expected output: [], if you have a table named 'main'

        return res.sendStatus(200);
    })

};