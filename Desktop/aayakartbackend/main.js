const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const fileUpload = require("express-fileupload");

//Cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Allow cors
const cors = require("cors");
//Loop of allowed origins
const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Enable file upload using express-fileupload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//Server accept JSON
app.use(express.json());

//Connect to database
const connectDB = require("./config/database");
connectDB();

//Send html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Create User API
app.use("/api/users", require("./routes/users"));

//Request and responce for login user
app.use("/api/login", require("./routes/login"));

//Request and responce for login user
app.use("/api/users_login", require("./routes/users_login"));

//Request and responce for Category
app.use("/api/categories", require("./routes/category"));

//Request and responce for Notes
app.use("/api/note", require("./routes/note"));

//Request and responce for Notes
app.use("/api/products", require("./routes/products"));

//Request and responce for Files
app.use("/api/files", require("./routes/files"));

//Request and responce for Coupon
app.use("/api/coupon", require("./routes/coupon"));

//Request and responce for Blogs
app.use("/api/blogs", require("./routes/blogs"));

//Request and responce for Support
app.use("/api/support", require("./routes/support"));

//Request and responce for Server Info
app.use("/api/server_info", require("./routes/settings/server_info"));

//Request and responce for WebSocket
// const ws = require("./routes/socket");
app.use("/api/socket", require("./routes/socket"));

//Request and responce for mail
app.use("/api/mail", require("./routes/settings/mail"));

//Request and responce for MenuItem
app.use("/api/menu_item", require("./routes/menu_item"));

//Request and responce for Settings
app.use("/api/settings", require("./routes/settings/settings"));

//Request and responce for Comments
app.use("/api/comments", require("./routes/comments"));

//Request and responce for Orders
app.use("/api/orders", require("./routes/orders"));

//Profile Request and responce
app.use("/api/profile", require("./routes/profile"));

//Request and responce for Invoice
app.use("/api/invoice", require("./routes/invoice"));

//Request and responce for Cors
app.use("/api/cors", require("./routes/settings/cors"));

//Request and responce for Cart
// const cart = require("./routes/cart");
app.use("/api/cart", require("./routes/cart"));

//Request and responce for Template
app.use("/api/template", require("./routes/settings/template"));

//Request and responce for Transcation History
app.use("/api/transaction_history", require("./routes/transaction_history"));

//Request and responce for Payment
app.use("/api/payment", require("./routes/payments/razorpay"));

//Request and responce for Notifications
app.use("/api/notifications", require("./routes/notifications"));

//Request and responce for visits
app.use("/api/visits", require("./routes/statistics/visits"));

//Request and responce for statistics
app.use("/api/statistics", require("./routes/statistics/statistics"));

//Request and responce for register
app.use("/api/register", require("./routes/register_user"));

//Request and responce for token
app.use("/api/token", require("./routes/token"));

//Request and responce for tags
app.use("/api/tags", require("./routes/tags"));

//Request and responce for pages
app.use("/api/pages", require("./routes/pages"));

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
