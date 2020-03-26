import React from 'react'
import MovieCard from './MovieCard'
//import restoData from './example.json'
//import Data from './moviesdenzel.json'
import styles from './mystyle.module.css'; 


var call="";

class MainContent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          api : 2,
          items: []
        };

        this.Option= this.Option.bind(this)
        this.componentDidMount= this.componentDidMount.bind(this)
        this.WatchReviews= this.WatchReviews.bind(this)
        this.MustWatch= this.MustWatch.bind(this)
        this.Spe= this.Spe.bind(this)
        this.LimitMeta= this.LimitMeta.bind(this)


    }
    
    async LoadData(a, param1, param2){
        if(/*this.state.api == 1 ||*/ a == 1) {  call="http://localhost:9292/movies"  }
        if( a == 2) {  call="http://localhost:9292/movies/:id?id="+param1}
        if( a == 3) {  call=" http://localhost:9292/movies/search?limit="+param1+"&metascore="+param2}
        if( a == 4) {  call="http://localhost:9292/reviews"}

        await fetch(call)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
          
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
            )
    }

    componentDidMount() {
       this.LoadData(this.state.api,"tt0328107",0);
    }

    Option(){

        console.log("Option was clicked !")
        this.setState({              
                  api : 3,
                  isLoaded : false
        });
        this.LoadData(3);
                
    }

    LimitMeta(){

        console.log("Limit was clicked !")
        this.setState({              
                  api : 3,
                  isLoaded : false
        });
        this.LoadData(3,"5","72");
                
    }

    WatchReviews(){

        console.log("Reviews was clicked !")
        this.setState({              
                  api : 4,
                  isLoaded : false
        });
        this.LoadData(4,0,0);
                
    }

    Spe(){

        console.log("Spe was clicked !")
        this.setState({              
                  api : 2,
                  isLoaded : false
        });
        this.LoadData(2, "tt0328107",0);
                
    }

    MustWatch(){

        console.log("MustWatch was clicked !")
        this.setState({              
                  api : 1,
                  isLoaded : false
        });
        this.LoadData(1,0,0);
                
    }
    
    render(){

    

        const { error, isLoaded, api, items } = this.state;
        console.log("api "+api)
        console.log("item "+items)
        if (error) {
          return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading …</div>;
        } else if(this.state.api == 1 || this.state.api == 2 || this.state.api == 3 ) {
          return (
            <div>
                <ul>
                <button onClick={this.Option} > api option </button>
                <button onClick={this.WatchReviews}> All Reviews </button> 
                <button onClick={this.MustWatch}> A MustWatch movie </button>  
                <button onClick={this.Spe}> A Specific movie </button>               
                <button onClick={this.LimitMeta}> Select by Metascore </button>

                {this.state.items.map(item => (
                    <div>
                    <h3 key={item.id}>{item.title}</h3>   
                    <img src={item.poster}/>      
                    <p>Id : {item.id}</p>
                    <p>Metascore : {item.metascore}</p>
                    <p>Year : {item.year}</p>
                    <p>Synopsis : {item.synopsis}</p>
                    
                    <hr/>
                    </div>
                ))}

              
                <h1>{this.state.api}</h1>
                </ul>
                
            </div>
          );
        } else if(this.state.api == 4 ) {
            return (
              <div>             
                <button onClick={this.Option}> api option </button>  
                <button onClick={this.WatchReviews}> All Reviews </button>  
                <button onClick={this.MustWatch}> A MustWatch movie </button> 
                <button onClick={this.Spe}> A Specific movie </button>               
                <button onClick={this.LimitMeta}> Select by Metascore </button> 
                <ul>
                    {this.state.items.map(item => (
                    <div>
                    <h3 key={item._id}>{item.MovieId}</h3>       
                    <p>Date : {item.date}</p>
                    <p>Review : {item.review}</p> 
                    <hr/>
                    </div>
                    ))}
                </ul>

             

                <h1>{this.state.api}</h1>
                
              </div>
            );
        }
        else{
            return <div>NOPE JIXOU</div>;
        }
    }
    
    
    
}

  export default MainContent;