const bcrypt = require("bcryptjs");

async function hashPassword(plainPassword) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword; 
}

async function comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports ={hashPassword, comparePasswords} ;
