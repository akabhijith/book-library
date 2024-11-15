//to handle operations related to books
import { query } from "../DB";

const Book={
    async createBook({title,author,cover_url,rating,review}){
        const result = await query(
          "INSERT INTO books (title,author,cover_url,rating,review) VALUES($1,$2,$3,$4,$5) RETURNING *",
          [title, author, cover_url, rating, review]
        );

        return result.rows[0];
    },
    async getAllBooks(){
      const result=await query("SELECT * FROM books ORDER BY created_at DESC");
      return result.rows;
    },
    async getBookById(id){
      const result= await query('SELECT* FROM books where id=$1',[id]);
      return result.rows[0];
    },

    async updateBook({title,author,cover_url,rating,review}){
      const result=await query("UPDATE books SET title=$1,, cover_url = $3, rating = $4, review = $5 WHERE id = $6 RETURNING *",
            [title, author, cover_url, rating, review, id]
        );
      
      return result.rows[0];      
    },

    async deleteBook(id){
      await query("DELETE FROM books where id=$1",[id]);
    }
};

module.exports={Book};