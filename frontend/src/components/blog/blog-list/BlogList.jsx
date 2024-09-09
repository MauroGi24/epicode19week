import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { loadPost } from "../../../data/fetch";



const BlogList = props => {
  const [posts, setPosts] = useState([])
  useEffect(() =>{
    loadPost().then(data => setPosts(data))       
  }, []
)

  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
