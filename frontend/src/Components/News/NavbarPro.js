import styled from "@emotion/styled";
import Burger from "../NavItems/Burger";
import Search from "../NavItems/Search";
import {useState} from 'react';
import { MEDIA_QUERY_XL } from "../../css/Media_query";
import { Link } from "react-router-dom";


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