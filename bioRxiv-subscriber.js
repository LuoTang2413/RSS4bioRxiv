const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');

const app = express();
const port = 3000;

app.get('/biorxiv-updates', async (req, res) => {
    try {
        // Fetch data from the BioRxiv XML feed
        const response = await axios.get('http://connect.biorxiv.org/biorxiv_xml.php?subject=all');
        const xmlData = response.data;

        // Parse XML data to JSON
        const parser = new xml2js.Parser();
        parser.parseString(xmlData, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error parsing XML data' });
            } else {
                const entries = result.feed.entry;
                const updates = entries.map(entry => ({
                    title: entry.title[0],
                    link: entry.link[0].$.href,
                    summary: entry.summary[0]._
                }));
                res.json(updates);
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from BioRxiv' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
