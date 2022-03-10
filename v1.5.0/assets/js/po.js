/**
 * # po.viewer
 * Version: 1.5.0
 * https://github.com/szndcs/po.viewer
 *
 * Copyright 2022 Contributors
 * Released under the GNU v3.0 license
 * https://choosealicense.com/licenses/gpl-3.0/
 *
 */

$(function(){
    class poClass {
        constructor() {
            this.version = '1.5';
            this.angle = 0;
            this.poPicture = {};
            this.poPage = {};
            this.grabDetails();
            this.poSkeleton = "<div class='po-frame'>\n<div class='po-frame-background'></div>\n<div class='po-frame-icons'><i class='small black times circular inverted icon' id='poCloseIcon'></i><i class='small black redo alternate circular inverted icon' id='poRotateRightIcon'></i><i class='small black undo alternate circular inverted icon' id='poRotateLeftIcon'></i></div>\n<div class='po-frame-content'></div>\n</div>";
            this.galleryImageSkeleton = "<figure class='po-fig'><img src='%FOLDER%%IMAGE%' alt='%TEXT%' class='po-picture'><figcaption>%TEXT%</figcaption></figure>";
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
            $(document).on('click', '.po-thumbnail', (dis)=>{
                po.do('open', $(dis.target).data('folder'), $(dis.target).data('file'), $(dis.target).data('text'), $(dis.target).prop('src'));
            });
            $(window).keydown(function (e) {
                if (e.which === 27) {
                    po.do();
                };
            });
            console.log('... po.viewer ' + this.version + ' init');
        }
        do(command = 'close', folder = '', image = '', text = '', src = '') {
            this.grabDetails();
            this.galleryImageTag = this.galleryImageSkeleton;
            this.galleryImageTag = (folder !== '') ? this.galleryImageTag.replace(/%FOLDER%/g, '/'+folder+'/') : this.galleryImageTag.replace(/%FOLDER%/g, '');
            this.galleryImageTag = (image !== '') ? this.galleryImageTag.replace(/%IMAGE%/g, image) : this.galleryImageTag.replace(/%IMAGE%/g, src);
            this.galleryImageTag = this.galleryImageTag.replace(/%TEXT%/g, text);
            switch (command) {
                case 'info':
                    console.log('po.viewer v'+this.version);
                    console.log((pageRatio < 1) ? '> landscape mode' : '> portrait mode');
                    console.log('> actual viewport width: ' + this.pageWidth);
                    console.log('> actual viewport height: ' + this.pageHeight);
                    console.log('> opened image width: ' + this.pictureWidth);
                    console.log('> opened image height: ' + this.pictureHeight);
                    console.log('> rotation: ' + this.angle);
                    break;
                case 'rotate-l':
                    this.angle -= 90;
                    $('.po-fig').css('transform', 'rotate(' + this.angle + 'deg)');
                    this.resizer(this.poPage, this.poPicture)
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
                    if(!$('.po-picture').data('rotated')){
                        $('.po-picture').css('width', poPage.height * .90 );
                        $('.po-picture').css('height', (poPage.height * .90) * poPicture.ratio);
                        $('.po-picture').data('rotated', true);
                    } else {
                        $('.po-picture').css('height', poPage.height * .90 );
                        $('.po-picture').css('width', (poPage.height * .90) / poPicture.ratio);
                        $('.po-picture').data('rotated', false);
                    }
                    break;
                case false:
                    //portrait
                    if(!$('.po-picture').data('rotated')){
                        $('.po-picture').css('height', poPage.width * .90 );
                        $('.po-picture').css('width', (poPage.width * .90) / poPicture.ratio);
                        $('.po-picture').data('rotated', true);
                    } else {
                        $('.po-picture').css('width', poPage.width * .90 );
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
