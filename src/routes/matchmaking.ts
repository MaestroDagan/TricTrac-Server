import NodeCache from 'node-cache';
import axios from 'axios';
import { Router } from 'express';
const router = Router();

const cache = new NodeCache();
cache.set('playing', []);

router.get('/start', async (req, res) => {
  const username = req.query.username as string | undefined;
  if (!username) {
    return res.status(400).send({ data: 'Username required!', msg: 'Bad Request' }).end();
  }

  const matchmaking = cache.get('matchmaking') as string | undefined;
  if (matchmaking) {
    await axios.get(`http://localhost:${process.env.PORT}/matchmaking/findmatch?username=${username}`);
    return res.status(200).redirect(`http://localhost:5173/game?game=${matchmaking}-${username}?user=1`);
  }

  cache.set('matchmaking', username);

  return res.status(200).redirect(`http://localhost:5173/matchmaking?username=${username}`);
});

router.get('/findmatch', (req, res) => {
  const username = req.query.username as string | undefined;
  if (!username) {
    return res.status(400).send({ data: 'Username required!', msg: 'Bad Request' }).end();
  }

  const matchmaking = cache.get('matchmaking') as string | undefined;
  if (matchmaking && matchmaking !== username) {
    let count = cache.get('matchmaking-count') as number | undefined;
    if (count === 1) {
      cache.del('matchmaking');
      cache.del('matchmaking-count');
    } else {
      cache.set('matchmaking', username);
      cache.set('matchmaking-count', 1);
    }
    cache.set('playing', (cache.get('playing') as string[]).concat([username, matchmaking]));

    return res
      .status(200)
      .send({ data: [username, matchmaking], msg: 'OK' })
      .end();
  }

  return res.status(200).send({ data: false, msg: 'OK' }).end();
});

router.get('/username-exists', (req, res) => {
  const username = req.query.username as string | undefined;
  if (!username) {
    return res.status(400).send({ data: 'Username required!', msg: 'Bad Request' }).end();
  }

  return res
    .status(200)
    .send({
      data: (cache.get('playing') as string[]).includes(username) || cache.get('matchmaking') === username,
      msg: 'OK',
    })
    .end();
});

export default router;
