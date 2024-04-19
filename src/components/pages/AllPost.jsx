import React from "react";
import Container from "../Container/Container";
import PostCard from '../PostCard'
import DatabaseService from '../../appwrite/database'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    DatabaseService.getPost([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts