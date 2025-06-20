use('proyecto');

db.getCollection('user').insertMany([
  {
    name: "Michelle Ortega",
    username: "michelle123",
    password: "michellePass",
    email: "michelle@example.com",
    role: "admin",
    status: true,
    phone: "1234567890",
    createDate: new Date(),
    deleteDate: new Date()
  },
  {
    name: "Carlos Pérez",
    username: "carlos456",
    password: "carlosPass",
    email: "carlos@example.com",
    role: "user",
    status: true,
    phone: "0987654321",
    createDate: new Date(),
    deleteDate: new Date()
  }
]);
