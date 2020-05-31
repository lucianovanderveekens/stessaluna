import React, {FC, useEffect, useState} from "react";
import Feed from "./Feed";
import {deletePost, fetchPosts} from "../store/post/actions";
import {State} from "../store";
import {connect} from 'react-redux'
import Post from "../post/post.interface";
import {Filters} from "../store/post/state.interface";

interface Props {
  loading: boolean
  posts: Post[]
  filters: Filters
  fetchPosts: (channels: string[], limit: number, beforeId?: number, append?: boolean) => void
  deletePost: (id: number) => void
}

const FETCH_SIZE = 2;

const FeedContainer: FC<Props> = ({loading, posts, filters, fetchPosts, deletePost}) => {

  useEffect(() => {
    fetchPosts(filters.channel, FETCH_SIZE)
  }, [filters])

  const handleLoadMore = () => {
    const oldestPostIdInFeed = Math.min(...posts.map((post) => post.id))
    fetchPosts(filters.channel, FETCH_SIZE, oldestPostIdInFeed, true)
  }

  return (
    <Feed
      loading={loading}
      posts={posts}
      onLoadMore={handleLoadMore}
      onDeletePost={deletePost}
    />
  )
}

const mapStateToProps = (state: State) => ({
  loading: state.post.loading,
  posts: state.post.data,
  filters: state.post.filters,
})

const actionCreators = {
  fetchPosts,
  deletePost,
}

export default connect(mapStateToProps, actionCreators)(FeedContainer)
