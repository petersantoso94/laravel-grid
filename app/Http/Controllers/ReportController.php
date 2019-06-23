<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use DB;
  
class ReportController extends Controller
{  
    public function imageUploadPost(Request $request){
        if ($request->isMethod('get')){return json_encode('{"isSuccess":"false", "message","unSupported Method"}');}
        $validator = Validator::make($request->all(),
            [
                'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            ]
        );
        if ($validator->fails())
            return array(
            'fail' => true,
            'errors' => $validator->errors()
        );
        $extension = $request->file('file')->getClientOriginalExtension();
        $dir = 'uploads/';
        $filename = uniqid() . '_' . time() . '.' . $extension;
        $request->file('file')->move($dir, $filename);
        return $filename;
    }

    public function getCo2List(Request $request){
        if ($request->isMethod('post')){return json_encode('{"isSuccess":"false", "message","unSupported Method"}');}
        $sql = 'SELECT TABLE_NAME as "name" FROM INFORMATION_SCHEMA.TABLES;';
        $tableList = DB::connection('c02')->select(DB::raw($sql));
        
        return $tableList;
    }

    public function getTableContent(Request $request){
        if ($request->isMethod('post')){return json_encode('{"isSuccess":"false", "message","unSupported Method"}');}
        if(!isset($request->table)){return json_encode('{"isSuccess":"false", "message","required table params is null"}');}
        $sql = 'SELECT * FROM '.$request->table;
        $tableContent = DB::connection('c02')->select(DB::raw($sql));
        
        return $tableContent;
    }

}