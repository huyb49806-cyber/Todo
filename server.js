const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const FRONTEND_ORIGIN = 'http://localhost:3000';

server.use(middlewares);
server.use(jsonServer.bodyParser);

// 1. Cấu hình CORS & Headers (Để cookie hoạt động)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

//Hàm lấy user từ Cookie
const getUserFromCookie = (req) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const cookies = {};
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    cookies[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  const authToken = cookies['auth_token'];
  if (!authToken) return null;

  try {
    const userStr = decodeURIComponent(authToken).replace('j:', '');
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};


// Đăng ký (Register)
server.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  const db = router.db;
  const existingUser = db.get('users').find({ email }).value();
  if (existingUser) {
    return res.status(400).jsonp({ error: "Email này đã được sử dụng" });
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    name,
    role: "USER"
  };

  db.get('users').push(newUser).write();
  res.status(201).jsonp({ message: "Đăng ký thành công", user: { id: newUser.id, email: newUser.email, name: newUser.name } });
});

// Đăng nhập
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  
  const user = db.get('users').find({ email, password }).value();

  if (user) {
    // Set HttpOnly Cookie
    res.cookie('auth_token', JSON.stringify(user), {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
      sameSite: 'Lax'
    });

    // Trả về info (trừ password)
    res.jsonp({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(401).jsonp({ error: "Sai email hoặc mật khẩu" });
  }
});

// Check Auth
server.get('/check-auth', (req, res) => {
  const user = getUserFromCookie(req);
  if (user) {
    res.jsonp({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(401).jsonp({ error: "Chưa đăng nhập hoặc phiên hết hạn" });
  }
});

// Đăng xuất
server.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.jsonp({ message: "Đã đăng xuất" });
});

//AUTHORIZATION
// Middleware chặn mọi request xuống DB để kiểm tra quyền
server.use((req, res, next) => {
  if (['/login', '/register', '/check-auth', '/logout'].includes(req.path)) {
    return next();
  }
  const user = getUserFromCookie(req);
    if (!user) {
    return res.status(401).jsonp({ error: "Vui lòng đăng nhập để tiếp tục" });
  }
  if (req.path.startsWith('/todos')) { 
    //(POST)Tự động gắn userId
    if (req.method === 'POST') {
      req.body.userId = user.id;
      req.body.createdAt = new Date().toISOString();
    }
    //(GETChỉ lấy Todo của mình
    if (req.method === 'GET') {
      req.query.userId = user.id.toString(); 
    }
    //(PUT, PATCH, DELETE)Check quyền sở hữu
    if (['PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const parts = req.path.split('/');
      const todoId = parseInt(parts[parts.length - 1]);
      if (!isNaN(todoId)) {
        const todo = router.db.get('todos').find({ id: todoId }).value();
        if (todo && todo.userId !== user.id) {
          return res.status(403).jsonp({ error: "Bạn không được phép sửa/xóa Todo của người khác!" });
        }
      }
    }
  }

  next();
});

server.use((req, res, next) => {
  if (req.path.startsWith('/users')) {
    const user = getUserFromCookie(req);
    if (!user) {
      return res.status(401).jsonp({ error: "Vui lòng đăng nhập" });
    }
    if ((req.method === 'DELETE' || req.method === 'GET') && user.role !== 'ADMIN') {
       return res.status(403).jsonp({ error: "Chỉ Admin mới có quyền này!" });
    }
    if (req.method === 'DELETE') {
       const parts = req.path.split('/');
       const deleteId = parts[parts.length - 1];
       if (deleteId == user.id) {
           return res.status(400).jsonp({ error: "Không thể tự xóa chính mình!" });
       }
    }
  }
  next();
});

server.use(router);

server.listen(8000, () => {
  console.log('Server TodoMVC đang chạy tại port 8000');
});