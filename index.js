const express = require("express");
const mongoose = require("mongoose");
const Url = require("./Model/url");
const cors = require("cors");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"));

mongoose.connect(process.env.Mongo_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to database");
});

app.get("/check/:url", async(req, res) => {
    try {
        // find if url already exists
        // if exists -> return original url
        // if not -> return not found
        const url = await Url.findOne({ short_url: req.params.url });
        if (url) {
            await Url.updateOne({ short_url: req.params.url }, {click_count: url.click_count + 1})
            return res.status(201).json({
                status: "Success",
                url: url.original_url,
                click_count: url.click_count + 1
            })
        }
        res.json({
            status: "Failed",
            message: "requested url not found"
        })

    } catch (error) {
        res.json({
            status: "Failed",
            error: error.message
        })
    }
})

app.post("/create", async (req, res) => {
    try {
        // find if url already exists
        // if exists -> return original url
        // if not -> shorten and store in db status 201
        const url = await Url.findOne({ original_url: req.body.url });
        if (url) {
            return res.status(200).json({
                status: "Exists",
                shortUrl: url.short_url,
                originalUrl: url.original_url
            })
        }

        // shortening url
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let shortUrl = "";
        const len = chars.length;
        for (let i = 0; i < 3; i++) {
            shortUrl += chars.charAt(Math.floor(Math.random() * len));
        }
        const stored_url = await Url.create({
            short_url: `${shortUrl}.ut`,
            original_url: req.body.url
        })
        res.status(201).json({
            status: "Success",
            shortUrl: stored_url.short_url,
            originalUrl: stored_url.original_url
        });
    } catch (error) {
        res.json({
            status: "Failed",
            error: error.message
        })
    }
})

app.listen(3000, () => console.log("server is up and running"));