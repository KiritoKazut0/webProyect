import * as React from 'react';
import { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { getNewReactions, getInitialReactions, addReactions } from '../../Services/getReaccions';
import useWebSocketComments from '../../hooks/UseSendMsj';
import UsersCommentList from '../UsersUi/Users';
export default function PostPublication({ perfil, username, imgPublication, content, idUser, idPublication }) {

  const [reactionsCount, setReactionsCount] = useState(0);
  const [colorReaction, setColorReaction] = useState(false)
  const { comments,
    comment,
    setComment,
    handleSendComment } = useWebSocketComments(idPublication, idUser);

    console.log({comments, comment});
  const [displayComments, setDisplayComment] = useState(false);
  

  //long polling 
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        console.log('Fetching initial reactions for publication:', idPublication);
        const initialData = await getInitialReactions(idPublication);

        if (isMounted) {
          setReactionsCount(initialData.reaccion);
          console.log('Initial reactions fetched:', initialData.reaccion);
        }

        const longPolling = async () => {
          if (!isMounted) return;

          try {
            console.log('Starting long polling...');
            const newData = await getNewReactions(idUser, idPublication);
            if (isMounted) {
              setReactionsCount(newData.countReacciones);
              console.log('New reactions fetched:', newData.countReacciones
              );
            }
            longPolling();
          } catch (error) {
            console.error('Error with long polling:', error);
            if (isMounted) {
              console.log('Retrying long polling in 5 seconds...');
              setTimeout(longPolling, 5000);
            }
          }
        };

        longPolling();
      } catch (error) {
        console.error('Error fetching initial reactions count:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [idUser, idPublication]);

  const handlerAddReaction = async (IdUser, PublicationId) => {

    try {
      const data = await addReactions(IdUser, PublicationId);
      console.log(data.response.data.value);
      if (data.response.data.value === true) setColorReaction(true)

    } catch (error) {
      console.log("hubo un error al intentar reaccionar", error);
    }

  }

  const handlerShowComments = () => {
    setDisplayComment((prev) => !prev);
  };


  return (
    <>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 400,
          minWidth: 360,
          '--Card-radius': (theme) => theme.vars.radius.xs,
        }}

      >
        <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: '-2px',
                borderRadius: '50%',
                background:
                  'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
              },
            }}
          >
            <Avatar
              size="sm"
              src={perfil}
              sx={{ p: 0.5, border: '2px solid', borderColor: 'white' }}
            />
          </Box>
          <Typography fontWeight="lg">{username}</Typography>
          <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>

          </IconButton>
        </CardContent>
        <CardOverflow>
          <AspectRatio  >
            <img src={imgPublication} alt="" loading="lazy" style={{ objectFit: 'contain' }} />
          </AspectRatio>
        </CardOverflow>
        <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
          <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
            <IconButton variant="plain" color="neutral" size="sm" onClick={() => handlerAddReaction(idUser, idPublication)}  >

              {colorReaction ?
                <FavoriteIcon sx={{ color: "red", fontSize: "27px" }} />
                :
                <FavoriteIcon sx={{ fontSize: "27px" }} />
              }

            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <SendOutlined />
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
            <IconButton variant="plain" color="neutral" size="sm">
              <BookmarkBorderRoundedIcon />
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
          >
            {reactionsCount} Likes
          </Link>
          <Typography fontSize="sm">
            {content}
          </Typography>

          <button style={{ width: "15%", background: "none", border: "none" }} onClick={handlerShowComments}>
            <Link
              component="button"
              underline="none"
              fontSize="sm"
              startDecorator="…"
              sx={{ color: 'text.tertiary', }}
            >
              more
            </Link>

            {displayComments && <UsersCommentList comments={comments} />}


          </button>

          <Link
            component="button"
            underline="none"
            fontSize="10px"
            sx={{ color: 'text.tertiary', my: 0.5 }}
          >
            2 DAYS AGO
          </Link>
        </CardContent>
        <CardContent orientation="horizontal" sx={{ gap: 1 }}>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1, border: "solid green" }}>
            <Face />
          </IconButton>
          <Input
            variant="plain"
            size="sm"
            placeholder="Add a comment…"
            sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton onClick={handleSendComment}>
            <Link disabled underline="none" role="button">
              Post
            </Link>
          </IconButton>
        </CardContent>
      </Card>
    </>
  );
}
