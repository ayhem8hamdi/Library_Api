const {Books}= require("./models/Book_model");
const {data} = require("./data");

//connect to DB

require("./config/db").connectToDB();



// Import from data base
const importFromDb= async()=>{
    try {
        await Books.insertMany(data);
        console.log("Data Imported Successfully");
        process.exit();
    } catch (error) {
        console.log(`An Error Occured Importing Data : ${error}`);
        process.exit(1);
       
    }
}


// Empty Data Base From Books 
const deleteBooksFromDb= async()=>{
    try {
        await Books.deleteMany();
        console.log("Data Deleted Successfully");
        process.exit();
    } catch (error) {
        console.log(`An Error Occured Deleting Data : ${error}`);
        process.exit(1);
    }
}


// file main function 
function seeder() {
    if (process.argv[2] === "-import") {
        importFromDb();
    }
    else if (process.argv[2] === "-remove") {
        deleteBooksFromDb()
    }else{
        console.log("verify the word after the -");
    }
    
}

// entry point 
seeder();