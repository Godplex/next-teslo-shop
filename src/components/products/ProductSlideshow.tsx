import { FC } from "react";
import { Slide } from 'react-slideshow-image';
import { Box } from '@mui/material';
import styles from "./ProductSlideshow.module.css";
import 'react-slideshow-image/dist/styles.css';

interface Props {
    images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
    return (
        <Slide easing="ease" duration={7000} indicators>
            {
                images.map((image) => {
                    return (
                        <Box className={styles['each-slide']} key={image}>
                            <Box sx={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }} />
                        </Box>
                    )
                })
            }
        </Slide>
    )
}
