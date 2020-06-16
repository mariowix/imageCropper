const sharp = require("sharp");
const path = require("path");
const fs = require('fs');
const processMin = require('./processMin');

module.exports = async ({ filename, output}) => {
    if (!filename)
        throw new Error("No filename provided");
    
    if (!fs.existsSync(filename))
        throw new Error("File not found at " + filename);

    const file = sharp(filename);
    const { height, width } = await file.metadata();
    const data = await file
                        .ensureAlpha()
                        .extractChannel(3)
                        .toColourspace('b-w')
                        .raw()
                        .toBuffer();

    let minLeft = 0;
    let minRigth = width;
    let minTop = 0;
    let minBottom = height;
    
    minLeft = processMin(data, minLeft, minRigth, minTop, minBottom, 1, (i,j) => ((j*width) + i) )

    minTop = processMin(data, minTop, minBottom, minLeft, minRigth, 1, (i,j) => ((i * width) + j))

    minRigth = processMin(data, minRigth, minLeft, minTop, minBottom, -1, (i,j) => ((j*width)+i))

    minBottom = processMin(data, minBottom, minTop, minLeft, minRigth, -1, (i,j) => ((i * width) + j))



    await sharp(filename)
            .extract({ left: minLeft, top: minTop, width: minRigth - minLeft, height: minBottom - minTop })
            .png()
            .toFile(output || 'min.'+path.basename(filename));
}
