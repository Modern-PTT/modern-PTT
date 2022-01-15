import styled from '@emotion/styled';
import Link from '@mui/material/Link';

//RWD
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG, MEDIA_QUERY_XL } from '../../css/Media_query'
//bg
import { BgBubble, colors } from "../Effects/BgBubble";


const StyledDiv = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    justify-items: center;
    align-content: center;
    .overlay{
        display: grid;
        justify-items: center;
        grid-row-gap: 25px;
        .overlay-btns{
            grid-template-columns: auto;
            max-width: 250px;
            margin-top: 30px;
        }
        .title{
            font-size: 9rem;
            font-weight: bold;
        }
        .description{
            font-size: 1rem;
        }

    }
    ${MEDIA_QUERY_MD}{
        .overlay{
            grid-row-gap: 40px;
        .title{
            font-size: 10rem;
        }
        .description{
            font-size: 1.3rem;
        }

    }
    }
    ${MEDIA_QUERY_XL}{
        .overlay{
            grid-row-gap: 40px;
        }
        .title{
            font-size: 10rem;
        }
        .description{
            font-size: 1.5rem;
        }
    }
`

const NotFound = () => {
    return ( 
    <StyledDiv className="not-found">
        <BgBubble/>
        <div className="overlay">
        <div className="title text-gradient">404</div>
        <div className="description">哦不！找不到你要的頁面！</div>
        <div className="overlay-btns">
            <div className="overlay-btn">
                <Link href="/home">回首頁</Link>
                </div>
            {/* <div className="overlay-btn overlay-btn-transparent">
                <Link href="/intro" className="unstyled-link">再看進場動畫</Link>
                </div> */}
        </div>
        </div>
    </StyledDiv> );
}
 
export default NotFound;