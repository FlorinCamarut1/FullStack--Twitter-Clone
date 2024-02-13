import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ConfirmDeletion from './posts/ConfirmDeletion';

import { useState } from 'react';

interface LongMenuProps {
  postId?: string;
  options: string[];
  isComment?: boolean;
  commentId?: string;
  commentPostId?: string;
}

export default function LongMenu({
  postId,
  options,
  isComment,
  commentId,
  commentPostId,
}: LongMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isOpen, setIsOpen] = useState(false);

  const stopEPropagation = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeletePost = () => {
    setIsOpen((open) => !open);
    setAnchorEl(null);
  };
  const handleClose = (event: any) => {
    setAnchorEl(null);
  };

  return (
    <>
      <div onClick={stopEPropagation}>
        <ConfirmDeletion
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title='Are you sure you want to delete?'
          postId={postId}
          commentId={commentId}
          isComment={isComment}
          commentPostId={commentPostId}
        />

        <IconButton
          aria-label='more'
          id='long-button'
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MoreVertIcon className='text-white' />
        </IconButton>
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: { backgroundColor: 'transparent' },
          }}
        >
          {options?.map((option) => (
            <MenuItem
              style={{
                backgroundColor: 'black',
                color: 'white',
                border: 'solid',
                borderWidth: '1px',
                borderColor: 'grey',
                borderRadius: '10px',
              }}
              key={option}
              selected={option === 'delete'}
              onClick={handleDeletePost}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}
