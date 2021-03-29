const express = require('express')
const fetch = require('node-fetch')

const app = express();
const PORT = process.env.PORT || 80;

const redirect = () => {
  const urls = [
    'http://royaltsp.great-site.net/thecbx/health-check.php',
    'https://thecbx.000webhostapp.com/health-check.php',
  ];

  return Promise.all(urls.map(url => fetch(url).then(res => res.json())));
}

app.get('/', async (req, res) => {
  const workingUrls = await redirect();
  workingUrls.forEach(url => {
    res.redirect(url)
  })
  res.end()
})

app.listen(PORT, err => {
  if (err) return console.log(`Error: `, err);
  console.log(`Royaltsp-Rest-Server listening on PORT ${PORT}`);
})