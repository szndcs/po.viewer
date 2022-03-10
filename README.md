# po.viewer v1.5.0
A very simply and easy to use image viewer written in js

## Changelog

### v1.5.0 - 2022-03-10
- first public release
- simplified the code, rewrite it in oop style
- added caption attribute

### v1.3.0 - 2022-01-19
- added data attributes
- made the js works automatically, you don't have to insert anything (just include the files)

### v1.0.0 - 2022-01-05
- created the functions, have to manually insert the div
- added css
- add new function: image rotation

## Description
Hi. Thanks for the interest of this project and hope you will enjoy my work.
First of all, I made it as a study project. I wanted to create a simple picture viewer script what I can use in my different works. This can open the full version of the corresponding image in the same browser window just above the content. I searched accross the internet to get what I need but after a long period I decided to create my own software. This is po.viewer.

You can use it or fork it freely under the GNU v3.0 license.

## Dependencies
po.viewer needs jQuery (version 3.6.0. or above) and Fomantic UI (version 2.8 or above) to works correctly. (Fomantic UI is a fork of Semantic UI.) So you have to include both of them in your html file. Simpliest way to include them through a CDN in the <head></head>:

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<!-- Fomantic UI -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.css">
<script src="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.js"></script>
```

You must include jQuery before anything else. After these steps you can include the downloaded po.viewer files.

Documentations could be found:
- https://jquery.com/
- https://fomantic-ui.com/

## Install
You need include two files in the <head></head> after jQuery and Fomantic UI:

```html
<!-- po.viewer -->
<script src="assets/js/po/po.js"></script>
<link rel="stylesheet" type="text/css" href="assets/css/po/po.css">
```

And that's all. Now you can use po.viewer. IF you reload your page and open the console of your browser (in Chrome use Ctrl + Shift + j) you can see an init message:

<samp>
... po.viewer v1.5 init
</samp>

## How to use it
After the install process you can start using po.viewer. There are two ways:
- create a gallery of your own style (or without any),
- create a gallery using Fomantic UI css

### **Adding class to image tag**

The simplest way is to just add <kbd>.po-thumbnail</kbd> class to your image tag. In this case the big image will be the same as the thumbnail:

```html
<img src="path/to/image.jpg" class="po-thumbnail">
```

### **Adding different image and different path**

If your thumbnails and big images are in different folders or have different names, no problem. In this case the image tag's src attribute will hold the thumbnail image's path and name and you can use <kbd>data-folder</kbd> and <kbd>data-file</kbd> attributes to insert the big image's path and name. Please note: if you use data-folder, don't use trailing slashes!

```html
<img src="path/to/thumbnail.jpg" class="po-thumbnail" data-folder="path/to" data-file="image.jpg">
```

### **Adding description text**

You can add a description to your image. It will shown in a greyed div under to the image. Just add <kbd>data-text</kbd> attribute with the text:

```html
<img src="path/to/thumbnail.jpg" class="po-thumbnail" data-folder="path/to" data-file="image.jpg" data-text="this is the text">
```

### **Styling with Fomantic UI**
You can style your thumbnails thanks to Fomantic UI. Or you can create your own css.
For example with Fomantic UI you can simply add the following classes to the thumbnail image's tag to make a chic gallery:

```html
<img src="path/to/thumbnail.jpg" class="po-thumbnail ui medium rounded image" data-folder="path/to" data-file="image.jpg" data-text="this is the text">
```

Or you can use grid to align thumbnails and replace the 'medium' with 'fluid' the make the thumbnail as big as the containing cell:

```html
<div class="ui grid">
    <div class="three wide column">
        <img src="path/to/thumbnail1.jpg" class="po-thumbnail ui fluid rounded image" data-folder="path/to" data-file="image1.jpg" data-text="this is the text">
    </div>
    <div class="three wide column">
        <img src="path/to/thumbnail2.jpg" class="po-thumbnail ui fluid rounded image" data-folder="path/to" data-file="image2.jpg" data-text="this is the text">
    </div>
</div>
```

It is up to you how to stilish your gallery. For more information please visit the site of Fomantic UI.

## Todo

I try to make it simplier, the behavior more smoother and add other options in the future. I don't think that this is the final version :)
If you have any idea or found a bug please don't hesitate and write to me.
