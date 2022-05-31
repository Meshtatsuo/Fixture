const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");

const multer = require("multer");
const { uploadFile, downloadFile } = require("./utils/s3");

const upload = multer({
  dest: "uploads/",
});

const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3001;
//creating Apollo server passing in schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// REST routes for S3 uploading and downloading
app.post("/uploadThumbnail", upload.single("file"), async (req, res) => {
  const file = req.file;

  const { filename, path } = req.file;
  console.log("Uploading Thumbnail...");
  await uploadFile(req.file);

  const image_key = `/image/${filename}`;
  console.log(image_key);
  res.status(200).json(image_key);
});

app.post("/uploadProduct", upload.single("file"), async (req, res) => {
  const { filename, path } = req.file;

  await uploadFile(req.file);

  const file_key = filename;
  console.log(file_key);
  res.status(200).json(file_key);
});

app.get("/image/:key", async (req, res) => {
  const key = req.params.key;
  console.log("Looking up image || " + key + " ||");
  try {
    const readStream = await getFileStream(key);
    readStream.pipe(res);
  } catch (err) {
    console.log(err);
  }
});

app.get("/download/:key/:fileName", async (req, res) => {
  const key = req.params.key;
  const fileName = req.params.fileName;
  console.log("Attempting to download...");
  const url = await downloadFile(key, fileName);
  res.send(url);
});

startServer();
