import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import UsersFriends from '../../Utils/Friends';

export default function Friends() {
  return (
    <Box sx={{ width: 400 }} >
      <br />
        <List  aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}>
        <ListItem sx={{alignItems: "center", justifyContent: "center", marginRight: "100px"}}>
          <ListItemDecorator >
            <Avatar  size='lg' src="https://pbs.twimg.com/profile_images/911717747628953601/299Tr6M6_400x400.jpg" />
          </ListItemDecorator>
          
          <ListItemContent >
          <Typography sx={{color: "white" }} level="title-sm"> Kirito7231 </Typography>
          <Typography sx={{color: "white" }} level="title-sm"> Norberto Lopez </Typography>
          </ListItemContent>
          <Typography sx={{color: "#2861e7" }}> cambiar </Typography>
        </ListItem>
        </List>

      <br />
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: '0.15rem', color: "#f2f2f2a2" }}
      >        
        Sugerencias para ti
      </Typography>
      <br />

      {
        UsersFriends.map((friend, index) =>{
          return (
            <List  aria-labelledby="ellipsis-list-demo"
            sx={{ '--ListItemDecorator-size': '56px' }} key={index} >
            <ListItem sx={{alignItems: "center", justifyContent: "center", marginRight: "100px"}}>
              <ListItemDecorator >
                <Avatar  size='lg' src={friend.avatar} />
              </ListItemDecorator>
              
              <ListItemContent >
              <Typography sx={{color: "white" }} level="title-sm"> {friend.username}</Typography>
              <Typography sx={{color: "white" }} level="title-sm">{friend.fullName}</Typography>
              </ListItemContent>
              <Typography sx={{color: "#2861e7" }}> seguir </Typography>
            </ListItem>
            </List>
          );
        })
      }
     
    </Box>
  );
}