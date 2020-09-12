var http = require('http')
var fs = require('fs')
var axios = require('axios')
var url = require('url')

const url1 = 'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'
const url2 = 'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json'

http.createServer( (req, res) => {
  let path = url.parse(req.url).pathname
  if (path == "/api/proveedores") {
    axios.get(url1).then( (response) => 
      response["data"]
    )
    .then( (response) => {
      fs.readFile('demofile1.html', (error, data) => {
        if (error) {
          res.writeHead(404, {'Content-Type': 'text/html'})
          return res.end("404 Not Found")
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.write(data)
          //Tabla proveedores
          res.write('<h1>Listado de proveedores</h1>')
          res.write('<table class="table table-striped">\
          <thead>\
            <tr>\
                <th>ID</th><th>Nombre</th><th>Contacto</th>\
            </tr>\
          </thead>')
          for (let el of response)
            res.write(`<tr><td>${el["idproveedor"]}</td><td>${el["nombrecompania"]}</td><td>${el["nombrecontacto"]}</td></tr>`)
          res.end('</table></body>\
          </html>')
        }
      })
    })
  } else if (path == '/api/clientes') {
    axios.get(url2).then( (response) => 
      response["data"]
    )
    .then( (response) => {
      fs.readFile('demofile1.html', (error, data) => {
        if (error) {
          res.writeHead(404, {'Content-Type': 'text/html'})
          return res.end("404 Not Found")
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.write(data)
          //Tabla clientes
          res.write('<h1>Listado de clientes</h1>')
          res.write('<table class="table table-striped">\
          <thead>\
            <tr>\
                <th>ID</th><th>Nombre</th><th>Contacto</th>\
            </tr>\
          </thead>')
          for (let el of response)
            res.write(`<tr><td>${el["idCliente"]}</td><td>${el["NombreCompania"]}</td><td>${el["NombreContacto"]}</td></tr>`)
          res.end('</table></body>\
          </html>')
        }
      })
    })
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'})
    return res.end("404 Not Found")
  }
}).listen(8081)