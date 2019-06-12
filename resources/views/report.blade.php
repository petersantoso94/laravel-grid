<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel - Grid Stack</title>

        <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}" />
        <link rel="stylesheet" href="{{asset('css/bootstrap-theme.min.css')}}" />
        <link rel="stylesheet" href="{{asset('css/geogrid.css')}}" />
        <script src="{{asset('js/jquery-3.4.1.min.js')}}"></script>
        <script src="{{asset('js/jquery-ui.min.js')}}"></script>
        <script src="{{asset('js/bootstrap.min.js')}}"></script>
        <script src="https://unpkg.com/interactjs@latest/dist/interact.js"></script>
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
                        <label for="title">Title</label>
                        <div>
                        <textarea type="text" class="form-control draggable" data-cloned="false" data-resize="false" id="titleText" placeholder="Enter title"></textarea>
                        </div>
                        <br>
                    </div>
                </div>
                <div class="col-12 col-md-9">
                    <div id="grid-1" class="rounded dropzone">
                        
                    </div>  
                </div>
            </div>
        </div>
    </body>
</html>