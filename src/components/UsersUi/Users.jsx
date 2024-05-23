// components/UsersCommentList.js
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

export default function UsersCommentList({ comments }) {
    console.log(comments);
    return (
        <Box sx={{ width: 320, textAlign: "start" }}>
            <Typography
                id="ellipsis-list-demo"
                level="body-xs"
                textTransform="uppercase"
                sx={{ letterSpacing: '0.15rem' }}
            >
                Comentarios
            </Typography>
            <List
                aria-labelledby="ellipsis-list-demo"
                sx={{ '--ListItemDecorator-size': '56px' }}
            >
                {comments.map((comment, index) => (
                    <ListItem key={index}>
                        <ListItemDecorator>
                            <Avatar src="/static/images/avatar/1.jpg" />
                        </ListItemDecorator>
                        <ListItemContent>
                            <Typography level="title-sm">{comment.user.username}</Typography>
                            <Typography level="body-sm" noWrap>
                                {comment.content}
                            </Typography>
                        </ListItemContent>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
