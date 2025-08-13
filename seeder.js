const {Books}= require("./models/Book_model");
const {Author}= require("./models/Author_model");
const {data,authors} = require("./data");

//connect to DB

require("./config/db").connectToDB();



// Import Books From DB
const importBooksFromDb= async()=>{
    try {
        await Books.insertMany(data);
        console.log("Data Imported Successfully");
        process.exit();
    } catch (error) {
        console.log(`An Error Occured Importing Data : ${error}`);
        process.exit(1);
       
    }
}


// Import Authors from data base
const importAuthorsFromDb= async()=>{
    try {
        await Author.insertMany(authors);
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
    if (process.argv[2] === "-importbooks") {
        importBooksFromDb();
    }
    if (process.argv[2] === "-importauthors") {
        importAuthorsFromDb();
    }
    else if (process.argv[2] === "-remove") {
        deleteBooksFromDb()
    }else{
        console.log("verify the word after the -");
        process.exit(1);
    }
    
}

// entry point 
seeder();