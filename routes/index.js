export default function routes(app, addon) {
    app.get('atlassian-connect.json', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });
};