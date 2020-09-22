import dva from 'dva'

//1.Initilize
const app=dva()
//2.Plugins
//app.use({})
//3.Model
app.model(require('./models/member').default)
app.model(require('./models/class').default)
//4.Router
app.router(require('./router').default)
//5.Start
app.start('#root')
