const chai = require('chai');
const chaiFs = require('chai-fs');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised)
chai.use(chaiFs);

const expect = chai.expect;


const imagecropper = require("../src/index");

describe('Image cropper',  function () {
    it('should throw an error when filename is not provided', async function () {
        await expect(imagecropper({})).to.be.rejectedWith(Error);
    });

    it('should throw an error when filename doesnt exists', async function () {
        await expect(imagecropper({ filename: "file/file/file.file"})).to.be.rejectedWith(Error);
    });

    it('should crop test image into a shorter one in current folder with the default name', async function () {
        await imagecropper({ filename: "./testimages/greenBall.png" });

        expect("min.greenBall.png").to.be.a.file();
    });

    it('should crop test image into a shorter one in dist folder with the name of greenBall-cropped.png', async function () {
        await imagecropper({ filename: "./testimages/greenBall.png", output: "./dist/greenBall-cropped.png"});

        expect("./dist/greenBall-cropped.png").to.be.a.file();
    });
});