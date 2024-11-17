import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import PostListItem from "../post-list-item";
const PostList = ({posts, onDelete,onToggleImportant,onToggleLiked})=>{

    const elments = posts.map((item)=>{

        const{id, ...itemProps} = item
        return(
           <li key={id} className="list-group-item">
            <PostListItem {...itemProps}
            onDelete={()=> onDelete(id)}
            onToggleImportant={()=>onToggleImportant(id)}
            onToggleLiked={()=>onToggleLiked(id)} /> 

           </li>
        )
    })


    return(
        <ListGroup className="app-list ">
         {elments}
        </ListGroup>
    )
}
export default PostList;