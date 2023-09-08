const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')
const cors = require('cors')
//혜주작성
const outRouter = require('./routes/out')

// .env 파일 관련
dotenv.config()

// sequelize 연결
const { sequelize } = require('./models')

const app = express()
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

// 요청과 응답에 대한 정보 출력
// 이렇게 생긴 애들이 나옵니다 -> GET / 200 6.044 ms - 644
app.use(morgan('dev'))
// 노드 서버에서 리액트 프로젝트 연결
app.use(express.static(path.join(__dirname, 'react-project/build')))
// json으로 받기
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 리액트-노드 통신
app.use(cors())

// 혜주 작성
app.use('/out/create',outRouter)







// 없는 경로로 요청할 경우
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404
    next(error)
})
app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}
    res.status(err.status || 500)
    res.render('error')
})

// 되도록 이 위로 코드 작성해주세요
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})