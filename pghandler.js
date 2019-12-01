const {Client} = require('pg');

const client = new Client({
  /*  
  host:"localhost",
  user:"pete",
  database:"albertBrain",
  port:"5432",
  ssl: false
  */
  connectionString: process.env.DATABASE_URL,
  ssl: true 
});

client.connect().then(console.log("Connected")).catch(err => console.log(err));

module.exports.loadData = (query, filter, cb) => {
    console.log("Loading...")

    client.query(`SELECT ${query} FROM users WHERE ${filter}`, (err, res) => {
        if (err) return console.log(err);
        if (!cb) return console.log("null");
        console.log('handler output:', res.rows[0]);
        cb(res.rows);
    });
}

module.exports.saveData = (username,query,cb) => {
    let q = `INSERT INTO users(uname, id, medals, rbxname) VALUES('${username}',${query});`
    console.log(q)
    client.query(q, (err) => {
        if (err) return console.log(err);
    });
    if(cb) return cb();  
}

module.exports.updateData = (set, filter, cb) => {
    client.query(`UPDATE users SET ${set} WHERE ${filter};`, (err) => {
        if (err) return console.log(err);
    });

    if(cb) return cb();
}

