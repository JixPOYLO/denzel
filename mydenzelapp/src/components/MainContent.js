import React,{Component} from 'react'
//import { Button } from 'reactstrap';
//import restoData from './example.json'
//import Data from './moviesdenzel.json'
import styles from './mystyle.module.css'; 



class MainContent extends Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          api : 0,
          items: [],
          coms:[]
        };

        this.Option= this.Option.bind(this)
        this.componentDidMount= this.componentDidMount.bind(this)
        this.WatchReviews= this.WatchReviews.bind(this)
        this.MustWatch= this.MustWatch.bind(this)
        this.Spe= this.Spe.bind(this)
        this.LimitMeta= this.LimitMeta.bind(this)


    }
    
    async LoadData(a, param1, param2){
      
        var call="";    
        if( a == 0) {  call="http://localhost:9292/movies/all"}
        if( a == 1) {  call=" http://localhost:9292/movies/search?limit="+param1+"&metascore="+param2}
        if( a == 2) {  call="http://localhost:9292/movies/:id?id="+param1}
        if( a == 3) {  call="http://localhost:9292/movies" }
        if( a == 4) {  call="http://localhost:9292/reviews/:id?id="+param1}
       


        if(a != 4)
        {
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

        else
        {
        await fetch(call)
          .then(res => res.json())
          .then(
            (result) => {         
              this.setState({
                isLoaded: true,              
                coms: result
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
    }

    async AddReview(){

      const mID = document.getElementById("mID")

      const pseudo = document.getElementById("pseudo")
      var mypseudo= pseudo.value 

      const dateR = document.getElementById("dateR")
      var mydate= dateR.value
     
      const r = document.getElementById("R")
      const myreview = r.value
      const form = document.getElementById("RForm");

      const url="http://localhost:9292/movies/:id?id="+mID.value

      const Rdata={
        pseudo: mypseudo,
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


      if (mydate.value != "" && myreview.value!="" && mypseudo.value!="") {
      
        await fetch(url, putMethod)    
        .then(response => response.json())
        .then(data => console.log(data)) 
        .catch(err => console.log(err))

        alert("Thanks! Your review has been added !" )


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
                  api : 1,
                  isLoaded : false
        });
        const limit = document.getElementById("limit");
        const meta = document.getElementById("meta");
        const form = document.getElementById("MLForm");

        //mID="tt0328107"

        if (limit.value != "" && meta.value != "") {
        
          this.LoadData(1,limit.value,meta.value);
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
      this.LoadData(2,watchID ,0);

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
                  api : 3,
                  isLoaded : false
        });
        this.LoadData(3,0,0);
                
    }
    
    render(){


        const { error, isLoaded, api, items, coms } = this.state;
        //console.log("api "+api)
        //console.log("items "+items)
        if (error) {
          return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading … </div>;
        } else if(this.state.api <= 3 ) {
          return (
            <div>
                <h2>Movies</h2>
                <p>API Option {this.state.api}</p>

                <ul>
                  <form>
                  <hr/>
                  
                  <button className={styles.button4} href="#mlist" onClick={this.Option} > All movies </button>
                  
                  <button className={styles.button4} onClick={this.MustWatch}> A MustWatch movie </button>  
                  <br/>
                  <br/>
                  </form>
                
                  <form className="form" id="SpeForm" >
                      <input
                        type="text"
                        className="input"
                        id="mID"
                        placeholder="Enter movieID"
                      />
                  
                      <button className={styles.button2}  onClick={this.Spe}>
                        Search 
                      </button>
                      

                     
                      <br/>
                                      
                      <br/>
                  </form>

                  <form className="form" id="MLForm" >
                      <label for="metascore">Minimum metascore (50-80) :  </label>
                    
                      <input type="number" name="metascore"
                        min="50" max="80"
                        id="meta"
                        placeholder="Metascore"
                      />
                      <br/>
                      <br/>
                    

                      <label for="nb">Number of results (1-10) :  </label>
                  
                      <input type="number" name="nb"
                        min="1" max="10"
                        id="limit"
                        placeholder="Limit"
                      />
                      <br/>
                      <br/>
                    
                    

                      <button className={styles.button2} onClick={this.LimitMeta}>
                        Search with those filters
                      </button>

                      <br/>
                      <br/>
                  </form>

                </ul>


                <br/>
                {this.state.items.map(item => (
                    <div>
                        <li>
                        <br/>
                        <h3 key={item.id}>{item.title}</h3>   
                        <img src={item.poster}/>      
                        <p >Id : {item.id}</p>
                        <p>Metascore : {item.metascore}</p>
                        <p>Year : {item.year}</p>
                        <p className={styles.c}>Synopsis : {item.synopsis}</p>
                        <form className="form" id="reviewForm" >                     
                          <button className={styles.button2} onClick={() => this.WatchReviews(item.id)}>
                               See more reviews
                          </button>
                        </form>

                        <p className={styles.c}>{item.LR} {item.LRdate}</p>
                             
                        <br/>
                        <br/>
                        </li>
                        
                    </div>
                ))}
                
                
                
            </div>
          );
        } else if(this.state.api == 4 ) {
            return (
              <div>   

                 <p>API Option {this.state.api}</p>

                        
                <button className={styles.button4} onClick={this.Option}> Back to All Movies </button>
                <br/>
                <br/>
                <form className="form" id="SpeForm" >
                   
                    <button className={styles.button4} onClick={this.Spe}>
                      Back to Movie Info
                    </button>
                    <br/>
                    <br/>


                </form>
                <ul>
                <form className="form" id="RForm" >  
                          <h3>Add your review :</h3>      
                          <input type="date" id="dateR"
                           
                           min="2020-01-01" max="2022-12-31">

                          </input>
                          <br/>
                          <br/>
                
                          <input
                            type="text"
                            className="input"
                            id="pseudo"
                            placeholder="Write pseudo "
                          />
                          <br/> 
                          <br/>          
                          <input
                            type="text"
                            className="input"
                            id="R"
                            placeholder="Write here .."
                          />    
                          <br/> 
                          <br/>  

                          <button className={styles.button4} onClick={() => this.AddReview()}>
                                Send
                          </button>
                </form>  
                <hr/>
                </ul>
                

                {this.state.items.map(item => (
                    <div>
                       
                        <br/>
                        <h3>{item.title}</h3>   
                        <img src={item.poster}/>      

                        <br/>
                       
                        
                    </div>
                ))}
                
                {this.state.coms.map(item => (
                    <ol>
                    <form>
                    <div>
                    <h4>Date : {item.date}</h4>
                    <h4>Review : {item.review}</h4> 
                    <h4> by {item.pseudo}</h4> 

                    <input
                          type="hidden"
                          className="input"
                          id="mID"
                          value={item.MovieId}
                        />  
                   
                    </div>
                    </form>
                    </ol>
                    ))}
                
                                
              </div>
            );
        }
        else{
            return <div>NOPE JIXOU</div>;
        }

        
    }
    
    
    
}

  export default MainContent;