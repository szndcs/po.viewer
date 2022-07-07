/**
 * # po.viewer
 * Version: 3.0.0
 * https://github.com/szndcs/po.viewer
 *
 * Copyright 2022 Contributors
 * Released under the GNU v3.0 license
 * https://choosealicense.com/licenses/gpl-3.0/
 *
 */
'use strict'

class poClass extends Function {
    constructor(poData) {
        super('...args', 'return this.__self__.__call__(...args)');
        var self = this.bind(this);
        this.__self__ = self;
        self.version = '3.0.0';
        self.poImages = [];
        self.poGalleries = [];

        if (typeof poData === 'undefined') {
            this.error('poData object is undefined.');
        } else {
            console.log(`${new Date().toUTCString()} > po.viewer ${self.version} init ...`);
            if(document.querySelectorAll('div.po-gallery').length <= 0){
                this.error('div with po-gallery class does not exist.');
            }
            if (typeof poData.galleries !== 'undefined') {
                poData.galleries.forEach((gallery, index) => {
                    gallery.thumbnailSize = (typeof gallery.thumbnailSize !== 'undefined' || !isNaN(gallery.thumbnailSize) || gallery.thumbnailSize > 5) ?
                    ['one', 'one', 'two', 'three', 'four', 'five', 'six'][gallery.thumbnailSize] :
                    'three';
                    gallery.thumbnailSize = (typeof gallery.cardMode !== 'undefined' && gallery.cardMode === true || gallery.cardMode === 'true') ?
                    'eight' :
                    gallery.thumbnailSize;
                    gallery.thumbnailRounded = (typeof gallery.thumbnailRounded !== 'undefined' && gallery.thumbnailRounded === true || gallery.thumbnailRounded === 'true') ?
                    'rounded' :
                    '';
                    gallery.galleryImageSkeleton = (typeof gallery.thumbnailWithDescription === 'undefined' || gallery.thumbnailWithDescription === false || gallery.thumbnailWithDescription === 'false') ?
                    '<img src="%THUMBNAIL%" class="ui %ROUNDED% fluid image po-thumbnail" data-gallery="%GALLERY%" data-index="%INDEX%">' :
                    '<figure>\n<img src="%THUMBNAIL%" class="ui %ROUNDED% fluid image po-thumbnail" data-gallery="%GALLERY%" data-index="%INDEX%">\n<figcaption>%DESCRIPTION%</figcaption>\n</figure>';
                    gallery.galleryImageSkeleton = (typeof gallery.cardMode !== 'undefined' && gallery.cardMode === true || gallery.cardMode === 'true') ?
                    '<div class="ui fluid card">\n<div class="image">\n<img src="%THUMBNAIL%" class="po-thumbnail" data-gallery="%GALLERY%" data-index="%INDEX%">\n</div>\n<div class="content">\n<span class="ui large text">%DESCRIPTION%</span></div>\n</div>' :
                    gallery.galleryImageSkeleton;
                    gallery.centeredThumbnails =  (typeof gallery.centeredThumbnails === 'undefined' || gallery.centeredThumbnails === false || gallery.centeredThumbnails === 'false') ?
                    '' :
                    'centered';
                    self.poGalleries[gallery.id] = [gallery];
                    if(!document.getElementById(gallery.id)){
                        this.error('div with specified id ('+gallery.id+') does not exist.');
                    }
                    $(`#${gallery.id}`).append(`<div class="ui middle aligned ${gallery.centeredThumbnails} stackable grid"></div>`);
                
                    if (typeof gallery.images !== 'undefined') {
                        gallery.images.forEach((image, index) =>{
                            let folderTag, imageTag, galleryTag;
                            if ((typeof image.imageFolder !== 'undefined' && image.imageFolder !== '') && (typeof image.image === 'undefined' || image.image === '')) {
                                folderTag = image.thumbnail.split('/');
                                imageTag = folderTag.pop();
                                folderTag = folderTag.join('/');
                            } else if ((typeof image.imageFolder !== 'undefined' && image.imageFolder !== '') && (typeof image.image !== 'undefined' || image.image !== '')) {
                                folderTag = image.imageFolder;
                                imageTag = image.image;
                            } else if ((typeof image.imageFolder === 'undefined' || image.imageFolder === '') && (typeof image.image !== 'undefined' || image.image !== '')) {
                                folderTag = image.thumbnail.split('/');
                                folderTag.pop();
                                folderTag = folderTag.join('/');
                                imageTag = image.image;
                            } else {
                                folderTag = '';
                                imageTag = '';
                            }
                            image.description = (typeof image.description === 'undefined') ? '' : image.description;
                            image.image = imageTag;
                            image.imageFolder = folderTag;
                            image.gallery = (typeof gallery.id === 'undefined') ? 'undefined' : gallery.id;
                            if (!self.poImages.hasOwnProperty(image.gallery)) {
                                self.poImages[image.gallery] = [];
                            }
                            self.poImages[image.gallery].push(image);
                        })
                    }
                })
            } else {
                this.error('Corrupt poData object.');
            }

            self.angle = 0;
            self.poPicture = {};
            self.poPage = {};
            this.grabDetails();
            self.poSkeleton = '<div class="po-frame">\n<div class="po-frame-background"></div>\n<div class="po-frame-icons"><i class="small black times circular inverted icon" id="poCloseIcon"></i><i class="small black arrow left circular inverted icon" id="poPrevIcon"></i><i class="small black arrow right circular inverted icon" id="poNextIcon"></i><i class="small black redo alternate circular inverted icon" id="poRotateRightIcon"></i><i class="small black undo alternate circular inverted icon" id="poRotateLeftIcon"></i></div>\n<div class="po-frame-content"></div>\n</div>';
            self.fullsizeImageSkeleton = '<figure class="po-fig"><img src="%FOLDER%%IMAGE%" alt="%TEXT%" class="po-picture" data-gallery="%GALLERY%" data-index="%INDEX%"><figcaption>%TEXT%</figcaption></figure>';
            self.galleryImageTag = '';
            $('body').append(self.poSkeleton);
            $('body').on('click', '#poCloseIcon, .po-picture', () => {
                po.close();
            });
            $('#poRotateRightIcon').on('click', () => {
                po.rotateR();
            });
            $('#poRotateLeftIcon').on('click', () => {
                po.rotateL();
            });
            $('#poPrevIcon').on('click', () => {
                po.previous();
            });
            $('#poNextIcon').on('click', () => {
                po.next();
            });
            $(document).on('click', '.po-thumbnail', (dis) => {
                po.open($(dis.target).data('gallery'), $(dis.target).data('index'));
            });
            $(window).keydown(function (e) {
                if (e.which === 27) {
                    po.close();
                };
            });
            console.log(' ... init done');
            return self;
        }
    }
    create() {
        for (const [gallery, images] of Object.entries(this.poImages)) {
            images.forEach((image, index) => {
                let gallery = (typeof image.gallery !== 'undefined' && $('#' + image.gallery).length) ? image.gallery : false;
                let galleryDetails;

                if (gallery === false) {
                    galleryDetails = this.poGalleries[0];
                } else {
                    galleryDetails = (this.poGalleries.hasOwnProperty(image.gallery)) ? this.poGalleries[image.gallery][0] : this.poGalleries[0];
                }
                let galleryImage = '<div class="' + galleryDetails.thumbnailSize + ' wide column">' + galleryDetails.galleryImageSkeleton + '</div>';
                galleryImage = galleryImage.replace(/%THUMBNAIL%/g, image.thumbnail);
                galleryImage = galleryImage.replace(/%INDEX%/g, index);
                galleryImage = galleryImage.replace(/%FOLDER%/g, image.imageFolder);
                galleryImage = galleryImage.replace(/%FILE%/g, image.image);
                galleryImage = galleryImage.replace(/%GALLERY%/g, image.gallery);
                galleryImage = galleryImage.replace(/%ROUNDED%/g, galleryDetails.thumbnailRounded);
                galleryImage = galleryImage.replace(/%DESCRIPTION%/g, image.description);

                if (gallery !== false) {
                    $('#' + gallery + ' .grid').append(galleryImage);
                } else {
                    $('.po-gallery:first .grid').append(galleryImage);
                }
            });
        }
    }
    open(gallery = 'undefined', index = 0) {
        this.grabDetails();
        this.angle = 0;
        let galleryImageTag = this.fullsizeImageSkeleton;
        galleryImageTag = galleryImageTag.replace(/%FOLDER%/g, '' + this.poImages[gallery][index].imageFolder + '/');
        galleryImageTag = galleryImageTag.replace(/%IMAGE%/g, this.poImages[gallery][index].image);
        galleryImageTag = galleryImageTag.replace(/%TEXT%/g, this.poImages[gallery][index].description);
        galleryImageTag = galleryImageTag.replace(/%INDEX%/g, index);
        galleryImageTag = galleryImageTag.replace(/%GALLERY%/g, gallery);
        $(".po-frame").css("z-index", "10000");
        $(".po-frame-content").css('opacity', 0);
        $(".po-frame-content").html(galleryImageTag);
        $(".po-frame-content").animate({ opacity: 1 }, 200);
        $(".po-frame").animate({ opacity: 1 }, 600);
        $('body>*:not(.po-frame)').addClass("po-blured");
    }
    rotateL() {
        this.grabDetails();
        this.angle -= 90;
        $('.po-fig').css('transform', 'rotate(' + this.angle + 'deg)');
        this.resizer(this.poPage, this.poPicture);
    }
    rotateR() {
        this.grabDetails();
        this.angle += 90;
        $('.po-fig').css('transform', 'rotate(' + this.angle + 'deg)');
        this.resizer(this.poPage, this.poPicture);
    }
    previous() {
        if ($('.po-picture').data('index') <= 0) {
            po.open($('.po-picture').data('gallery'), this.poImages[$('.po-picture').data('gallery')].length - 1);
        } else {
            po.open($('.po-picture').data('gallery'), $('.po-picture').data('index') - 1);
        }
    }
    next() {
        if ($('.po-picture').data('index') >= this.poImages[$('.po-picture').data('gallery')].length - 1) {
            po.open($('.po-picture').data('gallery'), 0);
        } else {
            po.open($('.po-picture').data('gallery'), $('.po-picture').data('index') + 1);
        }
    }
    close() {
        this.angle = 0;
        $('body>*:not(.po-frame)').removeClass("po-blured");
        $(".po-frame").animate({ opacity: 0 }, 600, function () {
            $(".po-frame").css("z-index", "-1000");
        });
    }
    info() {
        this.grabDetails();
        console.log(`po.viewer`);
        console.log(`> version: ${this.version}`);
        console.log((this.pageRatio < 1) ? '> landscape mode' : '> portrait mode');
        console.log(`> actual viewport width: ${this.poPage.width}`);
        console.log(`> actual viewport height: ${this.poPage.height}`);
        console.log(`> opened image width: ${this.poPicture.width}`);
        console.log(`> opened image height: ${this.poPicture.height}`);
        console.log(`> rotation: ${this.angle}`);
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
    clear() {
        $('.po-gallery').empty();
        $('.po-gallery').append(`<div class="ui middle aligned ${this.centeredThumbnails} stackable grid"></div>`);
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
    error(errorText = 'Unknown error happend.') {
        this.clear();
        console.error(errorText);
        console.log(' >> Please check the documentation at https://github.com/szndcs/po.viewer');
        throw new Error('po.viewer CANNOT START');
    }
}
