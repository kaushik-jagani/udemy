const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject("file could not  found!!");
      }

      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject("could not write");
      }

      resolve("wwrite file successfully..");
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message, res.body.message);
    return writeFilePro("dog-img2.txt", res.body.message);
  })
  .then(() => {
    console.log("dog image is saved in text file\n");
  })
  .catch((err) => {
    console.log(err.message + " error ocuured");
  });


   
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed : ${data}`);

//   //   superagent
//   //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//   //     .end((err, res) => {
//   //       //error handling
//   //       if(err){
//   //         return console.log(err.message);
//   //       }

//   //       console.log(res.body.message);

//   //       fs.writeFile('dog-img2.txt',res.body.message,(err)=>{
//   //         console.log(`dog image is saved in text file\n`);
//   //       })
//   //     });

// //   superagent
// //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
// //     .then((res) => {
// //       console.log(res.body.message);

// //       fs.writeFile("dog-img2.txt", res.body.message, (err) => {
// //         console.log(`dog image is saved in text file\n`);
// //       });
// //     })
// //     .catch((err) => {
// //       console.log(err.message + " error ocuured");
// //     });
// });
