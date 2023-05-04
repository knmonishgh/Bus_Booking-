// this file is to connect mongodb 

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);



async function main() {
    await mongoose.connect(process.env.mongo_url);
  }

  main().catch(err => console.log(err));
  main().then(()=>{
      console.log("mongo connected")
  })