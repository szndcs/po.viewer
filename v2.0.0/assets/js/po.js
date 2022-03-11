/**
 * # po.viewer
 * Version: 2.0.0
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
               this.version = '2.0.0';
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
                         this.galleryImageSkeleton = '<img src="%THUMBNAIL%" class="ui %ROUNDED% fluid image po-thumbnail" data-folder="%FOLDER%" data-file="%FILE%" data-text="%DESCRIPTION%">';
                    } else {
                         this.galleryImageSkeleton = '<figure>\n<img src="%THUMBNAIL%" class="ui %ROUNDED% fluid image po-thumbnail" data-folder="%FOLDER%" data-file="%FILE%" data-text="%DESCRIPTION%">\n<figcaption>%DESCRIPTION%</figcaption>\n</figure>';
                    }
                    if (typeof poData.centeredThumbnails === 'undefined' || !poData.centeredThumbnails) {
                         this.centeredThumbnails = '';
                    } else {
                         this.centeredThumbnails = 'centered';
                    }
                    $('.po-gallery').append(`<div class="ui middle aligned ${this.centeredThumbnails} stackable grid"></div>`);
                    poData.images.forEach((image) => {
                         let galleryImage = '<div class="' + this.thumbnailSize + ' wide column">' + this.galleryImageSkeleton + '</div>';
                         galleryImage = galleryImage.replace(/%THUMBNAIL%/g, image.thumbnail);

                         if(typeof image.imageFolder !== 'undefined' && typeof image.image !== 'undefined'){
                              galleryImage = galleryImage.replace(/%FOLDER%/g, image.imageFolder);
                              galleryImage = galleryImage.replace(/%FILE%/g, image.image);
                         } else if (typeof image.imageFolder === 'undefined' && typeof image.image !== 'undefined'){
                              this.thumbnailFolder = image.thumbnail.split('/');
                              this.thumbnailFolder.pop();
                              this.thumbnailFolder = this.thumbnailFolder.join('/');
                              galleryImage = galleryImage.replace(/%FOLDER%/g, this.thumbnailFolder);
                              galleryImage = galleryImage.replace(/%FILE%/g, image.image);
                         } else {
                              galleryImage = galleryImage.replace(/%FOLDER%/g, '');
                              galleryImage = galleryImage.replace(/%FILE%/g, '');
                         }
                         galleryImage = galleryImage.replace(/%DESCRIPTION%/g, (typeof image.description === 'undefined') ? '' : image.description);
                         galleryImage = galleryImage.replace(/%ROUNDED%/g, this.thumbnailRounded);
                         $('.po-gallery .grid').append(galleryImage);
                    });
                    this.angle = 0;
                    this.poPicture = {};
                    this.poPage = {};
                    this.grabDetails();
                    this.poSkeleton = '<div class="po-frame">\n<div class="po-frame-background"></div>\n<div class="po-frame-icons"><i class="small black times circular inverted icon" id="poCloseIcon"></i><i class="small black redo alternate circular inverted icon" id="poRotateRightIcon"></i><i class="small black undo alternate circular inverted icon" id="poRotateLeftIcon"></i></div>\n<div class="po-frame-content"></div>\n</div>';
                    this.galleryImageSkeleton = '<figure class="po-fig"><img src="%FOLDER%%IMAGE%" alt="%TEXT%" class="po-picture"><figcaption>%TEXT%</figcaption></figure>';
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
                    $(document).on('click', '.po-thumbnail', (dis) => {
                         po.do('open', $(dis.target).data('folder'), $(dis.target).data('file'), $(dis.target).data('text'), $(dis.target).prop('src'));
                    });
                    $(window).keydown(function (e) {
                         if (e.which === 27) {
                              po.do();
                         };
                    });
                    console.log(' ... done');
               }
          }
          do(command = 'close', folder = '', image = '', text = '', src = '') {
               this.grabDetails();
               this.galleryImageTag = this.galleryImageSkeleton;
               this.galleryImageTag = (folder !== '') ? this.galleryImageTag.replace(/%FOLDER%/g, '' + folder + '/') : this.galleryImageTag.replace(/%FOLDER%/g, '');
               this.galleryImageTag = (image !== '') ? this.galleryImageTag.replace(/%IMAGE%/g, image) : this.galleryImageTag.replace(/%IMAGE%/g, src);
               this.galleryImageTag = this.galleryImageTag.replace(/%TEXT%/g, text);
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
                    case "open":
                         this.angle = 0;
                         $(".po-frame").css("z-index", "10000");
                         $(".po-frame-content").html(this.galleryImageTag);
                         $(".po-frame").animate({ opacity: 1 }, 700);
                         $('body>*:not(.po-frame)').addClass("po-blured");
                         break;
                    case "close":
                    default:
                         this.angle = 0;
                         $('body>*:not(.po-frame)').removeClass("po-blured");
                         $(".po-frame").animate({ opacity: 0 }, 700, function () {
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
     }
     let po = new poClass();
});
