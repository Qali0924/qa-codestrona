const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware do obsługi formularzy
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // katalog z HTML/CSS

app.post('/zapisz', (req, res) => {
  const { email, typ, opis } = req.body;

  const data = new Date().toISOString();
  const zamowienie = 
    `--------------------------\n` +
    `Data: ${data}\n` +
    `E-mail: ${email}\n` +
    `Typ zamówienia: ${typ}\n` +
    `Opis:\n${opis}\n` +
    `--------------------------\n\n`;

  fs.appendFile('zlozone.txt', zamowienie, (err) => {
    if (err) {
      console.error('Błąd zapisu zamówienia:', err);
      return res.status(500).send('Błąd serwera');
    }

    // Przekierowanie na stronę główną z info
    res.redirect('/?status=success');
  });
});

// Serwowanie strony głównej
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
