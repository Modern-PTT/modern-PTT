import styled from "@emotion/styled";
import Burger from "../NavItems/Burger";
import Search from "../NavItems/Search";
import {useState} from 'react';
import { MEDIA_QUERY_XL } from "../../css/Media_query";
import { Link } from "react-router-dom";

// const StyledDiv = styled.div`
//     width: 100%;
//     height: 64px;
//     position: fixed;
//     top: 0;
//     z-index: 1000;
//     .overlay-nav{
//         display: grid;
//         grid-template-columns: auto auto auto;
//         align-items: center;
//         width: 100%;
//         height: 100%;
//         .brand{
//             font-size: 1.5rem;
//             font-weight: bold;
//             width: fit-content;
//             padding-left: 1rem;
//             display: none;
//             a{
//                 background-image: #7F00FF;  /* fallback for old browsers */
//                 background-image: -webkit-linear-gradient(to right, #E100FF, #7F00FF);  /* Chrome 10-25, Safari 5.1-6 */
//                 background-image: linear-gradient(to right, #E100FF, #7F00FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
//                 background-clip: text;
//                 -webkit-text-fill-color: transparent;
//                 -moz-background-clip: text;
//                 -webkit-background-clip: text;
//                 -moz-text-fill-color: transparent;
//                 width: fit-content;
//             }
//         }
//         .searchBar{
//             border-bottom: 1px solid black;
//             width: 30%;
//             display: grid;
//             display: none;
//         }
//         .functions{
//             display: none;
//         }
//     }

// `

const StyledDiv = styled.div`
    z-index: 100;
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 10px;
    position: fixed;
    top: 0;
    height: 72px;
    width: 100%;
    justify-items: center;
    align-items: end;
    .brand{
        display: none;
        font-weight: bold;
        font-size: 24px;
        justify-self: flex-start;
        margin-left: 60px;
    }
    ${MEDIA_QUERY_XL}{
        grid-template-columns: 10fr 1fr ;
        .brand{
            display: initial;
        }
    }
    
`

const NavbarPro = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return ( <StyledDiv >
            <div className="brand">
                <Link to="/home" className="text-gradient">
                ModernPTT
                </Link> 
            </div>
            <Search className="search"/>
            <Burger className="burger"/>
    </StyledDiv> );
}
 
export default NavbarPro;