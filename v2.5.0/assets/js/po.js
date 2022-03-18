/**
 * # po.viewer
 * Version: 2.5.0
 * https://github.com/szndcs/po.viewer
 *
 * Copyright 2022 Contributors
 * Released under the GNU v3.0 license
 * https://choosealicense.com/licenses/gpl-3.0/
 *
 */

$(() => {
     class poClass {
          constructor() {
               this.version = '2.5.0';
               if (typeof poData === 'undefined') {
                    $('body').append('<div style="width: 100%; text-align: center; color: grey; font-size: 18px; padding: 10px 0;">po.viewer: I cannot found my variable :-(</div>');
                    console.error('poData object variable is undefined.');
                    console.log(`... po.viewer ${this.version} cannot start`);
                    console.log('Please check the documentation at https://github.com/szndcs/po.viewer');
               } else {
                    console.log(`${new Date().toUTCString()} > po.viewer ${this.version} init ...`);
                    if (typeof poData.thumbnailSize !== 'undefined' || !isNaN(poData.thumbnailSize) || poData.thumbnailSize > 5) {
                         this.thumbnailSize = ['one', 'one', 'two', 'three', 'four', 'five', 'six'][poData.thumbnailSize];
                    } else {
                         this.thumbnailSize = 'three';
                    }
                    if (typeof poData.thumbnailRounded !== 'undefined') {
                         this.thumbnailRounded = (poData.thumbnailRounded) ? 'rounded' : '';
                    } else {
                         this.thumbnailRounded = '';
                    }
                    if (typeof poData.thumbnailWithDescription === 'undefined' || !poData.thumbnailWithDescription) {
                         this.galleryImageSkeleton = '<img src="%THUMBNAIL%" class="ui %ROUNDED% fluid image po-thumbnail" data-folder="%FOLDER%" data-file="%FILE%" data-text="%DESCRIPTION%" data-number="%NUMBER%">';
                    } else {
                         this.galleryImageSkeleton = '<figure>\n<img src="%THUMBNAIL%" class="ui %ROUNDED% fluid image po-thumbnail" data-folder="%FOLDER%" data-file="%FILE%" data-text="%DESCRIPTION%" data-number="%NUMBER%">\n<figcaption>%DESCRIPTION%</figcaption>\n</figure>';
                    }
                    if (typeof poData.centeredThumbnails === 'undefined' || !poData.centeredThumbnails) {
                         this.centeredThumbnails = '';
                    } else {
                         this.centeredThumbnails = 'centered';
                    }
                    $('.po-gallery').append(`<div class="ui middle aligned ${this.centeredThumbnails} stackable grid"></div>`);
                    poData.images.forEach((image, index) => {
                         this.generator(image, index, 'thumbnail');
                    });
                    this.angle = 0;
                    this.poPicture = {};
                    this.poPage = {};
                    this.grabDetails();
                    this.poSkeleton = '<div class="po-frame">\n<div class="po-frame-background"></div>\n<div class="po-frame-icons"><i class="small black times circular inverted icon" id="poCloseIcon"></i><i class="small black arrow left circular inverted icon" id="poPrevIcon"></i><i class="small black arrow right circular inverted icon" id="poNextIcon"></i><i class="small black redo alternate circular inverted icon" id="poRotateRightIcon"></i><i class="small black undo alternate circular inverted icon" id="poRotateLeftIcon"></i></div>\n<div class="po-frame-content"></div>\n</div>';
                    this.galleryImageSkeleton = '<figure class="po-fig"><img src="%FOLDER%%IMAGE%" alt="%TEXT%" class="po-picture" data-number="%NUMBER%"><figcaption>%TEXT%</figcaption></figure>';
                    this.galleryImageTag = '';
                    $('body').append(this.poSkeleton);
                    $('body').on('click', '#poCloseIcon, .po-picture', () => {
                         po.do();
                    });
                    $('#poRotateRightIcon').on('click', () => {
                         po.do('rotate-r');
                    });
                    $('#poRotateLeftIcon').on('click', () => {
                         po.do('rotate-l');
                    });
                    $('#poPrevIcon').on('click', () => {
                         po.do('previous');
                    });
                    $('#poNextIcon').on('click', () => {
                         po.do('next');
                    });
                    $(document).on('click', '.po-thumbnail', (dis) => {
                         po.do('open', $(dis.target).data('folder'), $(dis.target).data('file'), $(dis.target).data('text'), $(dis.target).prop('src'), $(dis.target).data('number'));
                    });
                    $(window).keydown(function (e) {
                         if (e.which === 27) {
                              po.do();
                         };
                    });
                    console.log(' ... done');
               }
          }
          do(command = 'close', folder = '', image = '', text = '', src = '', number = -1) {
               this.grabDetails();
               switch (command) {
                    case 'info':
                         console.log(`po.viewer v${this.version}`);
                         console.log((pageRatio < 1) ? '> landscape mode' : '> portrait mode');
                         console.log(`> actual viewport width: ${this.pageWidth}`);
                         console.log(`> actual viewport height: ${this.pageHeight}`);
                         console.log(`> opened image width: ${this.pictureWidth}`);
                         console.log(`> opened image height: ${this.pictureHeight}`);
                         console.log(`> rotation: ${this.angle}`);
                         break;
                    case 'rotate-l':
                         this.angle -= 90;
                         $('.po-fig').css('transform', 'rotate(' + this.angle + 'deg)');
                         this.resizer(this.poPage, this.poPicture);
                         break;
                    case 'rotate-r':
                         this.angle += 90;
                         $('.po-fig').css('transform', 'rotate(' + this.angle + 'deg)');
                         this.resizer(this.poPage, this.poPicture);
                         break;
                    case 'previous':
                         if($('.po-picture').data('number') <= 0){
                              this.generator(poData.images[poData.images.length -1], poData.images.length -1, 'image');
                         } else {
                              this.generator(poData.images[$('.po-picture').data('number') -1], $('.po-picture').data('number') -1, 'image');
                         }
                         break;
                    case 'next':
                         if($('.po-picture').data('number') >= poData.images.length -1){
                              this.generator(poData.images[0], 0, 'image');
                         } else {
                              this.generator(poData.images[$('.po-picture').data('number') +1], $('.po-picture').data('number') +1, 'image');
                         }
                         break;
                    case "open":
                         this.angle = 0;
                         this.galleryImageTag = this.galleryImageSkeleton;
                         this.galleryImageTag = (folder !== '') ? this.galleryImageTag.replace(/%FOLDER%/g, '' + folder + '/') : this.galleryImageTag.replace(/%FOLDER%/g, '');
                         this.galleryImageTag = (image !== '') ? this.galleryImageTag.replace(/%IMAGE%/g, image) : this.galleryImageTag.replace(/%IMAGE%/g, src);
                         this.galleryImageTag = this.galleryImageTag.replace(/%TEXT%/g, text);
                         this.galleryImageTag = this.galleryImageTag.replace(/%NUMBER%/g, number);
                         $(".po-frame").css("z-index", "10000");
                         $(".po-frame-content").css('opacity', 0);
                         $(".po-frame-content").html(this.galleryImageTag);
                         $(".po-frame-content").animate({ opacity: 1 }, 200);
                         $(".po-frame").animate({ opacity: 1 }, 600);
                         $('body>*:not(.po-frame)').addClass("po-blured");
                         break;
                    case "close":
                    default:
                         this.angle = 0;
                         $('body>*:not(.po-frame)').removeClass("po-blured");
                         $(".po-frame").animate({ opacity: 0 }, 600, function() {
                              $(".po-frame").css("z-index", "-1000");
                         });
                         break;
               }
          }
          resizer(poPage, poPicture) {
               switch (poPage.ratio < 1) {
                    case true:
                    default:
                         //landscape
                         if (!$('.po-picture').data('rotated')) {
                              $('.po-picture').css('width', poPage.height * .90);
                              $('.po-picture').css('height', (poPage.height * .90) * poPicture.ratio);
                              $('.po-picture').data('rotated', true);
                         } else {
                              $('.po-picture').css('height', poPage.height * .90);
                              $('.po-picture').css('width', (poPage.height * .90) / poPicture.ratio);
                              $('.po-picture').data('rotated', false);
                         }
                         break;
                    case false:
                         //portrait
                         if (!$('.po-picture').data('rotated')) {
                              $('.po-picture').css('height', poPage.width * .90);
                              $('.po-picture').css('width', (poPage.width * .90) / poPicture.ratio);
                              $('.po-picture').data('rotated', true);
                         } else {
                              $('.po-picture').css('width', poPage.width * .90);
                              $('.po-picture').css('height', (poPage.width * .90) * poPicture.ratio);
                              $('.po-picture').data('rotated', false);
                         }
                         break;
               }
          }
          grabDetails() {
               this.poPicture = {
                    height: $('.po-picture').height(),
                    width: $('.po-picture').width(),
                    ratio: $('.po-picture').height() / $('.po-picture').width()
               };
               this.poPage = {
                    height: $(window).height(),
                    width: $(window).width(),
                    ratio: $(window).height() / $(window).width()
               };
          }
          generator(image = [], index = -1, command = '') {
               let folderTag;
               let imageTag;
               let thumbnailTag = image.thumbnail;
               let numberTag = index;
               let descriptionTag = (typeof image.description === 'undefined') ? '' : image.description;
               let roundedTag = this.thumbnailRounded;

               if ((typeof image.imageFolder !== 'undefined' && image.imageFolder !== '') && (typeof image.image === 'undefined' || image.image === '')){
                    folderTag = image.thumbnail.split('/');
                    imageTag = folderTag.pop();
                    folderTag = folderTag.join('/');
               } else if((typeof image.imageFolder !== 'undefined' && image.imageFolder !== '') && (typeof image.image !== 'undefined' || image.image !== '')){
                    folderTag = image.imageFolder;
                    imageTag = image.image;
               } else if ((typeof image.imageFolder === 'undefined' || image.imageFolder === '') && (typeof image.image !== 'undefined' || image.image !== '')){
                    folderTag = image.thumbnail.split('/');
                    folderTag.pop();
                    folderTag = folderTag.join('/');
                    imageTag = image.image;
               } else {
                    folderTag = '';
                    imageTag = '';
               }

               switch(command) {
                    case 'thumbnail':
                    default:
                         let galleryImage = '<div class="' + this.thumbnailSize + ' wide column">' + this.galleryImageSkeleton + '</div>';
                         galleryImage = galleryImage.replace(/%THUMBNAIL%/g, thumbnailTag);
                         galleryImage = galleryImage.replace(/%NUMBER%/g, numberTag);
                         galleryImage = galleryImage.replace(/%FOLDER%/g, folderTag);
                         galleryImage = galleryImage.replace(/%FILE%/g, imageTag);
                         galleryImage = galleryImage.replace(/%ROUNDED%/g, roundedTag);
                         galleryImage = galleryImage.replace(/%DESCRIPTION%/g, descriptionTag);
                         $('.po-gallery .grid').append(galleryImage);
                         break;
                    case 'image':
                         po.do('open', folderTag, imageTag, descriptionTag, thumbnailTag, numberTag);
                         break;
               }
          }
     }
     let po = new poClass();
});
