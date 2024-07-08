import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollSnapType: 'x mandatory',
  scrollBehavior: 'smooth',
  width: '100%',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
  '& > p': {
    marginBottom: '8px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: '50%',
  transform: 'translateY(-50%)',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const UserHeader = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
}));

const UserLogo = styled.img(() => ({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  marginRight: '10px',
}));

const UserInfo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Post = ({ post, user }) => {
  const carouselRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.firstChild.clientWidth;
      carouselRef.current.scrollBy({
        left: itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.firstChild.clientWidth;
      carouselRef.current.scrollBy({
        left: -itemWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <UserHeader>
        <UserLogo src={user.logo} alt={`${user.name} logo`} />
        <UserInfo>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </UserInfo>
      </UserHeader>
      <CarouselContainer>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <Carousel ref={carouselRef}>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={image.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};

Post.defaultProps = {
  user: {
    logo: '/path/to/default/logo.png',  // Add a default logo path
  },
};

export default Post;
