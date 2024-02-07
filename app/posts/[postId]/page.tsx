'use client';

import { ClipLoader } from 'react-spinners';

import Header from '@/components/Header';
import PostItem from '@/components/posts/PostItem';
import usePost from '@/hooks/usePost';
import Form from '@/components/Form';
import CommentFeed from '@/components/posts/CommentFeed';
import { Toaster } from 'react-hot-toast';

const PostPage = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId;

  const { data: fetchedPost, isLoading } = usePost(postId);

  if (isLoading || !fetchedPost)
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    );

  return (
    <>
      <Toaster />
      <Header label='Tweet' showBackArrow />
      <PostItem data={fetchedPost[0]} />
      <Form
        postId={postId as string}
        isComment
        placeholder='Tweet your reply'
      />
      <CommentFeed comments={fetchedPost[0]?.comments} />
    </>
  );
};

export default PostPage;
