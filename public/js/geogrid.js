var printPDF = function() { 
    var element = document.getElementById('grid-stack-1');
    html2pdf(element);
}

document.addEventListener("DOMContentLoaded", function(event) { 
    var $ = jQuery, grid = null , serializedData  = null, addGrid = null, loadGrid = null,items = null, options = null;
    
    options = {
        cellHeight: 100,
        verticalMargin: 10
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
            grid.addWidget($('<div><div class="grid-stack-item grid-stack-item-content"><img class="img-responsive height-100" src="img/cat-'+((i%3)+1)+'.jpg"></div></div>'),
                node.x, node.y, node.width, node.height);
        });
        return false;
    }
    loadGrid()

    // add new grid item
    addGrid = function (gridObj){
        grid.addWidget($('<div><div class="grid-stack-item grid-stack-item-content">'+gridObj.input+'</div>'),
        gridObj.x, gridObj.y, gridObj.width, gridObj.height);
    }
    $(".addInput").click(function(){
        var inputType = $(this).data("type"),inputFor = $(this).data("for"), grObj = null;
        grObj = {
            width: $("#"+inputFor+"Width").val() || 4,
            height : $("#"+inputFor+"Height").val() || 1,
            x: 0,
            y:0,
            input:"<input type="+inputType+" class='form-control'>"
        }
        addGrid(grObj);
    })

    //detect the on change event
    var serializeWidgetMap = function(items) {
        console.log(items);
    };
    
    $('.grid-stack').on('change', function(event, items) {
        serializeWidgetMap(items);
    });
    
  });