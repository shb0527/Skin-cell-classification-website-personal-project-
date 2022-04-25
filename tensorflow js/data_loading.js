function generateData (trainData,batchSize)
{
  const imageTensors = [];
  const targetTensors = [];
  let allTextLines = this.csvContent.split(/\r|\n|\r/);
    const csvSeparator = ',';
    const csvSeparator_2 = '.';
  for ( let i = 0; i < batchSize; i++)
    {
      // split content based on comma
      const cols: string[] = allTextLines[i].split(csvSeparator);
      console.log(cols[0].split(csvSeparator_2)[0])
  if (cols[0].split(csvSeparator_2)[1]=="png")
      {
      const imageTensor = this.capture(i);
        let targetTensor   =tf.tensor1d([this.label_x1[i],this.label_x2[i]]);                                          
        targetTensor.print();
        imageTensors.push(imageTensor);
        targetTensors.push(targetTensor);
      }
    }
  const images = tf.stack(imageTensors);
  const targets = tf.stack(targetTensors);
  return {images, targets};
}
//-------------------------------------------------------------
// converts images in HTMLImageElement into the tensors
// takes Image Id in HTML as argument
//-------------------------------------------------------------
function capture(imgId)
{
  // Reads the image as a Tensor from the <image> element.
  this.picture =  document.getElementById(imgId);
  const trainImage = tf.browser.fromPixels(this.picture);
  
  const trainim =  trainImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
  return trainim;
}

const myData = JSON.parse(await fs.readFile('files.json'));

for(const data of myData){
  const image = await fs.readFile(data.imagePath),
        labels = data.labels;

  // how to train, where to pass image and labels ?

}
