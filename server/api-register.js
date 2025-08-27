import user from './api/user.js';
import login from './api/login.js';
import auction from './api/auction.js';
import payments from './api/payments.js';

export default function apiRegister(server) {
  user(server);
  login(server);
  auction(server);
  payments(server);
}
