import React from 'react';
import Avatar from '../assets/avatar1.jpg';
import { Link } from 'react-router-dom';

const PostAuthor = () => {
  return (
    <Link to={`/posts/users/rarefaef`} className='post__author'>
        <div className="post__author-avatar">
            <img src={Avatar} alt="" />
        </div>
        <div className="post__author-details">
            <h5>By: Pepe Sibrian</h5>
            <small>Hace 2 minutos</small>
        </div>
    </Link>
  )
}

export default PostAuthor