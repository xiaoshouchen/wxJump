<?php

namespace App\Exceptions;

use Exception;

class FromVerif extends Exception
{
    //
    public function __construct($message = "") {
        parent::__construct($message,422);
    }
}
