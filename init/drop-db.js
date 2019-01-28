const {execSync}= require('child_process');

try{
    execSync('mongo repo --eval "db.dropDatabase()"');
    console.log('dropped database quotes');

}catch(err){
    console.log('some problems encountered when trying to drop the database store');
    console.error(err);
}