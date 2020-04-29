<?php

declare(strict_types=1);

namespace Stessaluna\Exercise\Answer\Dto;

use Stessaluna\Exercise\ExerciseType;

class MissingwordAnswerDto extends AnswerDto
{
    public int $option;

    public function __construct()
    {
        parent::__construct(ExerciseType::MISSING_WORD);
    }
}