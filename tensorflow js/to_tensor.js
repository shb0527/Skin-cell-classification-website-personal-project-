
import { cellmodel } from "./model.js"

const cake = new Image() 
cake.crossOrigin = 'anonymous' 
const fs = require['fs']

const changetotensor = async() => {
    const cake = new Image() 
    cake.crossOrigin = 'anonymous' 
    // cake.src =  'images_for_assets_folder/Uninfected/'+ i +'.png' 
    cake.src = 'cake.jpg'
    cake.onload = () => { 
        const cakeTensor = tf.browser.fromPixels(cake) 
        console.log( 
            `Successful conversion from Image() to a ${cakeTensor.shape} tensor`
        )
        const trainim = cakeTensor.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));

    } 
}

async function showExamples(cakeTensor, canvas, surface) {
    // Create a container in the visor

    //   await tf.browser.toPixels(imageTensor, canvas);
    //   surface.drawArea.appendChild(canvas);
  
    //   imageTensor.dispose();
      tf.browser.toPixels(cakeTensor, canvas).then(() => {
        surface.drawArea.appendChild(canvas);
        cakeTensor.dispose();
      })
    
  }
function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);
  
    if (file) {
        reader.readAsDataURL(file);    
    }
  }



async function run() {
    console.log("run...");

    const surface = tfvis
    .visor()
    .surface({ name: "Input Data Examples", tab: "Input Data" });

    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    canvas.style = "margin: 4px;";

    // for (var i = 0; i < 250; i++){
    //     var imageTensor = await changetotensor(i)
    //     imageTensors.push(imageTensor)
    //     showExamples()
    // }
    const Tensors = []
    const tensorX= []
    const tensorY = []

    const cake = new Image() 
    cake.crossOrigin = 'anonymous' 
   
    cake.src =  'unin.png'
        // cake.src = 'cake.jpg'
    cake.onload = () => { 
            const cakeTensor = tf.browser.fromPixels(cake) 
            
            console.log( 
                `Successful conversion from Image() to a ${cakeTensor.shape} tensor`
            )
            // const trainim = cakeTensor.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
            
            showExamples(cakeTensor, canvas, surface)
    
            for (var i = 0; i < 16; i++){
                for (var j = 0; j < 16; j++){
                    const sliced = cakeTensor.slice([(224+21)*i,(224+21)*j,0 ], [224,224,3])
                    const label = tf.tensor1d([0,1]);
                    Tensors.push([sliced,label])
                    tensorX.push(sliced)
                    tensorY.push(label)
                }
            }
      
   

       } 
       const coffee = new Image() 
       coffee.src =  'par.png'
       coffee.onload = () => {
            const coffeeTensor = tf.browser.fromPixels(coffee) 
                
            console.log( 
                `Successful conversion from Image() to a ${coffeeTensor.shape} tensor`
            )
            // const trainim = cakeTensor.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
            
            showExamples(coffeeTensor, canvas, surface)
            for (var i = 0; i < 16 ; i++){
                for (var j = 0; j < 16; j++){
                    const sliced2 = coffeeTensor.slice([(224+21)*i,(224+21)*j,0 ], [224,224,3])
                    const label2 = tf.tensor1d([1,0]);
                    Tensors.push([sliced2, label2])
                    tensorX.push(sliced2)
                    tensorY.push(label2)
                }
            }
            const X = tf.stack(tensorX)
            const Y = tf.stack(tensorY)
            console.log(X.shape)
            console.log(Y.shape)
            X.dispose();
            Y.dispose();
        const model = tf.sequential()

        // Conv + Pool combo
        model.add(
        tf.layers.conv2d({
            filters: 16,
            kernelSize: 3,
            strides: 1,
            padding: 'same',
            activation: 'relu',
            kernelInitializer: 'heNormal',
            inputShape: [224, 224, 3],
        })
        )
        model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }))

        // Conv + Pool combo
        model.add(
        tf.layers.conv2d({
            filters: 32,
            kernelSize: 3,
            strides: 1,
            padding: 'same',
            activation: 'relu',
        })
        )
        model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }))

        // Conv + Pool combo
        model.add(
        tf.layers.conv2d({
            filters: 64,
            kernelSize: 3,
            strides: 1,
            padding: 'same',
            activation: 'relu',
        })
        )
        model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }))

        // Flatten for connecting to deep layers
        model.add(tf.layers.flatten())

        // One hidden deep layer
        model.add(
        tf.layers.dense({
            units: 128,
            activation: 'tanh',
        })
        )
        // Output
        model.add(
        tf.layers.dense({
            units: 2,
            activation: 'sigmoid',
        })
        )
        model.compile({
            optimizer: 'adam',
            loss: 'binaryCrossentropy',
            metrics: ['accuracy'],
        })

        // Train
        model.fit(X, Y, {
            epochs: 5,
         
            // callbacks: {
            //     onEpochEnd: async (epoch, logs) => {
            //         trainLogs.push(logs)
            //         tfvis.show.history(loss, trainLogs, ['loss', 'val_loss'], { width: 400, height: 250 })
            //         tfvis.show.history(acc, trainLogs, ['acc', 'val_acc'], { width: 400, height: 250 })
            //     },
            // },
          })
          

        // Save
        // Cleanup!
        // tf.dispose([X, Y, model])
        console.log('Tensors in memory', tf.memory().numTensors)
        const cellImage = document.querySelector('#cells')
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();
        reader.addEventListener("load", function () {
            cellImage.src = reader.result;
          }, false);
        
          if (file) {
              reader.readAsDataURL(file);    
          }
        cellImage.onload = () => {
            const cellTensor = tf.browser.fromPixels(cellImage) 
                
            console.log( 
                `Successful conversion from Image() to a ${cellTensor.shape} tensor`
            )

             const results = model.predict(cellTensor)
             const predictions =  results.array()
            console.log(predictions)
        }
       }

      
}
  document.addEventListener("DOMContentLoaded", run); 




// for (let i = 1; i < 250; i++) {
//     cake.src = 'images_for_assets_folder/Uninfected/C1_thinF_IMG_20150604_104722_cell_'+i+'.png' 
//     if (cake.src){
//         cake.onload = () => { 
//             const cakeTensor = tf.browser.fromPixels(cake) 
//             console.log( 
//                 `Successful conversion from Image() to a ${cakeTensor.shape} tensor`
//             )
//         }
//     }
// }
// function generateData (trainData,batchSize)
// {
//   const imageTensors = [];
//   const targetTensors = [];
// //   let allTextLines = this.csvContent.split(//r|/n|/r/);
// //     const csvSeparator = ',';
// //     const csvSeparator_2 = '.';
//   for ( let i = 0; i < batchSize; i++)
//     {
//       // split content based on comma
//       const cols: string[] = allTextLines[i].split(csvSeparator);
//       console.log(cols[0].split(csvSeparator_2)[0])
//   if (cols[0].split(csvSeparator_2)[1]=="png")
//       {
//       const imageTensor = this.totensor();
//         let targetTensor   =tf.tensor1d([this.label_x1[i],this.label_x2[i]]);                                          
//         targetTensor.print();
//         imageTensors.push(imageTensor);
//         targetTensors.push(targetTensor);
//       }
//     }
//   const images = tf.stack(imageTensors);
//   const targets = tf.stack(targetTensors);
//   return {images, targets};
// }
// //-------------------------------------------------------------
// // converts images in HTMLImageElement into the tensors
// // takes Image Id in HTML as argument
// //-------------------------------------------------------------
// function capture(imgId)
// {
//   // Reads the image as a Tensor from the <image> element.
//   this.picture =  document.getElementById(imgId);
//   const trainImage = tf.browser.fromPixels(this.picture);
  
//   const trainim =  trainImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
//   return trainim;
// }

