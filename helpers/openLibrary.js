const axios=require('axios')

const getBookCover=async(isbn)=>{
    try{
        const response=await axios.get('https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg');
        return response.status === 200
          ? response.config.url
          : "default_cover_url.jpg";
    }
    catch(error){
        console.error('Error fetching book cover:',error.message);
        return "default_cover_url.jpg";
    }
};

module.exports={getBookCover};