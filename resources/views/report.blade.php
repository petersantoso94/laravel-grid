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
    </head>
    <body>
    <div class="grid-stack">
        <div class="grid-stack-item"
            data-gs-x="0" data-gs-y="0"
            data-gs-width="4" data-gs-height="2" style="background: red;">
                <div class="grid-stack-item-content"></div>
        </div>
        <div class="grid-stack-item"
            data-gs-x="4" data-gs-y="0"
            data-gs-width="4" data-gs-height="4">
                <div class="grid-stack-item-content" style="background: green;"></div>
        </div>
    </div>
    </body>
</html>