var printPDF = function () {
    var element = document.getElementById('grid-1');
    html2pdf(element);
}
document.addEventListener("DOMContentLoaded", function (event) {
    var $ = jQuery, paperHeight = 1000, resizeListener = null, dragMoveListener = null, postImage = null, baseUrl = window.location.origin, tableString = "", numberOfTable = 0;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    //get offset of element
    function getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }
    //post image
    $("#postImage").on("change", function () {
        var input = this, url = $(this).val(), ext = null, reader = null, fd = null;
        ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            reader = new FileReader();
            reader.onload = function (e) {
                $('#imgContent').addClass("draggable");
                $('#imgContent').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
            fd = new FormData();
            fd.append('file',input.files[0])
            postImage(fd);
        }
        else {
            $('#imgContent').attr('src', '/img/no-image.png');
        }
    })
    postImage = function (_data) {
        $.ajax({
            url: baseUrl+"/postImage",
            type: "POST",
            data: _data,
            cache : false,
            processData: false,
            contentType: false,
            success: function (data) {
            },
            error: function (data) {
                alert('Sorry.');
            }
        });
    }
    //end of post image

    //get table list data
    $.ajax({
        url: baseUrl+"/getCo2List",
        type: "GET",
        cache : false,
        processData: false,
        contentType: false,
        success: function (data) {
            if(!$.isArray(data)){console.error("Returned data is "+(typeof data)); return;}
            data.forEach(element => {
                tableString = tableString + "<option value='"+element.name+"'>"+element.name+"</option>";
            });
            $("#TableName").html(tableString);
            $("select").select2();
        },
        error: function (data) {
            alert('Sorry.');
        }
    });
    //end of table data

    //getting table content
    $("#insertTable").click(function(){
        var selectedTable = $("#TableName").val(), tableHeader = "", isHeaderNeeded = true, tableClass = "table table-bordered ", tableObj=null;
        tableString = "";
        $.ajax({
            url: baseUrl+"/getTableContent?table="+selectedTable,
            type: "GET",
            cache : false,
            processData: false,
            contentType: false,
            success: function (data) {
                if(!$.isArray(data)){console.error("Returned data is "+(typeof data)); return;}
                if(data.length == 0){alert("Empty table selected!"); return;}
                data.forEach(element => {
                    // loop through data obj
                    tableString += "<tr>";
                    if(isHeaderNeeded) tableHeader += "<thead class='thead-dark'>";
                    for (const key in element) {
                        if(isHeaderNeeded) tableHeader = tableHeader + "<td>"+key+"</td>";
                        if (element.hasOwnProperty(key)) {
                            const val = element[key];
                            tableString = tableString + "<td>"+val+"</td>";
                        }
                    }
                    tableString += "</tr>"
                    if(isHeaderNeeded) tableHeader += "</thead>";
                    isHeaderNeeded =false;
                });
                tableString = "<div class='tableContainer draggable' id='container"+numberOfTable+"'><table id='table"+numberOfTable+"' class='"+tableClass+"'>"+tableHeader + tableString+"</table></div>";
                $("#grid-1").append(tableString);
                tableObj = $("#container"+numberOfTable);
                numberOfTable++;
                $(tableObj).attr("data-cloned", "true");
                $(tableObj).attr("data-resize", "true");
                var topOffset = getOffset( document.getElementById($(tableObj).attr("id"))).top -15;
                $(tableObj).css({ "-webkit-transform": "translate(0px,-" + topOffset + "px)" });
                $(tableObj).css({ "transform": "translate(0px,-" + topOffset + "px)" });
                // $(".tableContainer").css({ "left": "0px" });
                // $(".tableContainer").css({ "top": "0px" });
                $(tableObj).attr("data-x", "0").attr("data-y", -topOffset);
            },
            error: function (data) {
                alert('Sorry.');
            }
        });
    })
    //end of getting table content

    $(".draggable").each(function (i, obj) {
        var x = $(this).position().left;
        var y = $(this).position().top;
        $(this).attr("data-initx", x)
        $(this).attr("data-inity", y)
    });
    $("#grid-1").css("height", paperHeight + "px");

    //function
    dragMoveListener = function (event) {
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
        if (resizable == "true") {
            // update the element's style
            target.style.width = event.rect.width + 'px';
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
                $(clonedElement).css({ "-webkit-transform": "translate(0px," + inity + "px)" });
                $(clonedElement).css({ "transform": "translate(0px," + inity + "px)" });
                $(clonedElement).attr("data-x", "0").attr("data-y", inity);
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
    var initiateInteract = function(){
        interact(".draggable").draggable({
        // enable inertial throwing
        inertia: false,
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
        onresizemove: resizeListener
    }).on('resizemove', resizeListener);
}
initiateInteract();


});