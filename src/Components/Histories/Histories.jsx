import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';

export default function Histories({src}) {
    return(
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
              'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
          },
        }}
      >
        <Avatar size="lg" src={src}
          sx={{ p: 0.5, border: '2px solid', background: 'black' }} />
          
      </Box>
    );
}