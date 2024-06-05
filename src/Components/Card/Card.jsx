import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ModalComments from '../ModalComment/ModalComment';


export default function InstagramPost({ username, imgPublication, content, imgPerfil }) {

    const [activeModalComments, setActiveModalComments] = React.useState(false);

    const handlerShowComments = () => { setActiveModalComments(true) };
  
    const handleClose = () => { setActiveModalComments(false) };
  

  return (
    <Card variant="outlined" sx={{
      minWidth: 400, border: "none", backgroundColor: "black",
      minHeight: 400,
      '--Card-radius': (theme) => theme.vars.radius.xs
    }}>
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            position: 'relative', '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: '-2px',
              borderRadius: '50%',
              background:
                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 85%,#bc1888 100%)',
            },

          }}
        >
          <Avatar size="sm" src={imgPerfil}
            sx={{ p: 0.5, background: "black" }} />

        </Box>
        <Typography fontWeight="lg" sx={{ color: "white" }}>{username}</Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{
          ml: 'auto', '&:hover': {
            backgroundColor: 'initial',
          }
        }}>
          <MoreHoriz sx={{ color: "white" }} />
        </IconButton>
      </CardContent >


      <AspectRatio minHeight={590} >
        <img src={imgPublication}
          style={{ objectFit: "cover", background: "black", border: " 1px solid #7e7e7e" }} loading="lazy" />
      </AspectRatio>


      <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
        <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
          <IconButton variant="plain" color="neutral" size="sm" sx={{
            '&:hover': {
              backgroundColor: 'initial',
            },
          }}>
            <FavoriteBorder sx={{ color: "white" }} />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm"
            onClick={handlerShowComments} sx={{
              '&:hover': {
                backgroundColor: 'initial',
              },
            }} >
            <ModeCommentOutlined sx={{ color: "white" }} />
          </IconButton>

            {/* aqui se debe de pasar los comentarios en modalComments */}
          {activeModalComments && (
            <ModalComments
              imgPublication={imgPublication}
              open={activeModalComments}
              onClose={handleClose}

            />
          )}


          <IconButton variant="plain" color="neutral" size="sm" sx={{
            '&:hover': {
              backgroundColor: 'initial',
            },
          }}>
            <SendOutlined sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: '50%',
                width: `max(${6 - index}px, 3px)`,
                height: `max(${6 - index}px, 3px)`,
                bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
              }}
            />
          ))}
        </Box>
        <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
          <IconButton variant="plain" color="neutral" size="sm" sx={{
            '&:hover': {
              backgroundColor: 'initial',
            },
          }} >
            <BookmarkBorderRoundedIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </CardContent>
      <CardContent>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
          sx={{ color: "white" }}
        >
          8.1M Likes
        </Link>
        <Typography fontSize="sm" sx={{ color: "white" }}>

          {content}
        </Typography>
        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: '#b6adad', my: 0.5, }}
        >
          2 DAYS AGO
        </Link>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
      </CardContent>
    </Card>
  );
}
