# Image Cropper
Tool for cropping images to the minimum possible.

## How it works?

Given an image it removes all empty pixels arround the pixels that are not. This has only been tested with png images.

## How to use?

First install by running

    $ npm i -g @mariomixtega/imagecropper
    
The you can simply run

    $ imagecropper --filename "/path/to/image.png"

And thats all! The new image will be saved on the same directory from where you use it.
If you want the result image been on other directory, you can use the --output parameter:

    $ imagecropper --filename "/path/to/image.png" --output "../my/folder/result.png"

## An example

Source Image:

<img width="345" alt="screenshot_imagefull" src="https://user-images.githubusercontent.com/64606785/84799463-ea240700-afc1-11ea-9980-b7a30b77f7ae.png">

Cropped Image:

<img width="205" alt="screenshot_cropped" src="https://user-images.githubusercontent.com/64606785/84799460-e98b7080-afc1-11ea-920b-227aece25a23.png">

