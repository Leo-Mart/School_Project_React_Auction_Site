import User from '../models/User.js';
import { getHash } from './user.js';

export default function (server) {
  server.get('/api/login', async (req, res) => {
    const user = req.session.user;
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'Ingen inloggad' });
    }
  });
  server.post('/api/login', async (req, res) => {
    if (!req.session.user) {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.find(
        { email: email, password: getHash(password) },
        '-password'
      );

      if (user.length > 0) {
        req.session.user = user[0];
        res.status(201).json({
          message: `Loggat in som ${req.session.user.firstname} `,
          user: user[0],
        });
      } else {
        res
          .status(404)
          .json({ message: 'Ingen användare hittad, kolla ditt lösen/email' });
      }
    } else {
      res.status(409).json({ message: 'Någon är redan inloggad.' });
    }
  });

  server.delete('/api/login', async (req, res) => {
    if (req.session.user) {
      delete req.session.user;
      console.log('utloggning lyckades');
      res.json({ message: 'utloggning lyckades' });
    } else {
      console.log('ingen är inloggad');

      res.json({ message: 'ingen är inloggad' });
    }
  });
}
