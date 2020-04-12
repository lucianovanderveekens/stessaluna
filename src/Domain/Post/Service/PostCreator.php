<?php

declare(strict_types=1);

namespace Stessaluna\Domain\Post\Service;

use DateTime;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbChoice;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbExercise;
use Stessaluna\Domain\Exercise\Aorb\Entity\AorbSentence;
use Stessaluna\Domain\Image\ImageStorage;
use Stessaluna\Domain\Post\Entity\Post;
use Stessaluna\Domain\Post\Exercise\Entity\ExercisePost;
use Stessaluna\Domain\Post\Repository\PostRepository;
use Stessaluna\Domain\User\Entity\User;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class PostCreator
{
    private ImageStorage $imageStorage;

    private PostRepository $postRepository;

    public function __construct(ImageStorage $imageStorage, PostRepository $postRepository)
    {
        $this->imageStorage = $imageStorage;
        $this->postRepository = $postRepository;
    }

    public function createPost(?string $text, ?UploadedFile $image, User $user): Post
    {
        $post = new Post();
        $post->setAuthor($user);
        $post->setCreatedAt(new DateTime('now'));
        $post->setText($text);
        if ($image) {
            $filename = $this->imageStorage->store($image);
            $post->setImageFilename($filename);
        }

        return $this->postRepository->save($post);
    }

    // public function createAorbExercisePost(array $sentences, User $user): ExercisePost
    // {
    //     $post = new ExercisePost();
    //     $post->setUser($user);
    //     $post->setCreatedAt(new DateTime('now'));

    //     $exercise = new AorbExercise();
    //     foreach ($sentences as $s) {
    //         $sentence = new AorbSentence();
    //         $sentence->setTextBefore($s['textBefore']);

    //         $choice = new AorbChoice();
    //         $choice->setA($s['choice']['a']);
    //         $choice->setB($s['choice']['b']);
    //         $choice->setCorrect($s['choice']['correct']);
    //         $sentence->setChoice($choice);

    //         $sentence->setTextAfter($s['textAfter']);

    //         $exercise->addSentence($sentence);
    //     }
    //     $post->setExercise($exercise);

    //     return $this->postRepository->save($post);
    // }
}