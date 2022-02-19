<?php

declare (strict_types=1);
namespace Jacoby\Intervention\PhpParser\Node\Stmt;

use Jacoby\Intervention\PhpParser\Node;
use Jacoby\Intervention\PhpParser\Node\Expr;
class StaticVar extends Node\Stmt
{
    /** @var Expr\Variable Variable */
    public $var;
    /** @var null|Node\Expr Default value */
    public $default;
    /**
     * Constructs a static variable node.
     *
     * @param Expr\Variable  $var         Name
     * @param null|Node\Expr $default    Default value
     * @param array          $attributes Additional attributes
     */
    public function __construct(Expr\Variable $var, Node\Expr $default = null, array $attributes = [])
    {
        parent::__construct($attributes);
        $this->var = $var;
        $this->default = $default;
    }
    public function getSubNodeNames() : array
    {
        return ['var', 'default'];
    }
    public function getType() : string
    {
        return 'Stmt_StaticVar';
    }
}