#  po.viewer v3.0.0

##  _A very simply and easy to use gallery and image viewer written in js_

  

###  Changelog

Click [here](changelog.md) to check the full changelog.

  

###  Description

Hi. Thanks for your interest of this project and hope you will enjoy po.viewer.

I made this as a study project, and I found joy making it more complex and feature-rich over time to time. I wanted to create a simple gallery and picture viewer script what I can use in my different works. This can open the full version of the corresponding image in the same browser window just above the content. I searched accross the internet to get what I need but after a long period I decided to create my own software. This is po.viewer now.

  

###  License

You can use it or fork it freely under the GNU v3.0 license.

**Free Software, Yeah!**

  

###  Dependencies

po.viewer needs jQuery (version 3.6.0. or above) and Fomantic UI (version 2.8 or above) to works correctly. (Fomantic UI is a fork of Semantic UI.) Their documentations could be found:

-  https://jquery.com/

-  https://fomantic-ui.com/

  

###  Install

You need to include booth jQuery and Fomantic UI. The simpliest way is to include them through a CDN in the <kbd>`<head></head>`</kbd>. (Keep in mind, you must include jQuery before anything else.) Then you can include the downloaded po.viewer files. (Or load css in the head and js files at the end of html file.)

  

```html

<!-- jQuery -->

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>

<!-- Fomantic UI -->

<link rel="stylesheet"  type="text/css"  href="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.css">

<script src="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.js"></script>

<!-- po.viewer -->

<script src="assets/js/po/po.js"></script>

<link rel="stylesheet"  type="text/css"  href="assets/css/po/po.css">

```

  

NOW you can use the minified version of the js:

```html

<script src="assets/js/po/po.min.js"></script>

```

  

Of course you can use po.viewer through jsDelivr CDN too:

  

```html

<!-- po.viewer -->

<script src="https://cdn.jsdelivr.net/gh/szndcs/po.viewer@main/v3.0.0/assets/js/po.js"></script>

<link rel="stylesheet"  type="text/css"  href="https://cdn.jsdelivr.net/gh/szndcs/po.viewer@main/v3.0.0/assets/css/po.css">

```

  

OR:

```html

<!-- po.viewer -->

<script src="https://cdn.jsdelivr.net/gh/szndcs/po.viewer@main/v3.0.0/assets/js/po.min.js"></script>

<link rel="stylesheet"  type="text/css"  href="https://cdn.jsdelivr.net/gh/szndcs/po.viewer@main/v3.0.0/assets/css/po.css">

```

  

And that's all. Now you can use po.viewer. If you reload your page and open the console of your browser (in Chrome use Ctrl + Shift + j) you can see an init message:

  

```sh

Thu, 07 Jul 2022 12:12:12 GMT > po.viewer 3.0.0 init ...

... done

```

  

###  How to use it

After the install process you can start using po.viewer. From v3.0.0 there are huge changes in the way po.viewer works. Now you don't need to add <kbd>img</kbd> tags to your html. You only need to add a <kbd>div</kbd> and a small portion of data using <kbd>poData</kbd> variable. The gallery will display where you put the <kbd>`<div class="po-gallery"></div>`</kbd> and you can manage the style of it thrugh the <kbd>poData</kbd> variable. Let's see how.

  

###  **Inserting components into your page**

Let's say you have the following simple html with a 2 image galleries, 3 images in each:

  

```html

<!DOCTYPE html>

  

<html>

<head>

<meta charset="utf-8">

<meta http-equiv="X-UA-Compatible"  content="IE=edge">

<title>Test gallery</title>

<meta name="description"  content="">

<meta name="viewport"  content="width=device-width, initial-scale=1">

<!-- jquery -->

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>

<!-- fomantic ui -->

<link rel="stylesheet"  type="text/css"  href="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.css">

<script src="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.8/dist/semantic.min.js"></script>

<!-- po.viewer -->

<script src="assets/js/po.js"></script>

<link rel="stylesheet"  type="text/css"  href="assets/css/po.css">

</head>

<body>

<div class="po-gallery"  id="first"></div>

<div class="po-gallery"  id="second"></div>

<script>

let  po  =  new  poClass(

{

galleries:  [

{

id:  'first',

thumbnailSize:  4,

thumbnailRounded:  false,

thumbnailWithDescription:  false,

centeredThumbnails:  true,

cardMode:  false,

images:  [

{

thumbnail:  '1.jpg',

image:  '',

imageFolder:  '',

description:  'this is image 1 in gallery first',

},

{

thumbnail:  '2.jpg',

image:  '',

imageFolder:  '',

description:  'this is image 2 in gallery first',

},

{

thumbnail:  '3.jpg',

image:  '',

imageFolder:  '',

description:  'this is image 3 in gallery first',

},

]

},

{

id:  'second',

thumbnailSize:  4,

thumbnailRounded:  true,

thumbnailWithDescription:  true,

centeredThumbnails:  true,

cardMode:  true,

images:  [

{

thumbnail:  '4.jpg',

image:  '',

imageFolder:  '',

description:  'this is image 4 in gallery second',

},

{

thumbnail:  '5.jpg',

image:  '',

imageFolder:  '',

description:  'this is image 5 in gallery second',

},

{

thumbnail:  '6.jpg',

image:  '',

imageFolder:  '',

description:  'this is image 6 in gallery second',

},

]

}

]

});

po.create();

</script>

</body>

</html>

```

As you can see, we inserted the packs, the <kbd>`<div class="po-gallery" id="x"></div>`</kbd> and the <kbd>poClass</kbd> with data between <kbd>script</kbd> tags, plus we started the gallery with the <kbd>po.create();</kbd> command. You can manage the po.viewer behavior with <kbd>poClass</kbd>.

####  `galleries: []`
Your object must contain at least one gallery object which have the correct id of the gallery div, the settings and the images array:

*  #####  `id: 'id-of-div'`
	The id of the container div

*  #####  `thumbnailSize: 1...6`
	You can specify the thumbnail size with a numeric value between `1` and `6`
	Can be omitted, in this case the default value will be `3`

*  #####  `thumbnailRounded: true|false`
	You can specify if the thumbnail hase rounded corners or not. If set to `true`, it will have round corners, and not if set to `false`
	Can be omitted, in this case the default value will be `false`

*  #####  `thumbnailWithDescription: true|false`
	If you want to display the description text not only under the big picture, but under the thumbnail too, then you can set this to `true`. Otherwise set it to `false`
	Can be omitted, in this case the default value will be `false`

*  #####  `centeredThumbnails: true|false`
	The gallery displays in the center of the page. But the thumbnails aligned left by default. If you set this `true` then the thumbnails will centered too. Otherwise set it to `false`
Can be omitted, in this case the default value will be `false`  

*  #####  `cardMode: true|false`
	If you set true, now you can use cardMode, which is a huge version of thumbnail and big textbox under it with the description text. If a gallery is in cardMode, the po.viewer will not ouse the other options (except the id)

	#####  `images: []`
	You have to specify each images' details as an object under this array  

	*  #####  `thumbnail: 'path/to/thumbnail.jpg'`
		You can specify the thumbnail image (with path) with this. This is mandatory

	*  #####  `image: 'image.jpg'`

		If your big image is different then thumbnail, then you can specify it's name here. Can be omitted, or set it to `''`. In this case the thumbnail's data will be used

	*  #####  `imageFolder: 'path/to'`
		If your big image is in a different folder, then you can specify it here. Can be omitted, or set it to `''`. In this case the thumbnail's data will be used  

	*  #####  `description: 'some text'`
		You can add different descriptions to each image. Can be omitted, or set it to `''`  

###  Todo
I try to make it simplier, the behavior more smoother and add other options on frontend in the future. I don't think that this is the final version :)
If you have any idea or found a bug please don't hesitate and write me.