const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')
const passport = require('passport')
const cors = require('cors')
// .env 파일 관련
dotenv.config()
//혜주작성
const outRouter = require('./routes/out')
const userRouter = require('./routes/user')
const wareRouter = require('./routes/ware')
// sequelize 연결
const { sequelize } = require('./models')
const passportConfig = require('./passport')

const app = express()
passportConfig()
app.set('port', process.env.PORT || 8000)
// 템플릿 엔진 설정
app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
    watch: true,
})
sequelize.sync({ force: false })
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch((err) => {
    console.error(err);
})
// 리액트-노드 통신
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
// 요청과 응답에 대한 정보 출력
// 이렇게 생긴 애들이 나옵니다 -> GET / 200 6.044 ms - 644
app.use(morgan('dev'))
// 노드 서버에서 리액트 프로젝트 연결(배포할 때 필요)
app.use(express.static(path.join(__dirname, 'react-project/build')))
// json으로 받기
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 쿠키 세션 설정
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}))
// 로그인 관련 (passport 모듈)
app.use(passport.initialize())
app.use(passport.session())

app.use('/user', userRouter)
// 혜주 작성
app.use('/out',outRouter)
app.use('/ware', wareRouter)

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})