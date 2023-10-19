import React,{useState ,useMemo ,useEffect} from 'react'
import Status from './Status'
import Posts from './Posts'
import { Category ,FixFoot} from '../../header/Header'
import request from '../../request/Request'
import { ipAdress } from '../../../generals'


 const DefaultView =({posts})=>{

const [user ,setUser] = useState(false)
const [page ,setPage] = useState(0)
const [loadMoreCall  ,setLoadMoreCall] = useState(false)
const [post ,setPosts] = useState([])

const [loadingPosts ,setLoadingPosts] = useState(false)


useMemo(()=>{
    if(localStorage.getItem('userId')){
        setUser(true)
    }
},[0])


//To load the first posts
useEffect(()=>{
    async function fetchData(){

        let skip = (page) * 5
        let limit = 5
        setLoadingPosts(true)
            console.log('fetching new posts')
            let temp = await request({url:`http://${ipAdress}:5000/api/post/getPosts/${skip}/${limit}`,method:'get'})
            // console.log(temp.posts)
            setPosts([...post ,...temp.posts])
        setLoadingPosts(false)
        setLoadMoreCall(false)

    }
    fetchData()
},[0])

//To load more posts and append to the existing posts
useEffect(()=>{
    if(post.length > 5 ){
        async function fetchData(){
    
            let skip = (page) * 5
            let limit = 5
            // setLoadingPosts(true)
                console.log('fetching new posts')
                let temp = await request({url:`http://${ipAdress}:5000/api/post/getPosts/${skip}/${limit}`,method:'get'})
                // console.log(temp.posts)
                setPosts([...post ,...temp.posts])
            // setLoadingPosts(false)
            // setLoadMoreCall(false)
        }
        fetchData()
    }
},[page])

console.log(post)
console.log(loadMoreCall)

//function to loadMore posts from the db
async function loadMore(){
    console.log('load more')

    setPage(page+1)
    console.log(page)
}

// const targetElement = document.querySelector('.end');

//     if(targetElement){

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(async(entry) => {
//               if (entry.isIntersecting && !loadMoreCall) {
//                     setLoadMoreCall(true)
//                     loadMore()
//                 }
//             });
//           });
          
//           observer.observe(targetElement);
//     }

    return(
        <React.Fragment>

            <Category/>
                {/* {user ? <Status/> : ''} */}
                {loadingPosts ?
                    <div style={{
                        position:'absolute',
                        top:'50%',
                        left:'50%',
                        transform:'translate(-50% ,-50%)'
                    }}>
                        <img src={require('../../../assets/images/loading.gif')} width='25px' height='25px'/>
                    </div>:
                    <Posts InCommingposts={post}/>
                
                }
                <br/><br/>
                <span className='end'></span>

       
            {user ? <FixFoot/> : ''}
              
        </React.Fragment>
    )
}

export default DefaultView

