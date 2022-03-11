# po.viewer v2.0.0
A very simply and easy to use gallery and image viewer written in js

## Changelog
Click [here](changelog.md) to check the full changelog.

## Description
Hi. Thanks for the interest of this project and hope you will enjoy my work.
First of all, I made it as a study project. I wanted to create a simple gallery and picture viewer script what I can use in my different works. This can open the full version of the corresponding image in the same browser window just above the content. I searched accross the internet to get what I need but after a long period I decided to create my own software. This is po.viewer.

You can use it or fork it freely under the GNU v3.0 license.

## Dependencies
po.viewer needs jQuery (version 3.6.0. or above) and Fomantic UI (version 2.8 or above) to works correctly. (Fomantic UI is a fork of Semantic UI.) Their documentations could be found:
- https://jquery.com/
- https://fomantic-ui.com/

## Install
You need to include booth jQuery and Fomantic UI. The simpliest way is to include them through a CDN in the <kbd>`<head></head>`</kbd>. (You must include jQuery before anything else.) Then you can include the downloaded po.viewer files.

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<!-- Fomantic UI -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.css">
<script src="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.js"></script>
<!-- po.viewer -->
<script src="assets/js/po/po.js"></script>
<link rel="stylesheet" type="text/css" href="assets/css/po/po.css">
```

Of course you can use po.viewer through a CDN too:

```html
<script src="https://cdn.jsdelivr.net/gh/szndcs/po.viewer@v2.0.0/v2.0.0/assets/js/po.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/szndcs/po.viewer@v2.0.0/v2.0.0/assets/css/po.css">
```

And that's all. Now you can use po.viewer. If you reload your page and open the console of your browser (in Chrome use Ctrl + Shift + j) you can see an init message:

<samp>
Fri, 11 Mar 2022 12:28:14 GMT > po.viewer 2.0.0 init ...<br>
... done
</samp>

## How to use it
After the install process you can start using po.viewer. From v2.0.0 there are huge changes in the way po.viewer works. Now you don't need to add <kbd>img</kbd> tags to your html. You only need to add a <kbd>div</kbd> and a small portion of data using <kbd>poData</kbd> variable. The gallery will display where you put the <kbd>`<div class="po-gallery"></div>`</kbd> and you can manage the style of it thrugh the <kbd>poData</kbd> variable. Let's see how.

### **Inserting components into your page**
Let's say you have the following simple html with a 3 image gallery:

```html
<!DOCTYPE html>

<html>
     <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Test gallery</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <!-- jquery -->
          <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
          <!-- fomantic ui -->
          <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.css">
          <script src="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.js"></script>
          <!-- po.viewer -->
          <script src="assets/js/po.js"></script>
          <link rel="stylesheet" type="text/css" href="assets/css/po.css">
     </head>
     <body>
          <div class="po-gallery"></div>
          <script>
               var poData = {
                    thumbnailSize: 5,
                    thumbnailRounded: true,
                    thumbnailWithDescription: true,
                    centeredThumbnails: true,
                    images: [
                         {
                         thumbnail: '1.jpg',
                         image: '',
                         imageFolder: '',
                         description: 'this is image 1',
                         },
                         {
                         thumbnail: '2.jpg',
                         image: '',
                         imageFolder: '',
                         description: 'this is image 2',
                         },
                         {
                         thumbnail: '3.jpg',
                         image: '',
                         imageFolder: '',
                         description: 'this is image 3',
                         },
                    ]
               }
          </script>
     </body>
</html>
```

As you can see, we inserted the packs, the <kbd>`<div class="po-gallery"></div>`</kbd> and the <kbd>poData</kbd> between <kbd>script</kbd> tags. You can manage the po.viewer behavior with <kbd>poData</kbd>.

### `thumbnailSize: 1...6`
* You can specify the thumbnail size with a numeric value between `1` and `6`
* Can be omitted, in this case the default value will be `3`

### `thumbnailRounded: true|false`
* You can specify if the thumbnail hase rounded corners or not. If set to `true`, it will have round corners, and not if set to `false`
* Can be omitted, in this case the default value will be `false`

### `thumbnailWithDescription: true|false`
* If you want to display the description text not only under the big picture, but under the thumbnail too, then you can set this to `true`. Otherwise set it to `false`
* Can be omitted, in this case the default value will be `false`

### `centeredThumbnails: true|false`
* The gallery displays in the center of the page. But the thumbnails aligned left by default. If you set this `true` then the thumbnails will centered too.  Otherwise set it to `false`
* Can be omitted, in this case the default value will be `false`

### `images: []`
* You have to specify each images' details as an object under this array, wraped in `{}`

* ### `thumbnail: 'path/to/thumbnail.jpg'`
You can specify the thumbnail image (with path) with this. This is mandatory

* ### `image: 'image.jpg'`
If your big image is different then thumbnail, then you can specify it's name here. Can be omitted, or set it to `''`. In this case the thumbnail's data will be used.

* ### `imageFolder: 'path/to'`
If your big image is in a different folder, then you can specify it here. Can be omitted, or set it to `''`. In this case the thumbnail's data will be used.

* ### `description: 'some text'`
You can add different descriptions to each image. Can be omitted, or set it to `''`.

## Todo

I try to make it simplier, the behavior more smoother and add other options in the future. I don't think that this is the final version :)

If you have any idea or found a bug please don't hesitate and write to me.

