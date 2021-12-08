import Sequelize from 'sequelize';
// import mongoose from 'mongoose';
import firebaseAdmin from 'firebase-admin';
import User from '../app/models/User';
import Worker from '../app/models/Worker';
import File from '../app/models/File';
import Task from '../app/models/Task';
import Message from '../app/models/Message';
import Signature from '../app/models/Signature';
import databaseConfig from '../config/database';
// import serviceAccount from '~/config/godtasker-development-firebase-adminsdk-fro05-5617c89965.json'
require('dotenv').config();

const models = [User, Worker, File, Task, Message, Signature];

const serviceAccount = {
  type: 'service_account',
  project_id: 'godtasker-development',
  private_key_id: process.env.FCM_PRIVATE_KEY_ID,
  private_key:
    // '-----BEGIN PRIVATE KEY-----\n*****\n-----END PRIVATE KEY-----\n',
    '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD5kIZ4YmWAamBN\nqky+N7HWlWWfboLBgP1GgOJpPkLvZYHmYp6nAuKcKIS1FxyscBoQdSCW2pqrFxjz\nM/geRNHLCuJodNRFb6lFjxlBTycFzPCOUgS1YiPL/ajrbY0JQ310yWOzkvkSB8rH\nUJFTAASx4tMjkOWLUaorCnD/CKPnNAi7TrAYixdQpPHKfWYqkKqTGJU5A9ox672n\nI4QWPb3nNYixKQtWCtzKQb0rmVM0rez5rwt3KgAzV510peawao0ZvxtSptfxZi8K\n0mib6cMFxzmhK/UHw+EWdEYUUfhB4vVhvNTLigqiL4vFUWq+VoxIreu80zunaBmF\nqtNrHGunAgMBAAECggEAAK78J01BsOnZrKzIPAckBg3vstGXKxeC2hQVSquAfG5f\nPjXL8HIqE7pqrqJLEk/WSnA/sBoWLVzJVTUxu0d9+Zvkhdu4Dx6grI+ZRpwEY9gt\nWn5wA90qcu8VbNumdL2KFO1OSBohc4Kw8/3NABiyaphP8rt9XXXSTP7g01n/NO1m\nrEGxmSPyigy7PnLNmMFdIPt8ufsYn6WA8+hBs52wjcRrOKN2hVuiNJ2PsBhTwD9K\nuTiKfHVdaIkq7Xg550xib0yzCVP1kX891eZqsewxVlXMCEhzp2Se33Kx0KN/2wIi\nBLNlDNmjcjsDbZUMC/U5KOd1SnAjM4FpOF89Ufz/FQKBgQD+NhPcJ3rh1pcD7ih8\nlr7r3KigChXwiYlnxYdIMaRC2TQeP01/CVF6cjtRvlSjcZe5fEEuVtr9JmjZd44r\nf68PaF0GaBwRswuoyRoZpwHapo85GlMX2tWhUczOHSKMKvlvFwS8NqWQuavv93NT\n+U1OLDvkbM8Sg2KJbVuQ6zHAwwKBgQD7UhPQnNp4gvBGBwzTY2Kq9ynG4L38kKuk\ncshKViLdhdgSpxOnpxEBAhLSmivyr8Wp2FPlryO0CfjNECB4H+umE5k5PrFt4ew7\n5Kh8HEk7DQWPvn2tnqJIOjfZ5Z9izugPcVmcJ4U2WfQNDKe1yDds/lPM/K/ROfex\nNOQFj927TQKBgQDEGftgDaShquR8R7A7zB4j3OjH7H/YOoEg6CPf8UuBtgSagMLL\niOityIkyGd046Fve3pd5o87zEjo36B5oN+tXu25njtB4ZuJLpjbYKxknDu3VYxVO\nhaXe+DdBmQAZmN0qcVtZxd4asuCMERuKX/renwjkwXtMEMZmtVG5jXWn+QKBgQDr\n0/wGAHm9JdlDTPBLF/KJTT7lgRSmADcgLBkoMCWtSyATeLYn1sxM7t4sw0DEDQ5l\nLzqix7KwCb9u5VgigImGoNNh9SNXYe1j0lALjhtljvWOCgkyty2+quqnzCHA/Tii\n7RFSR39oHga1jA9/s63W19xY+TAeG9ACeAgT9Ajz7QKBgQCXIcGyrzbkIEE5wUN+\nPHaA1xNlew/p2l/HsOme7DogTwWijqNX/KeT6n6FoWuQgEsoDvOYT7nMLNpvDrqK\nKvxJDsFeP+/luz/8t2kNs6s1fnRDIl8ZQqbRFvF/9Ak+rhCPSbzJ1jPIyDs7NCvQ\nbM6hUMu0UjnWxYYigNOuXhQTMw==\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-fro05@godtasker-development.iam.gserviceaccount.com',
  client_id: '105553451990844460074',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fro05%40godtasker-development.iam.gserviceaccount.com',
};

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://godtasker-development.firebaseio.com',
});

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // mongo() {
  //   this.mongoConnection = mongoose.connect(
  //     'mongodb://localhost:27017/gerenteDash',
  //     {
  //       useNewUrlParser: true,
  //       useFindAndModify: true,
  //       useUnifiedTopology: true,
  //     }
  //   );
  // }
}

export default new Database();
