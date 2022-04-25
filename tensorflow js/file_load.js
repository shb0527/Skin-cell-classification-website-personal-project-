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


// const selectedFile = document.getElementById('input');
// const inputElement = document.getElementById("input").files[0];
// inputElement.addEventListener("change", handleFiles, false);
// function handleFiles() {
//   const fileList = this.files; /* now you can work with the file list */
// }
// for (let i = 0; i < 3; i++) {
//     const file = fileList[i];
//     reader.readAsDataURL(file);
//     // ...
//   }


const IMAGE_SIZE =784;
const NUM_CLASSES = 2;
const NUM_DATASET_ELEMENTS = 250;

const NUM_TRAIN_ELEMENTS = 200;
const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;
const file_path  = 'images_for_assets_folder/Uninfected/9.png'

export class malariaData{
    constructor() {
        this.shuffledTrainIndex = 0;
        this.shuffledTestIndex = 0;
      }
    
    async load() {
        // Make a request for the MNIST sprited image.
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
       
        const imgRequest = new Promise((resolve, reject) => {

        img.crossOrigin = '';
        img.onload = () => {

            img.width = img.naturalWidth;
            img.height = img.naturalHeight;

            const datasetBytesBuffer =
                new ArrayBuffer(IMAGE_SIZE*4);
            img.width = 28;
            img.height = 28;
            canvas.width = img.width;
            canvas.height = img.height;
            console.log(canvas.width)
            console.log(canvas.height)


            for (let i = 0; i < canvas.width*canvas.height; i++) {
            const datasetBytesView = new Float32Array(
                datasetBytesBuffer, i * IMAGE_SIZE*4, IMAGE_SIZE*4);
 
            ctx.drawImage(
                img, 0, i * img.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            

            for (let j = 0; j < imageData.data.length; j++) {
                // All channels hold an equal value since the image is grayscale, so
                // just read the red channel.
                datasetBytesView[j] = imageData.data[j] / 255;
            
            }


            }
            this.datasetImages = new Float32Array(datasetBytesBuffer);
          
            resolve();
        };
        img.src = file_path;
        });  
        const [imgResponse] =
          await Promise.all([imgRequest]);
        this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
        this.trainImages =
        this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
    }


    nextTrainBatch(batchSize) {
        return this.nextBatch(
            batchSize, [this.trainImages], () => {
            this.shuffledTrainIndex =
                (this.shuffledTrainIndex + 1) % this.trainIndices.length;
            return this.trainIndices[this.shuffledTrainIndex];
            });
    }

    nextBatch(batchSize, data, index) {
        const batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE);
        
        for (let i = 0; i < batchSize; i++) {
            const idx = index();

        const image =
            data[0].slice(idx * IMAGE_SIZE, idx * IMAGE_SIZE + IMAGE_SIZE);
        batchImagesArray.set(image, i * IMAGE_SIZE);

        
        }

        const xs = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE]);


        return {xs};
    }

}
