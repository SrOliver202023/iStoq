<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request):Response
    {
        $query = Product::query();
        $query->join('suppliers','products.supplierId','=','suppliers.id')->select('products.*','suppliers.supplierName');
        $orderBy = $request->input('orderBy', 'id'); 
        $orderMode = $request->input('orderMode', 'desc'); 
        $limit = $request->input('limit', 10);
        $query->orderBy($orderBy, $orderMode);
    
        if($request->has('supplierId')){
            $query->where('supplierId','=',$request->input('supplierId'));
        }

        $products = $query->paginate($limit);
        $products->appends($request->query());
        return Inertia::render('Product/Index', ['products' => $products]);
    }
    public function create()
    {
        $suppliers = Supplier::all();
        return Inertia::render('Product/Create',['suppliers' => $suppliers]);
    }
    public function store(Request $request)
    {
        $validated=$request->validate([
            'productName' => 'required|string|max:255',
            'externalCode' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
            'supplierId' => 'required|numeric',
            'created_at'  => 'nullable|timestamp',
            'updated_at'  => 'nullable|timestamp',
            'imageUrl' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('imageUrl')) {
            $file = $request->file('imageUrl');
            $fileName = 'istoq-img-'.time().'.'.$file->extension();
            $path=$file->storeAs('/public/images/products',$fileName);
            $validated['imageUrl']='/images/products/'.$fileName;
        }

        Product::create($validated);
        return Redirect::route('products.index');
    }
    public function show($id)
    {
        $suppliers = Supplier::all();
        $product = Product::findOrFail($id);
        return Inertia::render('Product/Edit', [
            'product' => $product,
            'suppliers'=>$suppliers,
        ]);
    }
    public function edit(Product $product)
    {
        return Inertia::render('Product/Edit',[
        'product'=>[
            'id'=> $product-> id,
            'productName'=> $product-> productName,
            'externalCode'=> $product-> externalCode,
            'description'=> $product-> description,
            'price'=> $product-> price,
            'quantity'=> $product-> quantity,
            'imageUrl'=> $product-> imageUrl,
            'supplierId'=> $product-> supplierId,
            // 'userId'=> $request->user()->id,
        ],
        ]); 
    }
    public function update(StoreProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return Redirect::route('products.index');
    }
    public function destroy(Product $product)
    {
        $product->delete();
        return Redirect::route('products.index');
    }
    public function storeImage($request){
        $newImageName = uniqid().'-'.$request->title.'.'.
        $request->image->extension();
        return $request->image->move(public_path('images'),$newImageName);
    }
}
