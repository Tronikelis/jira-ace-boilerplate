const Express = require("express");
const ace = require("atlassian-connect-express");

const postgres = require("../db");

/**
 * @param {Express.Application} app
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {ace.AddOn} addon
 */


module.exports = function(app, addon) {

    app.get("atlassian-connect.json", async (req, res) => {
        return res.redirect('/atlassian-connect.json');
    });

    app.get("/", async (req, res) => {
        // ? check if your db works
       
        console.log(
            await postgres("SELECT * FROM main")
            .catch(err => console.log(err))
        );
        // expected output: [], if you have an empty table named 'main'

        return res.sendStatus(200);
    });
};