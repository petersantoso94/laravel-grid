var printPDF = function() { 
    var element = document.getElementById('grid-stack-1');
    html2pdf(element);
}
document.addEventListener("DOMContentLoaded", function(event) { 
    var $ = jQuery, gridObjArr= [], grid = null , serializedData  = null, addGrid = null, loadGrid = null,items = null, options = null, textAreaAuto =null, gridHeight = 50, gridWidth = gridHeight*1.5;
    $("#gridWidthPx").html(gridWidth);
    $("#gridHeightPx").html(gridHeight);
    options = {
        cellHeight: gridHeight,
        verticalMargin: 10,
        minWidth: 768,
        animate: true
    };

    $('.grid-stack').gridstack(options);

    serializedData = [
        {x: 0, y: 0, width: 4, height: 2},
        {x: 3, y: 1, width: 4, height: 2},
        {x: 4, y: 1, width: 4, height: 1},
        {x: 2, y: 3, width: 8, height: 1},
        {x: 0, y: 4, width: 4, height: 1},
        {x: 0, y: 3, width: 4, height: 1},
        {x: 2, y: 4, width: 4, height: 1},
        {x: 2, y: 5, width: 4, height: 1},
        {x: 0, y: 6, width: 12, height: 3}
    ];
    grid = $('.grid-stack').data('gridstack');
    loadGrid = function () {
        grid.removeAll();
        items = GridStackUI.Utils.sort(serializedData);
        items.forEach(function (node, i) {
            grid.addWidget($('<div><div class="grid-stack-item grid-stack-item-content"><div class="handleMove"></div><img class="img-responsive height-100" src="img/cat-'+((i%3)+1)+'.jpg"></div></div>'),
                node.x, node.y, node.width, node.height);
        });
        return false;
    }
    loadGrid()

    // add new grid item
    addGrid = function (gridObj){
        grid.addWidget($('<div><div class="grid-stack-item grid-stack-item-content" data-gg-id="'+gridObj.id+'"><div class="handleMove"></div>'+gridObj.input+'</div></div>'),
        gridObj.x, gridObj.y, gridObj.width, gridObj.height);
    }
    $(".addTitle").click(function(){
        var grObj = null, index = gridObjArr.length, titleText = $("#titleText").val(), objWidth = ($("#gridWidth").val()||4),objHeight = ($("#gridHeight").val()||2);
        grObj = {
            width: objWidth ,
            height :objHeight,
            x: 0,
            y:0,
            input:"<textarea class='txtArea'>"+titleText+"</textarea>",
            id:index
        }
        gridObjArr.push(grObj)
        addGrid(grObj);
    })

    //detect the on change event
    var serializeWidgetMap = function(items) {
        var selected_obj = gridObjArr[$(items).data("id")];
        console.log(selected_obj);
    };
    
    $('.grid-stack').on('change', function(event, items) {
        serializeWidgetMap(items);
    });

    $('.grid-stack-item').on('gsresizestop', function(event, elem) {
        var newHeight = $(elem).attr('data-gs-height') * gridHeight;
        console.log(newHeight)
    });
    
  });