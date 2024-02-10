import { useState } from 'react';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeletePostModal from './modals/DeletePostModal';

interface LongMenuProps {
  postId?: string;
}

const options = ['delete'];

export default function LongMenu({ postId }: LongMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const stopEPropagation = (event: any) => {
    event.stopPropagation();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeletePost = () => {
    setIsOpen((open) => !open);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DeletePostModal isOpen={isOpen} postId={postId} setIsOpen={setIsOpen} />
      <div onClick={stopEPropagation}>
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
