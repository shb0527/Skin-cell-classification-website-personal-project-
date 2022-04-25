import { Dataset } from "./to_tensor.js";


async function run() {
    console.log("run...");
    const data = new Dataset();
  
    await data.loadLocalImage();

  

  }
  document.addEventListener("DOMContentLoaded", run); 