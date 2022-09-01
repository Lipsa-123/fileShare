const File=require('./models/file')
const fs=require('fs')
const connectDB = require('./config/db');
connectDB();


function fetchData(){
    //24 hours
    const pastDate=new Date(Date.now()- 24*60*60*1000);
    const files=File.find({createdAt:{$lt:passDate}});
    if(files.length){
        for(const file of files){
            try{
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`Successfuly deleted ${file.filename}`)
            }
            catch(err){
                console.log(`Error while deleting the file ${err}`)
            }
        }

        console.log('Job Done!')
    }

}

fetchData().then(process.exit);