import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { useState, useContext } from 'react';


import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Row from '../Layout/Row';
import Column from '../Layout/Column';

import { pttContext } from '../../Containers/App';
import { useNavigate } from "react-router-dom";

import {
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem
} from '@mui/material'

const StyledDiv = styled.div`
    display: grid;
    justify-content: end;
    justify-self: end;
    align-content: flex-end;
    align-items: flex-end;
    .search-box{
        width: fit-content;
        height: fit-content;
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        justify-content: center;
        position: relative;
        transform-origin: right bottom;
    }
    .input-search{
        transform-origin: right center;
        height: 50px;
        width: 50px;
        border-style: none;
        padding: 10px;
        font-size: 18px;
        letter-spacing: 2px;
        outline: none;
        border-radius: 25px;
        transition: all .5s ease-in-out;
        padding-right: 40px;
        color: #333;
        white-space: nowrap;
    }
    .input-search::placeholder{
        color: #333;
        font-size: 18px;
        letter-spacing: 2px;
        font-weight: 300;
    }
    .btn-search{
        width: 50px;
        height: 50px;
        border-style: none;
        font-size: 20px;
        
        font-weight: bold;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        position: absolute;
        right: 0px;
        color: #333;
        background-color:transparent;
        pointer-events: painted;  
        transition: all .5s cubic-bezier(0, 0.110, 0.35, 2);
    }
    .icon-search{
        z-index: 2;
        font-size: 2.5rem;
    }
    .btn-search:focus ~ .input-search{
        width: 300px;
        transform-origin: right center;
        border-radius: 0px;
        background-color: transparent;
        border-bottom:1px solid #333;
        transition: all 500ms cubic-bezier(0, 0.110, 0.35, 1.4);
    }
    .btn-search:focus ~ .advanced{
        opacity: 0;
        transform: scale(0);
    }
    .btn-search:focus{
        top: 0px;
    }
    .input-search:focus ~ .advanced{
        opacity: 0;
        transform: scale(0);
    }
    .input-search:focus{
        width: 300px;
        border-radius: 0px;
        transform-origin: right center;
        background-color: transparent;
        border-bottom:1px solid #333;
        transition: all 500ms cubic-bezier(0, 0.110, 0.35, 1.4);
    }
    .advanced{
        white-space: nowrap;
        transition: .2s;
    }

`


const Search = () => {
    const {
        username,
        setUsername,
        myHashPassword,
        setMyHashPassword,
        isLogIn,
        setIsLogIn,

        simpleBoardSearch, setSimpleBoardSearch,
        advBoardSearch, setAdvBoardSearch,
        advTitleSearch, setAdvTitleSearch,
        timeSearch, setTimeSearch,
        ownerSearch, setOwnerSearch,

    } = useContext(pttContext)

    const navigate = useNavigate();
    // insert ===========================
    const [splits_boards, setSplits_boards] = useState([""])
    const [boardInput, setBoardInput] = useState("");
    const [titleInput, setTitleInput] = useState("");
    const [timeInput, setTimeInput] = useState(168);
    const [ownerInput, setOwnerInput] = useState("");

    const time_interval = [
        { time: 6, name: "6小時內" },
        { time: 12, name: "12小時內" },
        { time: 72, name: "3天內" },
        { time: 168, name: "一週內" }
    ]


    const handleBasicSearch = () => {
        var splits_boards2 = splits_boards.split(" ");
        setSimpleBoardSearch(splits_boards2);
        navigate("/search/boards")
    }

    const handleAdvanceSearch = () => {
        var splits_boards = boardInput.split(" ");
        var splits_title = titleInput.split(" ");

        setAdvBoardSearch(splits_boards);
        setAdvTitleSearch(splits_title);
        setOwnerSearch(ownerInput);
        setTimeSearch(timeInput);
        navigate("/search/Articles")
    }
    // Advance Search
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //check if search open
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (<StyledDiv>
        <div className="search-box">
            <button className="btn-search" onClick={() => { setIsSearchOpen(!isSearchOpen) }}><SearchIcon className='icon-search' onClick={handleBasicSearch}/></button>
            <Button onClick={handleOpen} className={`advanced ${isSearchOpen ? 'visible' : ''}`}>進階搜尋</Button>
            <Modal className="card-container-modal" open={open}
                onClose={handleClose}>
                <Card sx={{ width: 500 }} className='card'>
                    <p>進階搜尋</p>
                    <Row className='row'>
                        <div className="row-left">
                            看板
                        </div>
                        <TextField
                            fullWidth
                            placeholder="用空白間隔開關鍵字，如 B k"
                            id="board_search"
                            value={boardInput}
                            onChange={(e) => setBoardInput(e.target.value)}
                            variant="outlined"
                        />
                    </Row>
                    <Row className='row'>
                        <div className="row-left">
                            作者
                        </div>
                        <TextField
                            fullWidth
                            // placeholder="用空白間隔開關鍵字，如 B k"
                            id="board_search"
                            value={ownerInput}
                            onChange={(e) => setOwnerInput(e.target.value)}
                            variant="outlined"
                        />
                    </Row>
                    <Row className='row'>
                        <div className="row-left">
                            標題
                        </div>
                        <TextField
                            fullWidth
                            placeholder="用空白間隔開關鍵字，如 B k"
                            id="title_search"
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                            variant="outlined"
                        />
                    </Row>
                    <Row className='row'>時間
                        <FormControl sx={{ m: 1, minWidth: 120 }} id='form'>
                            <Select
                                value={timeInput}
                                onChange={(e)=>setTimeInput(e.target.value)}
                                displayEmpty
                                id="select_form"
                                sx={{ padding: 1 }}
                            >
                                {time_interval.map((item, index) => (
                                    <MenuItem key={index} value={item.time} className="menu">{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Row>
                    <div>
                        <Button onClick={handleClose} >取消</Button>
                        <Button onClick={()=>{handleAdvanceSearch(); handleClose()}} >送出</Button>
                    </div>
                </Card>
            </Modal>
            <input type="text" value={splits_boards} onChange={(e) => {setSplits_boards(e.target.value);

              }}className="input-search" placeholder="搜尋看板..." />
        </div>
    </StyledDiv>

    );
}

export default Search;