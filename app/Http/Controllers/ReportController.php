<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
  
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

}