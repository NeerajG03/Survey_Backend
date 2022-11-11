const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/user");
const Form = require("./Models/form");

const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 8000;
const uri =
  "mongodb+srv://xdneeraj:seproject@clusterstore.16q3u8s.mongodb.net/?retryWrites=true&w=majority";

//FIREBASE
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyDQp9aeY9LumiJ3Yi4Ol6F3suP154zj-vw",
  authDomain: "survey-auth-10bd8.firebaseapp.com",
  projectId: "survey-auth-10bd8",
  storageBucket: "survey-auth-10bd8.appspot.com",
  messagingSenderId: "162747464963",
  appId: "1:162747464963:web:fd927f6937dded42a5bd36",
};

const fbApp = initializeApp(firebaseConfig);
const auth = getAuth();

mongoose
  .connect(uri)
  .then(() => {
    // User.updateOne(
    //   { uid: "KlSibLangDM6ZgOOTpiOsAj2edg1" },
    //   { $set: { forms: [] } },
    //   (err, succ) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("done");
    //     }
    //   }
    // );

    // User.find({}, function (err, res) {
    //   res.forEach((res2) => {
    //     console.log(res2.forms);
    //   });
    // });

    // Form.find({}, function (err, res) {
    //   res.forEach((r) => {
    //     console.log(r);
    //   });
    // });

    // Form.findOne(
    //   { formid: "b4ec61fe-7fe2-425f-b028-7a78c79aac8a" },
    //   function (err, res) {
    //     if (err) console.log(err);
    //     else console.log(res);
    //   }
    // );

    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/createform", (req, res) => {
  const form = new Form({
    uid: req.body.uid,
    formid: req.body.formid,
    formname: req.body.formname,
    formdata: JSON.stringify(req.body.formdata),
  });

  form
    .save()
    .then(() => {
      User.findOneAndUpdate(
        { uid: req.body.uid },
        {
          $push: {
            forms: { formid: req.body.formid, formname: req.body.formname },
          },
        },
        (err, succ) => {
          if (err) console.log(err);
        }
      );
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      if (err)
        res.status(400).json({ Message: "Cannot Save New Form To DB", err });
    });
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const name = req.body.name;

  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      //Add new user entry to our database
      const user = new User({
        uid: userCredential.user.uid,
        email,
        name,
        forms: [],
      });

      user
        .save()
        .then(() => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res
            .status(401)
            .json({ Message: "Could Not Save User Entry In Database", err });
        });
    })
    .catch((error) => {
      res
        .status(401)
        .json({ errorCode: error.code, errorMessage: error.message });
    });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      User.findOne({ uid: userCredential.user.uid }, (err, user) => {
        if (err)
          res
            .status(401)
            .json({ errorMessage: "Failed to fetch user from database" });
        else res.status(200).json(user);
      });
    })
    .catch((error) => {
      res
        .status(401)
        .json({ errorCode: error.code, errorMessage: error.message });
    });
});

app.get("/getform/:formid", (req, res) => {
  Form.findOne({ formid: req.params.formid }, (err, result) => {
    if (err) console.log("ERROR", err);
    else {
      res.status(200).json({
        ...result,
        formdata: JSON.parse(result.formdata),
      });
    }
  });
});

app.get("/getformlist/:uid", (req, res) => {
  User.findOne({ uid: req.params.uid }, (err, result) => {
    if (err) console.log(err);
    else {
      res.status(200).json({
        forms: result.forms,
      });
    }
  });
});

app.post("/answerform", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
