import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

export const badgeOnlineOrOffline = ( state, spacing ) => {

    return withStyles((theme) => ({
        badge: {
          width:theme.spacing( spacing ),
          height: theme.spacing( spacing ),
          borderRadius:'100px',
          backgroundColor: state ? '#44b700' : '#ccc',
          color: state ? '#44b700' : '#ccc',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '100%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
    }))(Badge);

}


export const avatarSizeChat = ( spacing ) => {

    return makeStyles((theme) => ({
        large: {
          width: theme.spacing( spacing ),
          height: theme.spacing( spacing )
        },
}));

};