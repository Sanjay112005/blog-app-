const pool = require('../config/db'); // Import the database connection pool
const bcrypt = require('bcrypt');

const User = {
 async createUser(name,email,password,isAdmin){
    const hashedPassword = await bcrypt.hash(password,10);

    const result = await pool.query(
        `INSERT INTO users(name ,email,password,is_admin )
         VALUES($1,$2,$3,$4 )   
         RETURNING id ,name ,email ,is_admin  `, // why returning because we want the new data after insertion for further use like sending back to the client
         [name ,email , hashedPassword , isAdmin ] // actual values to be inserted into the query in the placeholders 
          
    );
    return result.rows[0]; //this wil return the first row of the result set, which contains the newly created user data
 } ,

async toggleAdminStatus(id, isAdmin) {
  const result = await pool.query(
    `UPDATE users SET is_admin = $1 WHERE id = $2 RETURNING id, name, email, is_admin, created_at`,
    [isAdmin, id]
  );
  return result.rows[0];
},

async toggleAdminStatusByEmail(email, is_admin) {
  const result = await pool.query(
    `UPDATE users SET is_admin = $1 WHERE email = $2 RETURNING id, name, email, is_admin`,
    [is_admin, email]
  );
  return result.rows[0];
}
,

 async findByEmail(email){
   const result = await pool.query(
      `select * from users where email =$1`,
      [email]
   );
   return result.rows[0]
 },
 
   async findById(id){
      const result = await pool.query(
         `select id, name, email, is_admin , created_at from users where id =$1`,
         [id]
      );
      return result.rows[0]
   },


   async getUserById(id) {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
},
   async updateUser(id, { name, email }) {
    const result = await pool.query(
      `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, is_admin`,
      [name, email, id] 
    );
    return result.rows[0];
  },

  async updateUserPassword(id, hashedPassword) {
  await pool.query(
    `UPDATE users SET password = $1 WHERE id = $2`,
    [hashedPassword, id]
  );
},

  async findAll() {
  const result = await pool.query(
    `SELECT id, name, email, is_admin, created_at FROM users ORDER BY created_at DESC`
  );
  return result.rows;
},

  async deleteById(id) {
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING id`,
      [id]
    );
    return result.rowCount > 0;
  }

}
module.exports = User

