import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import CommentsPublication from '../../Utils/CommentsPublication';
import Input from '@mui/joy/Input';
import Face from '@mui/icons-material/Face';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import CardContent from '@mui/joy/CardContent';

export default function Comments({ username, avatar, content }) {
  return (
    <Box sx={{ width: 320, marginLeft: "30px" }}>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{
          letterSpacing: '0.15rem',
          marginLeft: "20px"
        }}

      >
        Comentarios
      </Typography>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
        <Box sx={{ minWidth: 500, height: 550 }}  >
          <Box sx={{ height: 480 }} >
            {
              CommentsPublication.map((user, index) => {
                return (
                  <ListItem key={index} sx={{ marginTop: "12px" }} >
                    <ListItemDecorator >
                      <Avatar src={user.avatar} />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography level="title-sm" sx={{ color: "#b7b6b6" }}>{user.username}</Typography>
                      <Typography level="body-sm" noWrap sx={{ color: "white" }} width={1000}>
                        {user.content}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                );
              })
            }
          </Box>


          <CardContent orientation="horizontal" sx={{ gap: 1, height: 60,   borderTop: "1px solid #848181" }}>
            <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 , '&:hover': {
            backgroundColor: 'initial'}}}>
              <Face sx={{ color: "white"}} />
            </IconButton>
            <Input
              variant="plain"
              size="sm"
              placeholder="Agregar un comentario"
              sx={{
                flex: 1,
                px: 0,
                '--Input-focusedThickness': '0px',
                background: "#0000002e",
                color: "white",
                '&.Mui-focused': {
                  color: "white", 
                },

               '&:hover': { color: "white" } 
              }}
            />
            <Link disabled underline="none" role="button"  >
              Publicar
            </Link>
          </CardContent>

        </Box>


      </List>
    </Box>
  );
}
