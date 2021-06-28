import Express from "express";
import ace from "atlassian-connect-express";

import { query } from "../db";

/**
 * @param {Express.Application} app
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {ace.AddOn} addon
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
        // expected output: [], if you have an empty table named 'main'

        return res.sendStatus(200);
    })

    app.get("/api", addon.checkValidToken(), (req, res) => {
        return res.sendStatus(200);
    });
};