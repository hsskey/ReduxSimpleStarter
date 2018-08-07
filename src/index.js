import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
//Create a new component. This component should produce 
//some HTML

//ES2016 이전에는 변수할당은 var였으나 이후 상수는 const(최종값이 변하지않음&재할당x)
const API_KEY = 'AIzaSyDupkj08mxyVgCyvSAeKsFSiTRO9aECkwY';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {videos : []}
    this.videoSearch('captain marvel')
    
  }
  videoSearch(term){
    YTSearch({key:API_KEY,term:term},(videos) =>{
      
      //this.setState({videos : videos})과 같다
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
      })
    })
  }
  
  render(){
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300)

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList  
          onVideoSelect={selectedVideo =>this.setState({
            selectedVideo
          })}
          videos={this.state.videos}
        />
      </div>
    );
  }
};

ReactDOM.render(<App />,document.querySelector('.container'));
//Take this component's generated HTML and put it
//on the page (in the dom)