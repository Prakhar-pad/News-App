import React,{ useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=>{

  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(true)
  const[page,setPage]=useState(1)
  const[totalResults,setTotalResults]=useState(0)

  
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 

  const updateNews= async()=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    props.setProgress(70)

    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
useEffect(() => {
  document.title = `${capitalizeFirstLetter(
    props.category
  )} - NewsMonkey`;
  
  updateNews();
}, []);

 

  const handlePrevClick = async () => {
    
   
    setPage(page-1)
    updateNews();
  };

  const handleNextClick = async () => {
   
    setPage(page+1)
    updateNews();
  };

  const fetchMoreData = async() => {
    setPage(page+1)
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    
  };
  
    return (
      <div >
        <h1 style={{ margin: "30px" ,marginTop:"90px"}} className="text-center">
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
<div className="container">
        <div className="row">
          {/* {!this.state.loading &&this.state.articles.map((element) => { */}
          {articles.map((element) => {
              
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    source={element.source.name}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
            </div>
            </div>
            </InfiniteScroll>
            
          {/* <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              onClick={this.handlePrevClick}
              className="btn btn-dark"
            >
              {" "}
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / props.pageSize)
              }
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div> */}
        
      </div>
    );
  
}
News.defaultProps = {
  city: "in",
  category: "general",
  pageSize: 8,
};
News.propTypes = {
  city: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
