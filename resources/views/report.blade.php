<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title>Laravel - Grid Stack</title>

        <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}" />
        <link rel="stylesheet" href="{{asset('css/bootstrap-theme.min.css')}}" />
        <link rel="stylesheet" href="{{asset('css/select2.min.css')}}" />
        <link rel="stylesheet" href="{{asset('css/geogrid.css')}}" />
        <script src="{{asset('js/jquery-3.4.1.min.js')}}"></script>
        <script src="{{asset('js/jquery-ui.min.js')}}"></script>
        <script src="{{asset('js/bootstrap.min.js')}}"></script>
        <script src="{{asset('js/select2.min.js')}}"></script>
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
                        <button type="button" class="form-control btn btn-primary widget-tools" onclick="printPDF()">Export PDF</button>
                    </div>
                    <div class="form-group">
                        <label for="title">Title</label>
                        <div>
                            <textarea type="text" class="form-control draggable" data-cloned="false" data-resize="false" id="titleText" placeholder="Enter title"></textarea>
                        </div>
                        <br>
                    </div>
                    <div class="form-group">
                        <label for="title">Table List</label>
                        <select name="tableName" id="TableName" class="custom-select form-control">
                            <option selected>Choose one table from db</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary widget-tools" id="insertTable">Insert</button>
                    </div>
                    <div class="form-group">
                        <label for="title">Image</label>
                        <form method="post" id="img_form" enctype="multipart/form-data">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="postImage" name="image" multiple="multiple" accept="image/*">
                            </div>
                        </form>
                    </div>
                    <div class="form-group">
                        <div>
                            <img class="img-responsive" id="imgContent"  data-cloned="false" data-resize="false" src="{{asset('/img/no-image.png')}}" >
                        </div>
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