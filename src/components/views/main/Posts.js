import React from 'react'

import '../../../assets/styleSheets/postStyles/postStyles.css'

const posts = [
    {
        userName:'@Samuel_Escobar',
        description:'To Be Continued ... ',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/R_2.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
    {
        userName:'@Sam_Douglas',
        description:'Best Time Ever Anime !!!',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/OIP_14.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
    {
        userName:'@Simon',
        description:'So hungry',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/f4.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
    {
        userName:'@Stephan_Golberk',
        description:'Who can but me this ?',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/f13.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
    {
        userName:'@Simo_Ulrich',
        description:'No other anime like this !!!',
        dateOfPublication:'02 Ferbuary 2023',
        file:<img src={require('../../../assets/images/posts/OIP_9.jpg')}/>,
        likeNumber:'10K',
        commentNumber:'7K',
        profilePicture:<img src={require('../../../assets/images/tempPp.jpg')} />

    },
]

const Posts = () => {

let displayPosts = posts.map(post =>{
    return(
        <div className='post-container'>
                
            <div className='post-head'>
                <div>
                    {post.profilePicture}
                    <div>
                        <span className='bold'>{post.userName}</span>
                        <span className='light'>{post.dateOfPublication}</span>
                    </div>
                </div>
                <span className='options'>...</span>
            </div>

            <div className='post-body'>
                <div className='content'>
                 {post.file}

                </div>
                <div className='description'>
                   <span style={{color:'darkblue'}}> {post.userName}; </span>{post.description}
                </div>
                <div className='actions'>
                    <div>
                       {post.likeNumber} <span className='fas fa-heart' style={{color:'rgba(255,0,0,0.6)'}}></span>
                    </div>

                    <div>
                       {post.commentNumber} <span className='fas fa-comment' style={{color:'rgba(0,0,255,0.6)'}}></span>
                    </div>

                    <div>
                        <span className='fas fa-download' style={{color:'rgba(100,200,100,0.7)'}}></span>
                    </div>

                    <div>
                        <span className='fas fa-share' style={{color:'rgba(0,0,0,0.6)'}}></span>
                    </div>

                </div>
            </div>

            <div className='post-foot'>

             </div>

         </div>
    )
})

    return(
        <React.Fragment>
            {displayPosts}
        </React.Fragment>
    )
}

export default Posts