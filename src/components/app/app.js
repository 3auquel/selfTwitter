import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form";
import '../../css/styles.css';
import styled from 'styled-components'

const AppBlock = styled.div`
 margin: 0 auto;
  max-width: 800px;`



export default class App extends Component{
    state={
        data:[
        
            {label:'Going to learn react',important:true,like:false,id:"1"},
            {label:'Thas is good idea',important:false,like:false,id:"2"},
            {label:'Good job',important:false,like:false,id:'3'}
    
        ],
        term:'',
        filter:'all'
    }
    maxId=4;
    deleteItem=(id)=>{
        this.setState(({data})=>{
            const index= data.findIndex(elem=> elem.id===id);
          
            const newArr=[...data.slice(0,index), ...data.slice(index+1)];
            return{
                data:newArr
            }
        });

    }
    addItem=(body)=>{
        this.setState(({data})=>{
            const newItem={
                label: body,
                important: false,
                id:this.maxId++
            }
            const newArr = [...data,newItem];
            return{
                data:newArr
            }

            

        });

    }

    onToggleProperty = (id, property) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = { ...old, [property]: !old[property] };
            const newArr = [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index + 1)
            ];
            return { data: newArr };
        });
    };
    
    onToggleImportant=(id)=>{
        this.onToggleProperty(id,'important');
        
    }
    onToggleLiked=(id)=>{
        
        this.onToggleProperty(id,'like');
    }
searchPost(items,term){
    if(term.length===0){
        return items
    }
    return items.filter((item)=>{
        return item.label.indexOf(term) > -1
    })
}
onUpdateSearch=(term)=>{
    this.setState({term})
}
filterPost(items,filter){
    if(filter==='like'){
        return items.filter(item=>item.like)
    } else{
        return items
    }
}
onFilterSelect=(filter)=>{
    this.setState({filter})

}

    
    render(){
        const {data,term,filter}=this.state;

        const liked = data.filter(item=>item.like).length;
        const allPosts=data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term),filter);
        return(
            <AppBlock>
                     <AppHeader
                     liked={liked}
                     allPosts={allPosts}
                     />
                     
                    <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                    
                    </div>
                    <PostList
                     posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                    />
                    <PostAddForm
                    onAdd={this.addItem}/>
                   
                    
            </AppBlock>
           
            
        )
    }
}


