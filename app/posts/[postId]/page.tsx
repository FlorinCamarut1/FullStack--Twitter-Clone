'use client';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

import Header from '@/components/Header';
import PostItem from '@/components/posts/PostItem';
import usePost from '@/hooks/usePost';
import Form from '@/components/Form';

const PostPage = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId;
  const router = useRouter();

  const { data: fetchedPost, isLoading } = usePost(postId);

  if (isLoading || !fetchedPost)
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    );

  return (
    <>
      <Header label='Tweet' showBackArrow />
      <PostItem data={fetchedPost[0]} />
      <Form
        postId={postId as string}
        isComment
        placeholder='Tweet your reply'
      />
    </>
  );
};

export default PostPage;
