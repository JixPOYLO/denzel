import React,{Component} from 'react'
//import { Button } from 'reactstrap';
import MovieCard from './MovieCard'
//import restoData from './example.json'
//import Data from './moviesdenzel.json'
import styles from './mystyle.module.css'; 




var call="";

class MainContent extends Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          api : 0,
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
        if( a == 0) {  call="http://localhost:9292/movies/all"}
        if( a == 1) {  call="http://localhost:9292/movies"  }
        if( a == 2) {  call="http://localhost:9292/movies/:id?id="+param1}
        if( a == 3) {  call=" http://localhost:9292/movies/search?limit="+param1+"&metascore="+param2}
        if( a == 4) {  call="http://localhost:9292/reviews/:id?id="+param1}
        if( a == 3) {  call=" http://localhost:9292/movies/search?limit="+param1+"&metascore="+param2}



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

    async AddReview(mID){


      const dd = document.getElementById("DD")
      var mydate= dd.value+"-"
      const mm = document.getElementById("MM")
      mydate= mydate+mm.value+"-"
      const yyyy =document.getElementById("YYYY");
      mydate=mydate+yyyy.value

      const r = document.getElementById("R")
      const myreview = r.value
      const form = document.getElementById("RForm");

      const url="http://localhost:9292/movies/:id?id="+mID

      const Rdata={
        date: mydate,
        review: myreview
      }

      const putMethod = {
        method: 'PUT', 
        headers: {
         'Content-type': 'application/json; charset=UTF-8' 
        },
        body: JSON.stringify(Rdata) 
      }


      if (mydate.value != "" && myreview.value!="") {
      
        await fetch(url, putMethod)    
        .then(response => response.json())
        .then(data => console.log(data)) 
        .catch(err => console.log(err))

        form.reset();
      } else {
        console.log("")
      }

    
   
    }

    componentDidMount() {
       this.LoadData(this.state.api,"tt0328107",0);
    }

    Option(){

        console.log("Option was clicked !")
        this.setState({              
                  api : 0,
                  isLoaded : false
        });
        this.LoadData(0);
                
    }

    LimitMeta(){

        console.log("Limit was clicked !")
        this.setState({              
                  api : 3,
                  isLoaded : false
        });
        const limit = document.getElementById("limit");
        const meta = document.getElementById("meta");
        const form = document.getElementById("MLForm");

        //mID="tt0328107"

        if (limit.value != "" && meta.value != "") {
        
          this.LoadData(3,limit.value,meta.value);
          limit.classList.remove("is-danger");
          meta.classList.remove("is-danger");

          form.reset();
        } else {
          // If the input doesn't have a value, make the border red since it's required
          limit.classList.add("is-danger");
          limit.classList.add("is-danger");

        }
                
    }

    WatchReviews(watchID){

        //e.preventDefault();
        console.log("Reviews was clicked !")
        this.setState({              
                  api : 4,
                  isLoaded : false
        });

        //this.LoadData(4,0,0);
        //const form = document.getElementById("reviewForm");
        //const watchID =document.getElementById("watchID");
        //watchID ="tt0328107"
        this.LoadData(4,watchID ,0);
        //form.reset();
        
                
    }

    Spe(e){

        console.log("Spe was clicked !")
        e.preventDefault();
        this.setState({              
                  api : 2,
                  isLoaded : false
        });
        const mID = document.getElementById("mID");
        const form = document.getElementById("SpeForm");

        //mID="tt0328107"

        if (mID.value != "") {
        
          this.LoadData(2,mID.value ,0);
          mID.classList.remove("is-danger");
          form.reset();
        } else {
          // If the input doesn't have a value, make the border red since it's required
          mID.classList.add("is-danger");
        }

                
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
        //console.log("api "+api)
        //console.log("items "+items)
        if (error) {
          return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading … </div>;
        } else if(this.state.api <= 3 ) {
          return (
            <div>
                <ul>
                <button onClick={this.Option} > All movies </button>
                <button onClick={this.MustWatch}> A MustWatch movie </button>  
                <form className="form" id="SpeForm" >
                    <input
                      type="text"
                      className="input"
                      id="mID"
                      placeholder="       enter a movie ID "
                    />
                    <button className="button is-info" onClick={this.Spe}>
                      Search Specific Movie
                    </button>
                </form>
                <form className="form" id="MLForm" >
                    <input
                      type="text"
                      className="input"
                      id="meta"
                      placeholder="    Minimum Metascore "
                    />
                    <input
                      type="text"
                      className="input"
                      id="limit"
                      placeholder="   Limit of result    "
                    />
                    <button className="button is-info" onClick={this.LimitMeta}>
                      Search by Metascore and Limit
                    </button>
                </form>

                {this.state.items.map(item => (
                    <div>
                        <h3 key={item.id}>{item.title}</h3>   
                        <img src={item.poster}/>      
                        <p >Id : {item.id}</p>
                        <p>Metascore : {item.metascore}</p>
                        <p>Year : {item.year}</p>
                        <p>Synopsis : {item.synopsis}</p>
                        <form className="form" id="reviewForm" >
                        <input
                          type="hidden"
                          className="input"
                          id="watchID"
                          value={item.id}
                        />  
                        <button className="button is-info" onClick={() => this.WatchReviews(item.id)}>
                             Check Reviews
                        </button>
                        </form>
                        
                        <hr/>
                    </div>
                ))}

            
                <h2>API Option number {this.state.api}</h2>
                </ul>
                
            </div>
          );
        } else if(this.state.api == 4 ) {
            return (
              <div>             
                <button onClick={this.Option}> Back to All Movies </button>  
               
                <ul>
                    {this.state.items.map(item => (
                    <div>
                    <h3 >{item.MovieId}</h3>       
                    <p>Date : {item.date}</p>
                    <p>Review : {item.review}</p> 
                    <hr/>
                   
                    <form className="form" id="RForm" >
                    <input
                      type="text"
                      className="input"
                      id="DD"
                      placeholder="    DD "
                    />
                    <input
                      type="text"
                      className="input"
                      id="MM"
                      placeholder="   MM    "
                    />
                    <input
                      type="text"
                      className="input"
                      id="YYYY"
                      placeholder="   YYYY    "
                    />
                    <input
                      type="text"
                      className="input"
                      id="R"
                      placeholder="   Write your Review    "
                    />
                     <button className="button is-info" onClick={() => this.AddReview(item.MovieId)}>
                          Add Your Review !
                    </button>
                </form>
                    </div>
                    ))}
                </ul>
                

             

                <h2>API Option number {this.state.api}</h2>
                
              </div>
            );
        }
        else{
            return <div>NOPE JIXOU</div>;
        }

        
    }
    
    
    
}

  export default MainContent;