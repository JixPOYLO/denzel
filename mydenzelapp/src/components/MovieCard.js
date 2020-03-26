import React from 'react';


class MovieCard extends React.Component{
    
    render(){
        
        
        return (
            
            <div className="movie-card">
                <h3>{this.props.m.title}</h3>           
                <p>id : {this.props.m.id}</p>
                <p>synopsis : {this.props.m.synopsis}</p>
                <hr/>
            </div>
        )
    }
}
export default MovieCard;