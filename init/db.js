require( '../models/Quotes' );

const mongoose = require( 'mongoose' );
const data = require( '../init/seed.json' );
const Quotes = mongoose.model( 'Quotes' );

mongoose.connect( 'mongodb://localhost:27017/quotes' );

mongoose.connection.on( 'connected', function() {
    console.log( 'connected to the DB' );
    loadData();
});

mongoose.connection.on( 'error', function( error ) {
    console.error( 'error on trying to connect to DB : ', error.message );
});


function loadData() {
    // generated quote id will be stored here
    const quotesIdArray = [];
    data.quotes.forEach(function( quote ) {
        let quoteObj = new Quotes( quote );
        quoteObj.save(function( error, savedQuotes ) {
            quotesIdArray.push( savedQuotes._id );
            console.log( quotesIdArray );

            if( error ) {
                console.error( 'Some error occured when trying to save quote with author ' + quote.author );
                return;
            }

            console.log( 'Quotes with author name = ' + savedQuotes.author + ' has been saved with id = ' + savedQuotes._id );
        });
    });
}
