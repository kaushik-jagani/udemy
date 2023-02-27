const fs = require("fs");
const { toUnicode } = require("punycode");
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


//:::--- using async await
//-> handle multiple promise

const getDogPic = async ()=>{
  try{
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Bread : ${data}`);
  
    const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all1 =await Promise.all([res1,res2,res3]);
    const imgs = all1.map(el =>
      el.body.message);
    console.log(imgs);
  
    await writeFilePro("dog-img2.txt", imgs.join('\n'));

    console.log("dog image is saved in text file\n");
  }catch(err){
    console.log(err);
  }

}

//->handle single promise

// const getDogPic = async ()=>{
//   try{
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     console.log(`Bread : ${data}`);
  
//     const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     console.log(res.body.message);
  
//     await writeFilePro("dog-img2.txt", res.body.message);
//     console.log("dog image is saved in text file\n");
//   }catch(err){
//     console.log(err);
//   }

// }
 
getDogPic();

// --: using promises

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message, res.body.message);
//     return writeFilePro("dog-img2.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("dog image is saved in text file\n");
//   })
//   .catch((err) => {
//     console.log(err.message + " error ocuured");
//   });
 

   
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
