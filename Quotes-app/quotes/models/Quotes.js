const mongoose = require( 'mongoose' );

const quotesSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author_permalink: String,
    upvotes_count: Number,
    url: String 
});

// creates a quote model (class)
mongoose.model( 'Quotes', quotesSchema );
