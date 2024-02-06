const express = require ('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');



const app = express();
const port = 3000;



const db = mysql.createConnection({
host: 'localhost',
user: 'phpmyadmin',
password: 'milleny',
database: 'aluno',
});




db.connect((err) => {
if (err) {
console.error('Erro ao conectar ao banco de dados:', err);
throw err;
}
console.log('Conexão com o banco de dados MySQL estabelecida.');
});







app.use(
session({
secret: 'sua_chave_secreta',
resave: true,
saveUninitialized: true,
})
);







app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');



    app.get('/', (req, res) => {
 
        
       
        res.render('home');
        
       


           });
           app.get('/login', (req, res) => {
 
        
       
            res.render('logar');
            
           
    
    
               });
               app.get('/postagem', (req, res) => {
 
        
       
                res.render('postagem');
                
               
        
        
                   });
app.post('/login', (req, res) => {
const { nome, senha } = req.body;

const query = 'SELECT * FROM login WHERE nome = ? AND senha = ?';

db.query(query, [nome, senha], (err, results) => {
if (err) throw err;

if (results.length > 0) {
req.session.loggedin = true;
req.session.nome = nome;
res.redirect('/postagem');




// CREATE
app.post('/add', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO postg (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) throw err;
   res.redirect('/teste');
  });
});



// DELETE
app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM postg WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
   res.redirect('/teste');
});
});





} else {
res.send('Credenciais incorretas. <a href="/">Tente novamente</a>');
}
});
});





app.get('/dash', (req, res) => {




if (req.session.loggedin) {
res.send(`Bem-vindo, ${req.session.username}!<br><a href="/logout">Sair</a>`);





} else {
res.send('Faça login para acessar esta página. <a href="/">Login</a>');
}
});



// READ
app.get('/teste', (req, res) => {
  db.query('SELECT * FROM postg', (err, result) => {
    if (err) throw err;
    res.render('padm', { postg: result });
  });
});














app.get('/logout', (req, res) => {
req.session.destroy(() => {
res.redirect('/');
});
});
    
  







app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
  });
