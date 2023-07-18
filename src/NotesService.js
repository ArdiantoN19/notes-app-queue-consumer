require("dotenv").config();
const { Pool } = require("pg");

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getNotes(userId) {
    const query = {
      text: "SELECT n.* FROM notes n LEFT JOIN collaborations c ON c.note_id = n.id WHERE n.owner = $1 OR c.user_id = $1",
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}
module.exports = NotesService;
