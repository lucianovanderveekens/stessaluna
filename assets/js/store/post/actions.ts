import ActionTypes from "./actionTypes";
import axios from '../../http/client';
import { NewPost } from "../../post/new-post/new-post.interface";
import Exercise from "../../exercise/exercise.interface";
import { SubmitAnswerRequest } from "../../exercise/submit-answer/request.interface";
import { NewTextPost } from "../../post/new-post/text/new-text-post.interface";

export const fetchPosts = () => {
  return dispatch => {
    dispatch(pending());

    axios.get('/api/posts')
      .then(res => {
        dispatch(success(res.data));
      })
      .catch((e) => {
        dispatch(error());
        console.log(e);
      });
  };

  function pending() { return { type: ActionTypes.FETCH_POSTS_PENDING, }; };
  function success(posts) { return { type: ActionTypes.FETCH_POSTS_SUCCESS, payload: { posts } }; };
  function error() { return { type: ActionTypes.FETCH_POSTS_ERROR }; };
};

export const createPost = (post: NewPost) => {

  if (post instanceof NewTextPost) {
    // TODO: do form upload
    const formData = new FormData();
    formData.append('text', post.text);
    formData.append('image', post.image);
  }

  return dispatch => {
    return axios.post('/api/posts', post)
      .then(res => {
        console.log(res.data);
        dispatch(success(res.data));
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  function success(post) { return { type: ActionTypes.CREATE_POST_SUCCESS, payload: { post } }; };
};

export const deletePost = (id) => {
  return dispatch => {
    axios.delete('/api/posts/' + id)
      .then(res => {
        console.log(res.data);
        dispatch(success(id));
      })
      .catch(console.log);
  };

  function success(id) { return { type: ActionTypes.DELETE_POST_SUCCESS, payload: { id } }; };
};

export const addComment = (postId, text) => {
  return dispatch => {
    axios.post(`/api/posts/${postId}/comments`, { text })
      .then(res => {
        console.log(res.data);
        dispatch(success(postId, res.data));
      })
      .catch(console.log);
  };

  function success(postId, comment) { return { type: ActionTypes.ADD_COMMENT_SUCCESS, payload: { postId, comment } }; };
};

export const deleteComment = (postId, commentId) => {
  return dispatch => {
    axios.delete(`/api/posts/${postId}/comments/${commentId}`)
      .then(res => {
        console.log(res.data);
        dispatch(success(postId, commentId));
      })
      .catch(console.log);
  };

  function success(postId, commentId) { return { type: ActionTypes.DELETE_COMMENT_SUCCESS, payload: { postId, commentId } }; };
};

export const submitAnswer = (exerciseId: number, request: SubmitAnswerRequest) => {
  return dispatch => {
    axios.post(`/api/exercises/${exerciseId}/answers`, request)
      .then(res => {
        console.log(res.data);
        dispatch(success(res.data));
      })
      .catch(console.log);
  };

  function success(exercise: Exercise) { return { type: ActionTypes.SUBMIT_ANSWER_SUCCESS, payload: { exercise } }; };
};
