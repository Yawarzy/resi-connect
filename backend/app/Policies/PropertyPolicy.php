<?php

namespace App\Policies;

use App\Models\Landlord;
use App\Models\Property;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use TCG\Voyager\Policies\BasePolicy;

class PropertyPolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


    /**
     * Determine if the given model can be read by the user.
     * @param User $user
     * @param Property $model
     * @return bool
     */
    public function read(User $user, $model)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        $landlord = Landlord::where('user_id', $user->id)->first();
        return $model->landlord_id === $landlord->id || $user->hasRole('admin');
    }

    /**
     * Determine if the given model can be edited by the user.
     * @param User $user
     * @param Property $model
     */
    public function edit(User $user, $model)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        $landlord = Landlord::where('user_id', $user->id)->first();
        return $model->landlord_id === $landlord->id || $user->hasRole('admin');
    }


    /**
     * Determine if the given model can be deleted by the user.
     * @param User $user
     * @param Property $model
     */
    public function delete(User|\TCG\Voyager\Contracts\User $user, $model)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        $landlord = Landlord::where('user_id', $user->id)->first();
        return $model->landlord_id === $landlord->id || $user->hasRole('admin');
    }
}

