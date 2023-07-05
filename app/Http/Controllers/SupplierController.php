<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Models\Supplier;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
  public function index(Request $request):Response{
    $query = Supplier::query();
    $orderBy = $request->input('orderBy', 'id'); 
    $orderMode = $request->input('orderMode', 'desc'); 
    $limit = $request->input('limit', 10);
    $query->orderBy($orderBy, $orderMode);
    $suppliers = $query->paginate($limit);
    $suppliers->appends($request->query());

    return Inertia::render('Supplier/Index', ['suppliers' => $suppliers]);
  }

  public function create(){
    return Inertia::render('Supplier/Create');
  }

  public function store(StoreSupplierRequest $request){
      Supplier::create(
          $request->validated()
      );

    return Redirect::route('suppliers.index');
  }

  public function show($id){
    $supplier = Supplier::findOrFail($id);
    return Inertia::render('Supplier/Edit', ['supplier' => $supplier]);
  }

  public function edit(Supplier $supplier, Request $request){
    return Inertia::render('Supplier/Edit',[
      'supplier'=>[
        'id'=> $supplier-> id,
        'suppplierName' => $supplier-> suppplierName,
        'email' =>$supplier-> email,
        'phone' => $supplier-> phone,
        'cnpj' => $supplier-> cnpj,
        'address' => $supplier-> address
      ]
    ]);
  }

  public function update(StoreSupplierRequest $request, Supplier $supplier){
    $supplier->update($request->validated());
    return Redirect::route('suppliers.index');
  }

  public function destroy(Supplier $supplier){
    $supplier->delete();
    return Redirect::route('suppliers.index');
  }
}