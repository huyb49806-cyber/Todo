const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({noCors: true});

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true'); 
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ username, password }).value();

  if (user) {
    res.cookie('auth_token', JSON.stringify(user), {
        httpOnly: true,  
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'Lax'
    });

    res.jsonp({
        id: user.id,
        name: user.name,
        username: user.username
    });
  } else {
    res.status(401).jsonp({ error: "Sai tên đăng nhập hoặc mật khẩu" });
  }
});

server.get('/check-auth', (req, res) => {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return res.status(401).jsonp({ error: "No cookie" });

    const cookies = {};
    cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        cookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    const authToken = cookies['auth_token'];
    
    if (authToken) {
        try {
            const userStr = decodeURIComponent(authToken);
            const user = JSON.parse(userStr.replace('j:', '')); 
            
            res.jsonp({
                id: user.id,
                name: user.name,
                username: user.username
            });
        } catch (e) {
            res.status(401).jsonp({ error: "Invalid token" });
        }
    } else {
        res.status(401).jsonp({ error: "Not authenticated" });
    }
});

server.post('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.jsonp({ message: "Đã đăng xuất" });
});

server.use(router);

server.listen(8000, () => {
  console.log('JSON Server Custom is running on port 8000');
});