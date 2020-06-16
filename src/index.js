const sharp = require("sharp");
const path = require("path");
const args = require("yargs").argv;
const processMin = require('./processMin');

const processFile = async (fileName) => {
    try {
        const file = sharp(fileName)
        const data = await file
        .ensureAlpha()
        .extractChannel(3)
        .toColourspace('b-w')
        .raw()
        .toBuffer();

        const { height, width } = await  file.metadata();

        let minLeft = 0;
        let minRigth = width;
        let minTop = 0;
        let minBottom = height;
        
        minLeft = processMin(data, minLeft, minRigth, minTop, minBottom, 1, (i,j) => ((j*width) + i) )

        minTop = processMin(data, minTop, minBottom, minLeft, minRigth, 1, (i,j) => ((i * width) + j))

        minRigth = processMin(data, minRigth, minLeft, minTop, minBottom, -1, (i,j) => ((j*width)+i))

        minBottom = processMin(data, minBottom, minTop, minLeft, minRigth, -1, (i,j) => ((i * width) + j))



        await sharp(fileName)
        .extract({ left: minLeft, top: minTop, width: minRigth - minLeft, height: minBottom - minTop })
        .png()
        .toFile(args.output || 'min.'+path.basename(fileName));

    } catch (err) {
        console.log(err);
        console.log(fileName)
    }
}

processFile(args.filename);