import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"
import BoardList from "../../Components/BoardList";
import ArticleList from "./Board";
import styled from 'styled-components';
// 2. query all or search board


const Category = ({isLogIn}) => {
    return (<>
        <Navbar isLogIn={isLogIn} />
        <div className="contents">
            <DashBoard />
        </div>
        <BoardList/>
    </>);
}

export default Category;