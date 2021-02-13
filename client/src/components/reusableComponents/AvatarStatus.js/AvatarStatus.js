import { Avatar } from '@material-ui/core';
import React from 'react';
import { avatarSizeChat, badgeOnlineOrOffline } from '../Chat/styles';

const AvatarStatus = ( props ) => {

    const { status, spacingBadge, spacingAvatar, souceProfilePhoto, vertical, horizontal } = props;

    const StyledBadge = badgeOnlineOrOffline( status, spacingBadge );

    const avatarSize = avatarSizeChat( spacingAvatar );

    return (
        <StyledBadge
        overlap="circle"
        anchorOrigin={{
        vertical: vertical,
        horizontal: horizontal,
        }}
        variant="dot"
        >
            <Avatar
            className={ `${ avatarSize().large } bg-white` }
            src={ souceProfilePhoto }
            />
        </StyledBadge>
    );
};

export default AvatarStatus;
