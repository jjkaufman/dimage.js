function dimage() {
    insertCSSAnimations();

    function insertCSSAnimations() {
        var style = document.createElement('style');
        style.type = 'text/css';
        var keyFrames = '\
    @keyframes dimage-spin-right {\
        from {\
            transform: rotateY(0);\
        }\
        to {\
            transform: rotateY(360deg);\
          }\
    }\
    @keyframes dimage-spin-left {\
        from {\
            transform: rotateY(360deg);\
          }\
         to {\
            transform: rotateY(0);\
        }\
    }';
        style.innerHTML = keyFrames;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function createSide(image, size, transform, transformOrigin = null) {
        let side = document.createElement('div');
        side.style.background = "url('" + image + "') no-repeat";
        side.style.backgroundSize = "100% 100%";
        side.style.position = "absolute";
        side.style.width = size + "px";
        side.style.height = size + "px";
        side.style.transform = transform;
        if (transformOrigin !== null) {
            side.style.transformOrigin = transformOrigin;
        }
        return side;
    }

    function readParams(dimage) {
        var size = parseFloat(dimage.dataset.size);
        var spinDirection = (dimage.dataset.direction !== undefined && dimage.dataset.direction == 'left') ? 'left' : 'right';
        var speed = dimage.dataset.speed;
        var imageFront = dimage.dataset.image;
        var imageRight = dimage.dataset.image;
        var imageBack = dimage.dataset.image;
        var imageLeft = dimage.dataset.image;
        if (dimage.dataset.imageFront !== undefined) {
            imageFront = dimage.dataset.imageFront;
        } if (dimage.dataset.imageRight !== undefined) {
            imageRight = dimage.dataset.imageRight;
        } if (dimage.dataset.imageBack !== undefined) {
            imageBack = dimage.dataset.imageBack;
        } if (dimage.dataset.imageLeft !== undefined) {
            imageLeft = dimage.dataset.imageLeft;
        }
        return { size, speed, spinDirection, imageFront, imageRight, imageBack, imageLeft };
    }

    function insertDimage(dimage, sides, params) {
        let perspectiveWrapper = document.createElement('div');
        perspectiveWrapper.style.paddingLeft = params.size / 4 + "px";
        perspectiveWrapper.style.paddingTop = params.size / 10 + "px";
        perspectiveWrapper.style.perspective = params.size * 4 + "px";
        perspectiveWrapper.style.perspectiveOrigin = "50% " + (params.size / 2) + "px";

        let cube = document.createElement('div');
        cube.style.animation = "dimage-spin-" + params.spinDirection + " " + params.speed + "s infinite linear";
        cube.style.position = "relative";
        cube.style.width = params.size + "px";
        cube.style.transformStyle = "preserve-3d";

        sides.forEach(side => cube.appendChild(side));

        perspectiveWrapper.appendChild(cube);

        //resize dimage to fix the wider and taller third dimension
        dimage.style.width = params.size * 1.5 + "px";
        dimage.style.height = params.size * 1.3 + "px";
        dimage.appendChild(perspectiveWrapper);
    }

    function initDimage(dimage) {
        var params = readParams(dimage);



        let sides = [
            createSide(params.imageFront, params.size, "translateZ(" + (params.size / 2) + "px)"),
            createSide(params.imageRight, params.size, "rotateY(90deg) translateX(" + (params.size / 2) + "px)", "top right"),
            createSide(params.imageBack, params.size, "translateZ(-" + (params.size / 2) + "px) rotateY(180deg)"),
            createSide(params.imageLeft, params.size, "rotateY(270deg) translateX(-" + (params.size / 2) + "px)", "center left")
        ];

        insertDimage(dimage, sides, params);
    }

    function initDimages() {
        var dimages = document.getElementsByClassName("dimage");
        for (i = dimages.length - 1; i >= 0; i--) {
            var dimage = dimages[i];
            initDimage(dimage);
        }
    }

    return {
        initDimages
    }
}