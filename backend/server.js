const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./inventory.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    unit TEXT,
    category TEXT,
    brand TEXT,
    stock INTEGER,
    status TEXT,
    image TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS inventory_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    oldStock INTEGER,
    newStock INTEGER,
    changedBy TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.put('/api/products/:id', (req, res) => {
  const { name, unit, category, brand, stock, status } = req.body;
  const id = req.params.id;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (!product) return res.status(404).json({ error: "Not found" });
    db.run(
      `UPDATE products SET name=?, unit=?, category=?, brand=?, stock=?, status=? WHERE id=?`,
      [name, unit, category, brand, stock, status, id],
      function(err2) {
        if (err2) return res.status(400).json({error: err2.message});
        db.run(
          `INSERT INTO inventory_logs (productId, oldStock, newStock, changedBy)
           VALUES (?, ?, ?, ?)`,
          [id, product.stock, stock, "admin"]
        );
        res.json({ ...req.body, id });
      }
    );
  });
});
const upload = multer({ dest: 'uploads/' });
app.post('/api/products/import', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      let added = 0, skipped = 0;
      let duplicates = [];
      results.forEach(product => {
        db.get(`SELECT id FROM products WHERE lower(name)=lower(?)`, [product.name], (err, row) => {
          if (row) {
            skipped++;
            duplicates.push({ name: product.name, existingId: row.id });
          } else {
            db.run(
              `INSERT INTO products (name, unit, category, brand, stock, status, image)
               VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [product.name, product.unit, product.category, product.brand,
                product.stock, product.status, product.image],
              () => {}
            );
            added++;
          }
        });
      });
      setTimeout(() => {
        fs.unlinkSync(req.file.path);
        res.json({ added, skipped, duplicates });
      }, 500);
    });
});

app.get('/api/products/export', (req, res) => {
  db.all(`SELECT name,unit,category,brand,stock,status,image FROM products`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    let csv = 'name,unit,category,brand,stock,status,image\n';
    rows.forEach(row => {
      csv += `${row.name},${row.unit},${row.category},${row.brand},${row.stock},${row.status},${row.image}\n`
    });
    res.header('Content-Type', 'text/csv');
    res.attachment('products.csv');
    return res.send(csv);
  });
});

app.get('/api/products/:id/history', (req, res) => {
  db.all(
    `SELECT * FROM inventory_logs WHERE productId=? ORDER BY timestamp DESC`,
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
