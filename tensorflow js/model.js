export class cellmodel {   
      
    async load(X,Y) {
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
            activation: 'softmax',
        })
        )
        model.compile({
            optimizer: 'adam',
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy'],
          })
        // Train
        await model.fit(X, Y, {
            batchSize: 256,
            validationSplit: 0.1,
            epochs: 20,
            shuffle: true, 
        })
    
        // Save
        model.save('file://model_result/sorting_hat') 

        // Cleanup!
        tf.dispose([X, Y, model])
        console.log('Tensors in memory', tf.memory().numTensors)
    }
}