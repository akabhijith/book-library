const axios=require('axios')
import axios from 'axios'

const getBookCover=async(isbn)=>{
    try{
        const response=await axios.get('https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg');
        return  response.request.res.responseUrl;
    }
    catch(error){
        console.error('Error fetching book cover:',error);
        return null;
    }
};

module.exports={getBookCover};