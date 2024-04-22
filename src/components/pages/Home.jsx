import React, {useEffect, useState} from 'react'
import appwriteService from "../../appwrite/config";
import {Container, PostCard} from '../../components/index'
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/authSlice';

function Home() {
    const [posts, setPosts] = useState([])

    // useEffect(() => {
    //     authServiceObj
    //         .getUserData()
    //         .then((userData) => {
    //             if (userData) {
    //                 dispatch(login({ userData }));
    //                 appServiceObj.getAllPosts([Query.equal("status", "active")]).then((posts) => {
    //                     if (posts) {
    //                         setPosts(posts.documents)
    //                     }
    //                 })
    //             } else {
    //                 dispatch(logout());
    //             }
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //             // console.log("home::posts: ", posts)
    //         });
    // }, [dispatch]);


    const dispatch = useDispatch();
    useEffect(() => {

        authService.getCurrentUser().then(
            userData=>{
                if(userData){//login
                    dispatch(login({ userData }));
                    appwriteService.getPosts().then((posts) => {
                        if (posts) {
                            setPosts(posts.documents)
                        }
                    })
                }else{//no login
                    dispatch(logout())
                }
            }
        )
        // .finally(() => {
        //     setLoading(false);
        // console.log("home::posts: ", posts)
        // });
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
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

export default Home