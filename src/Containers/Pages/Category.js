import Navbar from "../../Components/Navbar"
import DashBoard from "../../Components/DashBoard"
import BoardList from "../../Components/BoardList";
import ArticleList from "./Board";
import styled from 'styled-components';

const Category = () => {
    return (<>
        <Navbar />
        <div className="contents">
            <DashBoard />
        </div>
        <BoardList/>
    </>);
}

export default Category;