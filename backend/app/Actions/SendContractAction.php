<?php

namespace App\Actions;

use TCG\Voyager\Actions\AbstractAction;

class SendContractAction extends AbstractAction
{
    public function getTitle()
    {
        return 'Send Contract';
    }

    public function getIcon()
    {
        return 'voyager-file-text';
    }

    public function getPolicy()
    {
        return 'read';
    }

    public function getAttributes()
    {
        return [
            'class' => 'btn btn-sm btn-success pull-right',
        ];
    }

    public function getDefaultRoute()
    {
        return route('voyager.contracts.send', ['id' => $this->data->{$this->data->getKeyName()}]);
    }
}
