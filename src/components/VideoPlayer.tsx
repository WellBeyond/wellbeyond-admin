import React, {useEffect, useState} from 'react';
import "./VideoPlayer.css";
import {BigPlayButton, ControlBar, Player} from 'video-react';

interface VideoPlayerProps {
    id: string;
    src: string;
}


const VideoPlayer: React.FC<VideoPlayerProps> = ({ id,src}) => {

    const [player , setPlayer] = useState<any|null>();
    const handleStateChange = (state:any) => {
        console.log(state);
    };
    useEffect(() => {
        player && player.subscribeToStateChange(handleStateChange);
    }, [player]);

    return (
        <Player id={id} ref={(self:any) => { setPlayer(self) }} playsInline={true} fluid={true}>
            <source src={src} />
            <BigPlayButton position="center" />
            <ControlBar autoHide={false} />
        </Player>
    );
};

export default VideoPlayer;
