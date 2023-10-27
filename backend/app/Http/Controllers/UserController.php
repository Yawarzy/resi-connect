<?php

namespace App\Http\Controllers;

use App\Models\Landlord;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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


    public function updatePassword(Request $request)
    {
        $user = User::where('id', $request->id)->firstorFail();

        $validated = $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8',
        ]);

        if ($user->role_id != 2) {
            return response()->json([
                'message' => 'You are not authorized to update password',
                'status' => 'error'
            ]);
        }

//        dd($current_password, $user->password);
        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect',
                'status' => 'error'
            ]);
        }

        // set new password
        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully',
            'status' => 'success'
        ]);
    }


}
