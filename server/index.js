const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball');
const helmet = require('helmet');

const url_model = require('./model');

const app = express();

app.use(cors());
app.use(helmet());
app.use(volleyball);
app.use(express.json());

app.post('/add', async (req, res) => {
  const slug = req.body.slug.split(' ').join('').toLowerCase();

  // if the slug is a protected keyword
  if (slug === 'add') {
    res.sendStatus(404).send('Cant add slug');
  }

  // check if the slug exist
  const doc = await url_model.findOne({ slug: slug }).exec();
  if (doc !== null) {
    res.sendStatus(404).send(new Error('Slug Already Exist!'));
  }

  // if the slug doesnt exist create it
  else {
    await new url_model({
      slug: slug,
      url: req.body.url,
    }).save();
    res.send('new slug added');
  }
});

app.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  // check if the slug exist nd send the url
  const doc = await url_model.findOne({ slug: slug }).exec();
  if (doc !== null) {
    const url = doc.url;
    res.json(url);
  } else {
    res.sendStatus(404).send("slug doesn't exist");
  }
});

app.listen(5000, () => {
  console.log('server running at port 5000');
});
