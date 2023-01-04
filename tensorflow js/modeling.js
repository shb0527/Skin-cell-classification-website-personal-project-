import { malariaData } from "./file_load.js"

async function showExamples(data) {
    // Create a container in the visor
    const surface = tfvis
      .visor()
      .surface({ name: "Input Data Examples", tab: "Input Data" });
  
    // Get the examples
    const examples = data.nextTrainBatch(10);
    const numExamples = examples.xs.shape[0];
    
    // Create a canvas element to render each example
    for (let i = 0; i < numExamples; i++) {
      const imageTensor = tf.tidy(() => {
        // Reshape the image to 224x224 px
        return examples.xs
          .slice([i, 0], [1, examples.xs.shape[1]])
          .reshape([224, 224, 1]);
      });
  
      const canvas = document.createElement("canvas");
      canvas.width = 224;
      canvas.height = 224;
      canvas.style = "margin: 4px;";
      console.log(imageTensor)
      await tf.browser.toPixels(imageTensor, canvas);
      surface.drawArea.appendChild(canvas);
  
      imageTensor.dispose();
    }
  }

async function run() {
    console.log("run...");
    const data = new malariaData();
  
    await data.load();
    await showExamples(data);
  

  }
  
  document.addEventListener("DOMContentLoaded", run); 