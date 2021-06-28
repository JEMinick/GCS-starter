const router = require('express').Router();
// const { Image } = require('../../models');

const { Image } = require("../../models")
const Multer = require("multer")
const { Storage } = require("@google-cloud/storage")
const uuid = require("uuid");
// const { BelongsTo } = require("sequelize/types");
const uuidv1 = uuid.v1;

// env
require("dotenv").config()

const storage = new Storage( 
  {projectid: process.env.GCLOUD_PROJECT, 
   credentials: {client_email: process.env.GCLOUD_CLIENT_EMAIL, 
                 private_key: process.env.GCLOUD_PRIVATE_KEY} 
  });

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

const bucket = storage.bucket(process.env.GCS_BUCKET);

// ADD new image:
router.post('/', multer.single("file"), async (req, res) => {

  try {
    // console.log( "POST new user: " );
    // console.log( req.body );
    
    const userData = await Image.create(
    { 
      username: req.body.username, 
      email:    req.body.email, 
      password: req.body.password 
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } 
  catch (err) {
    res.status(400).json(err);
  }

  // -------------------------------------------------------------------------

  const newFileName = uuidv1() + "-" + req.file.originalname
  // const newFileName = req.file.originalname
  const blob = bucket.file(newFileName)
  const blobStream = blob.createWriteStream()

  // if there's an error, let us know!
  blobStream.on( "error", err => console.error(err) )

  blobStream.on( "finish", () => {
    // make a query to send the data to our database, as well as our public URL to our bucket
    const publicURL = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`

    const imageDetails = JSON.parse(req.body.data)
    imageDetails.image = publicURL

    console.log( `imageDetails: [${JSON.stringify(imageDetails)}]` );

    // console.log( db );
    db.Image.create(imageDetails).then( () => res.json(imageDetails) )

  })

  blobStream.end( req.file.buffer )

})

const { Image } = require("../../models")
const Multer = require("multer")
const { Storage } = require("@google-cloud/storage")
const uuid = require("uuid");
// const { BelongsTo } = require("sequelize/types");
const uuidv1 = uuid.v1;

// env
require("dotenv").config()

const storage = new Storage( 
  {projectid: process.env.GCLOUD_PROJECT, 
   credentials: {client_email: process.env.GCLOUD_CLIENT_EMAIL, 
                 private_key: process.env.GCLOUD_PRIVATE_KEY} 
  });

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

const bucket = storage.bucket(process.env.GCS_BUCKET);

module.exports = function (app) {
  app.post( "/api/imageupload", multer.single("file"), (req, res) => {
    const newFileName = uuidv1() + "-" + req.file.originalname
    const newFileName = req.file.originalname
    const blob = bucket.file(newFileName)
    const blobStream = blob.createWriteStream()

    // if there's an error, let us know!
    blobStream.on( "error", err => console.error(err) )

    blobStream.on( "finish", () => {
      // make a query to send the data to our database, as well as our public URL to our bucket
      const publicURL = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`

      const imageDetails = JSON.parse(req.body.data)
      imageDetails.image = publicURL

      console.log( `imageDetails: [${JSON.stringify(imageDetails)}]` );

      // console.log( db );
      db.Image.create(imageDetails).then( () => res.json(imageDetails) )

    })

    blobStream.end( req.file.buffer )

  })
}
