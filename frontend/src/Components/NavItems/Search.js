import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { useState } from 'react';


import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Row from '../Layout/Row';
import Column from '../Layout/Column';

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
    .search-box{
        width: fit-content;
        height: fit-content;
        position: relative;
        transform-origin: right center;
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
        top: 10px;
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
    .btn-search:focus{
        top: 0px;
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
    }

`


const Search = () => {
    const [boardInput, setBoardInput] = useState([""])
    const [titleInput, setTitleInput] = useState([""])
    const [ownerInput, setOwnerInput] = useState([""])
    const [time, setTime] = useState(3);
    const time_interval = [
        { time: 6, name: "6小時內" },
        { time: 12, name: "12小時內" },
        { time: 72, name: "3天內" },
        { time: 168, name: "一週內" }
    ]
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = () => {
        setOpen(false);
        // QUERY
    }

    return (<StyledDiv>
        <div className="search-box">
            <button className="btn-search" onClick={() => { setIsSearchOpen(!isSearchOpen) }}><SearchIcon className='icon-search' /></button>
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
                            value={time}
                            onChange={handleTimeChange}
                            displayEmpty
                            id="select_form"
                            sx={{padding: 1}}
                        >
                            {time_interval.map((item) => (
                                <MenuItem value={item.time} className="menu">{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </Row>
                    <div>
                        <Button onClick={handleClose} >取消</Button>
                        <Button onClick={handleSubmit} >送出</Button>
                    </div>
                </Card>
            </Modal>
            <input type="text" className="input-search" placeholder="找些什麼..." />
        </div>
    </StyledDiv>

    );
}

export default Search;