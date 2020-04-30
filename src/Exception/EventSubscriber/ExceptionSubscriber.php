<?php

declare(strict_types=1);

namespace Stessaluna\Exception\EventSubscriber;

use Stessaluna\Exception\NotAuthorException;
use Stessaluna\Exception\NotFoundException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class ExceptionSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::EXCEPTION => 'onExceptionEvent'
        );
    }

    public function onExceptionEvent(ExceptionEvent $event)
    {
        $exception = $event->getThrowable();

        $response = new Response();
        $response->setContent($exception->getMessage());

        if ($exception instanceof HttpExceptionInterface) {
            $response->setStatusCode($exception->getStatusCode());
            $response->headers->replace($exception->getHeaders());
        } elseif ($exception instanceof NotFoundException) {
            $response->setStatusCode(Response::HTTP_NOT_FOUND);
        } elseif ($exception instanceof NotAuthorException) {
            $response->setStatusCode(Response::HTTP_FORBIDDEN);
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $event->setResponse($response);
    }
}