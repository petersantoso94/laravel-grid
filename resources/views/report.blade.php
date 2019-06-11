<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel - Grid Stack</title>

        <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}" />
        <link rel="stylesheet" href="{{asset('css/bootstrap-theme.min.css')}}" />
        <link rel="stylesheet" href="{{asset('css/gridstack.css')}}" />
        <link rel="stylesheet" href="{{asset('css/geogrid.css')}}" />
        <script src="{{asset('js/jquery-3.4.1.min.js')}}"></script>
        <script src="{{asset('js/jquery-ui.min.js')}}"></script>
        <script src="{{asset('js/bootstrap.min.js')}}"></script>
        <script src="{{asset('js/gridstack.js')}}"></script>
        <script src="{{asset('js/gridstack.jQueryUI.js')}}"></script>
        <script src="{{asset('js/geogrid.js')}}"></script>
        <script src="{{asset('js/html2pdf.bundle.min.js')}}"></script>
    </head>
    <body>
        <div class="container-liquid">
            <div class="row">
                <div class="col-12 col-md-3" id="grid-tools">
                <form>
                    <div class="form-group">
                        <button type="button" class="form-control btn btn-primary widget-tools" onclick="printPDF()">export pdf</button>
                    </div>
                    <div class="form-group">
                        <label for="titleWidth">Width</label>
                        <input type="number" class="form-control" id="titleWidth" placeholder="Enter title width (grids)">
                        <small class="form-text text-muted">1 grid = 80px</small><br>
                        <label for="titleHeight">Height</label>
                        <input type="number" class="form-control" id="titleHeight" placeholder="Enter title height (grids)">
                        <small class="form-text text-muted">1 grid = 80px</small>
                        <button type="button" class="form-control btn btn-success addInput" data-type="text" data-for="title">Add Title</button>
                    </div>
                </div>
                <div class="grid-stack col-12 col-md-9" id="grid-stack-1"></div>  
            </div>
        </div>
    </body>
</html>