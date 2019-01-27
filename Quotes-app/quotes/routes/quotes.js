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

router.get( '/:quoteId', function( req, res ) {
    const quoteId = req.params.quoteId;
    console.log(quoteId)
    Quotes
        .findOne( { _id: quoteId } )
        .exec(function( error, quote ) {
        if( error ) {
            res.json({
                message: 'Error retrieving product details from DB : ' + error.message
            });
            return;
        }

        res.status(200).json( quote );
    })
});

router.post( '/', function( req, res ) {
    const quote = req.body;
    console.log(quote)
    if( !req.body ) { // false, undefined, null, '',
        res.json({
            message: 'No quote details - request body is empty'
        });
        return;
    }

    // add the product (DB query)
    let quoteObj = new Quotes( quote );
    quoteObj.save(function( error, savedQuote ) {
        if( error ) {
            res.json({
                message: 'Some error occured saving product'
            });
            return;
        }
        res.status( 201 ).json( savedQuote );
    });
});
module.exports = router;