const exp = require('express')
const app = exp()
const port = 5000
const path = require('path')

const multer = require('multer')
const destination = (req, file, cb) => cb(null, './transfer/')
const filename = (req, file, cb) => cb(null, file.originalname)
const storage = multer.diskStorage({ destination, filename })
const upload = multer({ storage })

app.use(exp.static(__dirname))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.post('/', upload.single('something'), (req, res) => {
  console.log('file from IP:', req.ip)
  try {
    if (req.file === undefined) throw Error('file undefined')
    console.dir(req.file, { colors: true, depth: 1 })
    res.sendFile(path.resolve(__dirname, 'else.html'))
  } catch (error) {
    console.log(error)
    res.send('something went wrong')
  }
})

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
