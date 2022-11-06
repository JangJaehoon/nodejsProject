const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Jang:lj0131@firstnodejsproject.tnxwmct.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {

  // 회원 가입할 때, 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body)
  // bodyParser를 이용하여, req.body로 클라이언트의 정보를 json형태로 받아준다.
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err}) // err은 에러메시지
    return res.status(200).json({ // status(200)은 접속성공의 의미
      success: true
    })
  })
  // user 모델에 저장된다.
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


