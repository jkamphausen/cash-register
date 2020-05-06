import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('./db.json');
const db = low(adapter);

db.defaults({ postings: [], name: 'CVJM Rheydt-Mitte e.V.' }).write();

//db.get('posts').push({ id: 1, title: 'lowdb!!!' }).write();

export default db;