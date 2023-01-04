
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


async function changeToTensor(image_path, Tensors, tensorX, tensorY){

    const cake = new Image()
    cake.crossOrigin = 'anonymous' 
   
    cake.src =  image_path
        // cake.src = 'cake.jpg'
    cake.onload = () => { 
            const cakeTensor = tf.browser.fromPixels(cake) 
       
            console.log( 
                `Successful conversion from trainImage() to a ${cakeTensor.shape} tensor`
            )
            // const trainim = cakeTensor.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
            
            // showExamples(cakeTensor, canvas, surface)
    
            for (var i = 0; i < 15; i++){
                for (var j = 0; j < 15; j++){
                    const sliced = cakeTensor.slice([(224+21)*i,(224+21)*j,0 ], [224,224,3])
                    const label = tf.tensor1d([0,1]);
                    Tensors.push([sliced,label])
                    tensorX.push(sliced)
                    tensorY.push(label)
                }
            }
    }

}
async function run() {
    console.log("run...");

    const surface = tfvis
    .visor()
    .surface({ name: "Infected / Uninfected Cell samples", tab: "Input Data" });

    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    canvas.style = "margin: 4px;";
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";

    // for (var i = 0; i < 250; i++){
    //     var imageTensor = await changetotensor(i)
    //     imageTensors.push(imageTensor)
    //     showExamples()
    // }
    const Tensors = []
    const tensorX= []
    const tensorY = []
    const testTensors = []
    const testX = []
    const testY = []
    const cake = new Image()
    cake.crossOrigin = 'anonymous' 
   
    cake.src =  'sobel_uninfected.png'
        // cake.src = 'cake.jpg'
    cake.onload = () => { 
            const cakeTensor = tf.browser.fromPixels(cake) 
       
            console.log( 
                `Successful conversion from trainImage() to a ${cakeTensor.shape} tensor`
            )
            // const trainim = cakeTensor.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
            showExamples(cakeTensor, canvas, surface)
    
            for (var i = 0; i < 15; i++){
                for (var j = 0; j < 15; j++){
                    const sliced = cakeTensor.slice([(224+21)*i,(224+21)*j,0 ], [224,224,3])
                    const label = tf.tensor1d([0,1]);
                    Tensors.push([sliced,label])
                    tensorX.push(sliced)
                    tensorY.push(label)
                }
            }
    }
    

    const honey = new Image()
    honey.crossOrigin = 'anonymous' 
   
    honey.src =  'showing2.png'
        // cake.src = 'cake.jpg'
        honey.onload = () => { 
            const honeyTensor = tf.browser.fromPixels(honey) 
       
            console.log( 
                `Successful conversion from trainImage() to a ${honeyTensor.shape} tensor`
            )
            // const trainim = cakeTensor.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
            
        
            showExamples(honeyTensor, canvas, surface)
    
          
    }

    //    const milk = new Image() 
    //    milk.crossOrigin = 'anonymous' 
      
    //    milk.src =  'para_test.png'
          
    //    milk.onload = () => { 
    //            const milkTensor = tf.browser.fromPixels(milk) 
     
    
    //            console.log( 
    //                `Successful conversion from testImage() to a ${milkTensor.shape} tensor`
    //            )
    //            // const trainim = cakeTensor.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
               
             
       
    //            for (var i = 0; i < 5; i++){
    //                for (var j = 0; j < 5; j++){
    //                    const test_sliced = milkTensor.slice([(224+25)*i,(224+25)*j,0 ], [224,224,3])
    //                    const test_label = tf.tensor1d([1,0]);
    //                    testTensors.push([test_sliced,test_label])
    //                    testX.push(test_sliced)

    //                    testY.push(test_label)
    //                }
    //            }
         
      
   
    //       }  

    //    const bread = new Image() 
    //    bread.crossOrigin = 'anonymous' 
      
    //    bread.src =  'un_test.png'
         
    //    bread.onload = () => { 
    //            const breadTensor = tf.browser.fromPixels(bread) 
    //            const test_sliced = breadTensor.slice([(224+25),(224+25),0 ], [224,224,3])
     
    
    //            console.log( 
    //                `Successful conversion from testImage() to a ${breadTensor.shape} tensor`
    //            )
    //            // const trainim = cakeTensor.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
               
             
       
    //            for (var i = 0; i < 5; i++){
    //                for (var j = 0; j < 5; j++){
    //                    const test_sliced2 = breadTensor.slice([(224+25)*i,(224+25)*j,0 ], [224,224,3])
    //                    const test_label2 = tf.tensor1d([0,1]);
    //                    testTensors.push([test_sliced2,test_label2])
    //                    testX.push(test_sliced2)
    //                    testY.push(test_label2)
    //                }
    //            }
     
    //            const testxX = tf.stack(testX)
    //            const testyY = tf.stack(testY)
               
    //       console.log(testxX.shape)
    //       console.log(testyY.shape)
   
    //       }  

       const coffee = new Image() 
       coffee.src =  'sobel_parasite.png'
       coffee.onload = () => {
            const coffeeTensor = tf.browser.fromPixels(coffee) 
                
            console.log( 
                `Successful conversion from trainImage() to a ${coffeeTensor.shape} tensor`
            )
            // const trainim = cakeTensor.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
            
            // showExamples(coffeeTensor, canvas, surface)
            for (var i = 0; i < 15 ; i++){
                for (var j = 0; j < 15; j++){
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
            filters: 15,
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
        tfvis.show.modelSummary({name: 'Model Architecture', tab: 'Model'}, model);
        // Train
        model.fit(X, Y, {
            epochs: 30,
            // validationData: [testxX, testyY],
            // trainLogs = []
            // callbacks: {
            //     onEpochEnd: async (epoch, logs) => {
            //         trainLogs.push(logs)
            //         tfvis.show.history(loss, trainLogs, ['loss'], { width: 400, height: 250 })
            //         tfvis.show.history(acc, trainLogs, ['acc'], { width: 400, height: 250 })
            //     },
            // },
          })
        model.summary();
 
        // Cleanup!
        
        console.log('Tensors in memory', tf.memory().numTensors)
        // const cell = new Image() 
        // cell.crossOrigin = 'anonymous' 
       
        // cell.src =  'images_for_assets_folder/Uninfected/249.png'
        //     // cake.src = 'cake.jpg'
        // cell.onload = () => {

        //     const cellTensor = tf.browser.fromPixels(cell) 
                
        //     console.log( 
        //         `Successful conversion from Image() to a ${cellTensor.shape} tensor`
        //     )

        //      const results = model.predict(cellTensor)
        //      const predictions =  results.array()
        //     console.log(predictions)
        // }

        const cell = new Image() 
      
        cell.src =  '13.png'
            // cake.src = 'cake.jpg'
        cell.onload = () => {
            const cellTensor = tf.browser.fromPixels(cell) 
                
            console.log( 
                `Successful conversion from Image() to a ${cellTensor.shape} tensor`
            )


           
           const prediction = model.predict(tf.expandDims(cellTensor, 0))
           prediction.print()
           console.log(prediction[0])
           const headers = ['Infected', 'Uninfected']
           const values = [prediction[0][0], prediction[0][1]]
           const surface= { name: 'Prediction', tab: 'Charts'}
           tfvis.render.table(surface, {headers, values})
                
        }
        
        var preview = document.querySelector('img');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();
      
        reader.addEventListener("load", function () {
          preview.src = reader.result;
          const gantTensor = tf.browser.fromPixels(preview) 
          console.log( 
              `Successful conversion from DOM to a ${gantTensor.shape} tensor`
          )
        }, false);
      
        if (file) {
            reader.readAsDataURL(file);    
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

