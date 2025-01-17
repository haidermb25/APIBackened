const express = require("express");
const xml2js = require("xml2js");
const cors = require("cors");

const app = express();

// Middleware to parse JSON and text with increased body size limit
app.use(express.json({ limit: "10mb" })); // Increase the limit for JSON bodies
app.use(express.text({ type: "application/xml", limit: "10mb" })); // Increase the limit for XML bodies

// Enable CORS for all origins
app.use(cors());

// API endpoint to accept XML and return an object
app.post("/parse-xml", (req, res) => {
    const xmlString = req.body;

    // Use xml2js to convert XML to an object
    const parser = new xml2js.Parser({ explicitArray: false });

    parser.parseString(xmlString, (err, result) => {
        if (err) {
            return res.status(400).json({ error: "Invalid XML format", details: err.message });
        }

        res.json({ message: "XML parsed successfully", data: result });
    });
});

app.get("/test",(req,res)=>{
    res.send("Express is running")
})
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
