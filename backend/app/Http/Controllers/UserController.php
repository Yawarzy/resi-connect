<?php

namespace App\Http\Controllers;

use App\Models\Landlord;
use App\Models\User;
use Illuminate\Http\Request;
use TCG\Voyager\Http\Controllers\VoyagerUserController;

class UserController extends VoyagerUserController
{

    public function store(Request $request)
    {
        parent::store($request);

        $user = User::where('email', $request->email)->first();

        if ($request->role_id == 3) {
            $landlord = new Landlord();
            $landlord->user_id = $user->id;
            $landlord->name = $request->name;
            $landlord->email = $request->email;
            $landlord->save();
        }

        return redirect()->route('voyager.users.index')->with([
            'message' => "Successfully created new User",
            'alert-type' => 'success',
        ]);
    }
}
