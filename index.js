/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {"message" : "Enter your URL: ", //question
     "name" : "URL"} //storing prompt
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL; //getting URL as answer and storing in a variable
    var qr_svg = qr.image(url); //converting url to qr image
    qr_svg.pipe(fs.createWriteStream('qr_code.png')); //naming image
    fs.writeFile('URLcollection.txt', url, (err) => { 
        if (err) throw err;
        console.log('The file has been saved!');
    }); //storing url in a seperate file
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
      console.log("Something else went wrong");
    }
  });