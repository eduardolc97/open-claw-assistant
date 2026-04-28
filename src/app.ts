import express from 'express';
import "dotenv/config";
import router from '@src/routes/routes'

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

/*
app.post('/ask/', async (req, res) => {
  if (req.body.text) {
    const client = new OpenAI();
    const response = await client.responses.create({
      model: 'gpt-5.5',
      input: req.body.text
    });
    res.send(response.output_text);
  }
})

app.post('/ask/agent', async (req, res) => {
  if (req.body.text) {
    const response = await askRouterAgent(req.body.text);
    res.send(response);
  }
})

app.post('/users', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  await prisma.user.create({
    data: {
      name, email
    }
  });

  res.send('Success!');
})
*/

app.listen(port, () => {
  console.log('Working');
});