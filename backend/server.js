const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 MANGANG MongoDB Express Server running on port ${PORT}`);
  console.log(`===================================================`);
});
