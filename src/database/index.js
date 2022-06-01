import Sequelize from 'sequelize';
// import mongoose from 'mongoose';
import firebaseAdmin from 'firebase-admin';
import User from '../app/models/User';
import Worker from '../app/models/Worker';
import File from '../app/models/File';
import Task from '../app/models/Task';
import Message from '../app/models/Message';
import Service from '../app/models/Service';
import Signature from '../app/models/Signature';
import databaseConfig from '../config/database';
// import serviceAccount from '~/config/godtasker-development-firebase-adminsdk-fro05-5617c89965.json'
require('dotenv').config();

const models = [User, Worker, File, Task, Message, Service, Signature];

const serviceAccount = {
  type: 'service_account',
  project_id: 'godtasker-development',
  private_key_id: 'b0e14b2c7013a487a6f69e4ca38c095fc12739ab',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDxEgUch+em3e+5\nRqK19OGpjvenSCrSDqUUigAMftu1aMEhoSXuNYbTkLnoNzXs25i4zgwHFrGXTayp\nhg/Z7POv+wSnG6jdYJhpkVcJi/93wIUAZzLWrkaxKtNNSzCHhSkxin3vM73G8VZd\nAS16Vj8YzJL3jLmMWOo+ih/JgmORhDjd+Wswt7l2QWRbL8yCg/gybzxeIDw+vajT\nCVb8f97VjAMO9aRp6+KoGhSRNW92bXbTYYWI4cwk3xUhXGmiFfGyKbxIpFDAD8dZ\n/YxXUJ86TFKH7moG89t5vGAyIJGxHMvmPkx5cu3lM6KPhV/OekwPeGO6Wshs+22F\nNst8dO0bAgMBAAECggEAcxZmwU2yjoviz+GEeXisqQ27dq2x37GlJu6RAmYnzu3x\nUfREjvoX4XX1AwMkp+zYdtXLkTDI3NJ0zUPW2nPQjOG6QWsnjXR5nuCHnGOtNUcA\nWAZsk2gFELzAvuRYCULNvTyATcu2XL1HvUP8Kaz2F4lG2o7g4DtsrSm07jdlAIkh\ncKFOTqT1bCUOjBOjl0g3xmo/VBqAXELKC7LvLDphVmbToP5Fy1zM9mVOlfsYUtcW\n1KvNeEvKwLVB8fxerBAsJLLHwuKiXAbQweuD3Dw9aZA+wWi2sKcmsZlL4mZdBEjC\nkpTICFRPQw/+9cqx10UuM9EcidHXeyxWotqCy99RHQKBgQD/auXRG/9I0jp0Yun8\n58S9z6LcgeA+gpJuZcssIwVNFYNnzovvdzyNjIWc3+RRnVpTilywtN4ECnSwPxf+\nZlOqORT8hNVRE4eeUL3R5w74HFs4+ex+jXqJJdB2E4FoJgK7M4IBecDgQVlJletA\n55agNhviYjp8Wjek3NesnRRIDQKBgQDxnr84NMJ8t38sR5KoGPNU7HrO8mvFLG5m\nxBz8T+H4mySVzcLKxM1yyoRR9lYPa1DLEzlaBFUezTRRGOvxk8SJKRvptJQMVrH9\nR60/olnd490GvRBABrMdFInRiN6SHl3V10lZR6eufp4nuFLFYHn0IWcjoVQ7KR2q\nqQZiNGbXxwKBgGzPDk5x3eQY4xwX01SRK8gsv1Wu4mfe2iC7rr0DwktfYdaEMCr4\nocwvU/BLlQmLviIerHP+6SHRjnpStpcC4pt+q8kTkYhziG/SN7tG8qKR+e6g0bXr\n8YqhmFfk4VkL8FftjnGwe5FNZYsqmcjRn+JqiqB7dizphhDun9aCKFS1AoGAKz7w\nlszKqqvlNTWySCf/FYomCPhW1bm4IOilD3v0xBxwled4H/bNlugsescObEAW++H6\n9+OioJq17HX7dQevu6UB+/h4LyUtQlob5jHWx+JK4zPfvrX0RRYx/LD0tU5+GRIp\nbLNojdDX2eAh4HX+HfYEkdoES3p2dt8950Hdzm0CgYBBtusAaGwYboWb/8v16JGJ\nTGyPbRyUNTfYMjPf13dg23IKk+jfzFdFmfn6Ne/7h0c57fC7UYD4jJYoNTB1OwxD\nXYk5un/g0eyxtBDxHngZFvGm9OOMdNnN5DeG75AHjk7CP3WyfEZ1VTzYb5qb9Eb1\nmdO3l0KAWQ3t5E/VVp7iRw==\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-fro05@godtasker-development.iam.gserviceaccount.com',
  client_id: '105553451990844460074',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fro05%40godtasker-development.iam.gserviceaccount.com',
};

// firebase.initializeApp(serviceAccount);

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
