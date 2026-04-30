import express from 'express';
import "dotenv/config";
import router from '@src/routes/routes'

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

/*

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