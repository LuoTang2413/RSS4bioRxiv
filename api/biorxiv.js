// api/biorxiv.js

const fetch = require('node-fetch');
const parser = require('fast-xml-parser');

module.exports = async (req, res) => {
    try {
        const response = await fetch('http://connect.biorxiv.org/biorxiv_xml.php?subject=all');
        const xmlData = await response.text();

        const options = {
            attributeNamePrefix: '',
            textNodeName: 'value',
            ignoreAttributes: false,
        };

        const jsonData = parser.parse(xmlData, options);
        const entries = jsonData.feed.entry;

        const updates = entries.map(entry => ({
            title: entry.title.value,
            link: entry.link.href,
            summary: entry.summary.value,
        }));

        res.status(200).json(updates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data from BioRxiv' });
    }
};
