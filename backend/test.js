import axios from 'axios';

axios({
    method: 'post',
    url: 'http://localhost:9955/addUser',
    data: {
      "email": 'Fred',
      "password": 'Flintstone'
    }
  });