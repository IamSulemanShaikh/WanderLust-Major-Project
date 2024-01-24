if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }
  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");
  const path = require("path");
  const User = require("./models/user.js");
  const methodOverride = require("method-override");
  const ejsMate = require("ejs-mate");
  const ExpressError = require("./utils/ExpressError.js");
  const session = require("express-session");
  const MongoStore = require("connect-mongo");
  const flash = require("connect-flash");
  const passport = require("passport");
  const localStrategy = require("passport-local");
  
  // route require
  const listingRouter = require("./routes/listing.js");
  const reviewRouter = require("./routes/review.js");
  const userRouter = require("./routes/user.js");
  
  // set and use
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));
  app.engine("ejs", ejsMate);
  app.use(express.static(path.join(__dirname, "/public")));
  
  //listing server
  app.listen(8080, () => {
    console.log("port is runing");
  });
  
  // db connection
  // MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
  const dbUrl = process.env.ATLASDB_URL;
  
  main()
    .then(() => {
      console.log("mongodb connection success");
    })
    .catch((err) => {
      console.log(err);
    });
  async function main() {
    await mongoose.connect(dbUrl);
  }
  
  // session
  
  const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
      secret: "mysupersecretcode",
    },
    touchAfter: 24*3600,
  })
  
  store.on("error", ()=>{
    console.log("ERROR in MONGO SESSION STORE", err);
  })
  
  const sessionOption = {
    store,
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  };
  app.use(session(sessionOption));
  app.use(flash());
  
  // config passport
  
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
  
    next();
  });
  
  // router use
  app.use("/listings", listingRouter);
  app.use("/listings/:id/reviews", reviewRouter);
  app.use("/", userRouter);
  
  // error handling
  
  app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
  });
  
  app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.render("error.ejs", { message });
    //   res.status(statusCode).send(message);
  });