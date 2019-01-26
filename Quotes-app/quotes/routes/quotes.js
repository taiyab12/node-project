const express = require( 'express' );
const mongoose = require( 'mongoose' );

const Quotes = mongoose.model( 'Quotes' );

const router = express.Router();

router.get( '/', function( req, res ) {
    Quotes.find(function( error, quotes ) {
        if( error ) {
            res.json({
                message: 'Error retrieving quotes from DB'
            });
            return;
        }

        res.status(200).json( quotes );
    });
});

module.exports = router;