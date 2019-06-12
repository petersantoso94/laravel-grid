var printPDF = function () {
    var element = document.getElementById('grid-1');
    html2pdf(element);
}
document.addEventListener("DOMContentLoaded", function (event) {
    var $ = jQuery, paperHeight = 1000, resizeListener =null, dragMoveListener=null;
    $(".draggable").each(function (i, obj) {
        var x = $(this).position().left;
        var y = $(this).position().top;
        $(this).attr("data-initx", x)
        $(this).attr("data-inity", y)
    });
    $("#grid-1").css("height", paperHeight + "px");

    //function
    dragMoveListener = function(event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.setAttribute('data-inity', y);
    }
    resizeListener = function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0),
            resizable = target.getAttribute('data-resize');
        if(resizable == "true"){
            // update the element's style
            target.style.width  = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';
        
            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;
        
            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';
        
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    }

    // enable draggables to be dropped into this
    interact('.dropzone').dropzone({
        // only accept elements matching this CSS selector
        accept: '.draggable',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,
        // listen for drop related events:
        ondropactivate: function (event) {
            // add active dropzone feedback
            event.target.classList.add('drop-active');
        },
        ondragenter: function (event) {
            var draggableElement = event.relatedTarget, dropzoneElement = event.target, clonedElement = null, inity = null;
            if (!$(draggableElement).data("cloned")) {
                clonedElement = $(draggableElement).clone();
                inity = $(clonedElement).data("inity");
                $(clonedElement).attr("data-cloned", "true");
                $(clonedElement).attr("data-resize", "true");
                $(clonedElement).css({"-webkit-transform":"translate(0px,"+inity+"px)"});
                $(clonedElement).attr("data-x", "0").attr("data-y",inity);
                $(clonedElement).appendTo(dropzoneElement);

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
                draggableElement.classList.add('can-drop');
            }
        },
        ondragleave: function (event) {
            // remove the drop feedback style
            event.target.classList.remove('drop-target');
            event.relatedTarget.classList.remove('can-drop');
        },
        ondrop: function (event) {
        },
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active');
            event.target.classList.remove('drop-target');
        }
    });
    interact(".draggable").draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // call this function on every dragmove event
        onmove: dragMoveListener,
        snap: {
            targets: [
                interact.createSnapGrid({ x: 16, y: 16 })
            ]
        }
    }).resizable({
        edges: { left: false, right: true, bottom: true, top: false },
        onresizemove : resizeListener
      }).on('resizemove',resizeListener);

});