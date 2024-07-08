import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
// import { WindowWidthProvider } from '../context/WindowWidthContext.js';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { isSmallerDevice } = useWindowWidth();
  const postsPerPage = isSmallerDevice ? 5 : 10;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(userResponse.data);

        const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { _start: 0, _limit: postsPerPage },
        });
        setPosts(postResponse.data);

        if (postResponse.data.length < postsPerPage) {
          setHasMorePosts(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, [isSmallerDevice]);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: { _start: page * postsPerPage, _limit: postsPerPage },
      });

      setPosts((prevPosts) => [...prevPosts, ...postResponse.data]);

      if (postResponse.data.length < postsPerPage) {
        setHasMorePosts(false);
      }

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching more posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomUser = () => {
    return users[Math.floor(Math.random() * users.length)];
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post) => (
          <Post key={post.id} post={post} user={getRandomUser()} />
        ))}
      </PostListContainer>

      {posts.length > 0 && hasMorePosts && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
