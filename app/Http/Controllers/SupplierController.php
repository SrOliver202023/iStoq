<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Models\Supplier;
use Illuminate\Support\Facades\Redirect;
// use Illuminate\Support\Facades\Request;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\View\View;
use Illuminate\Support\Facades\DB;


class SupplierController extends Controller
{

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request):Response{
    $query = Supplier::query();
    $orderBy = $request->input('orderBy', 'id'); 
    $orderMode = $request->input('orderMode', 'desc'); 
    $limit = $request->input('limit', 10);
    $query->orderBy($orderBy, $orderMode);
    $suppliers = $query->paginate($limit);
    $suppliers->appends($request->query());
    return Inertia::render('Supplier/Index', ['suppliers' => $suppliers]);
    // $suppliers = DB::table('suppliers')->orderBy('id','asc')->paginate(10);
    // return Inertia::render('Supplier/Index', ['suppliers' => $suppliers]);
  }

  // public function indexPagination():Response{
  //   $suppliers = DB::table('suppliers')->orderBy('id','asc')->paginate(10);
  //   return Inertia::render('Supplier/Index', ['suppliers' => $suppliers]);
  // }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create(){
    return Inertia::render('Supplier/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreSupplierRequest $request){
      Supplier::create(
          $request->validated()
      );

    return Redirect::route('suppliers.index');
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id){
    $supplier = Supplier::findOrFail($id);
    return Inertia::render('Supplier/Edit', ['supplier' => $supplier]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit(Supplier $supplier){
    return Inertia::render('Supplier/Edit',[
      'supplier'=>[
        'id'=> $supplier-> id,
        'nameSupplier' => $supplier-> nameSupplier,
        'email' =>$supplier-> email,
        'phone' => $supplier-> phone,
        'cnpj' => $supplier-> cnpj,
        'address' => $supplier-> address
      ]
    ]);
  }

    /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(StoreSupplierRequest $request, Supplier $supplier){
    $supplier->update($request->validated());
    
    return Redirect::route('suppliers.index');

  }
  
    /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Supplier $supplier){
    $supplier->delete();
    return Redirect::route('suppliers.index');
  }
}