<?php

declare(strict_types=1);

namespace Stessaluna\Post\Service;

use Stessaluna\Exception\NotAuthorException;
use Stessaluna\Post\Entity\Post;
use Stessaluna\Post\Exception\PostNotFoundException;
use Stessaluna\Post\Repository\PostRepository;
use Stessaluna\User\Entity\User;

class PostService
{
    private PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * @return Post[] an array containing all posts
     */
    public function getPosts(): array
    {
        $posts = $this->postRepository->findAll();
        usort($posts, function (Post $a, Post $b) { return $a->getCreatedAt() < $b->getCreatedAt(); });
        return $posts;
    }

    public function createPost(Post $post): Post
    {
        return $this->postRepository->save($post);
    }

    public function deletePostById(int $id, User $user)
    {
        $post = $this->postRepository->find($id);
        if (!$post) {
            throw new PostNotFoundException($id);
        }

        if ($user->getId() != $post->getAuthor()->getId()) {
            throw new NotAuthorException('Not the author of post: '.$id);
        }

        if ($post->getImageFilename()) {
            $this->imageStorage->delete($post->getImageFilename());
        }

        $this->postRepository->delete($post);
    }
}