import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import Link from '@mui/material/Link';


import Button from '@mui/material/Button';
// const [showAlert, setShowAlert] = useState(null)
import { useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Row from './Layout/Row';
import Column from './Layout/Column';

//selection
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
const useStyles = makeStyles((theme) => ({
  appBar:{
    boxShadow: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  // insert ===========================
  const [boardInput, setBoardInput] = useState([""])
  const [titleInput, setTitleInput] = useState([""])
  const [ownerInput, setOwnerInput] = useState([""])
  const [time, setTime] = useState(3);
  const time_interval = [
    {time:6,name:"6小時內"},
    {time:12,name:"12小時內"},
    {time:72,name:"3天內"},
    {time:168,name:"一週內"}
  ]

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleBasicSearch = () => {
    var splits_boards = boardInput.split(" ");
    console.log(splits_boards)
    // return 
  }
  // Advance Search
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () =>{
    setOpen(false);
    // QUERY
  }





  // TODO:  Mutation in Search
  //  =================================

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Setting</MenuItem>
      <MenuItem onClick={handleMenuClose} color="red">Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <Tooltip title="發文">  
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 20 new mails" color="inherit">
          <Badge badgeContent={20} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            ModernPTT
          </Typography>
          <div className={classes.search}>

            <InputBase
              placeholder="搜尋看板..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={boardInput}
              onChange={(e) => setBoardInput(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}

            <Button onClick={handleOpen} >進階搜尋</Button>
            <Modal 
              width="500"
              open={open}
              onClose={handleClose}
              display="flex"
              align-items="center"
              justify-content="center"
              // aria-labelledby="modal-modal-title"
              // aria-describedby="modal-modal-description"
            >
                <Card  sx={{position: 'absolute', width: 500 }}>
                    <p>進階搜尋</p>
                    <div padding="20px">
                    <Column>
                      <Row>看板
                        <TextField  
                          fullWidth
                          placeholder="用空白間隔開關鍵字，如 B k"
                          id="board_search" 
                          value={boardInput} 
                          onChange={(e)=>setBoardInput(e.target.value)} 
                          variant="outlined" 
                        />
                      </Row>
                      <Row>
                        作者
                        <TextField  
                          fullWidth
                          // placeholder="用空白間隔開關鍵字，如 B k"
                          id="board_search" 
                          value={ownerInput} 
                          onChange={(e)=>setOwnerInput(e.target.value)} 
                          variant="outlined" 
                        />
                      </Row>
                      <Row>
                        標題
                        <TextField  
                          fullWidth
                          placeholder="用空白間隔開關鍵字，如 B k"
                          id="title_search" 
                          value={titleInput} 
                          onChange={(e)=>setTitleInput(e.target.value)} 
                          variant="outlined" 
                        />
                      </Row>
                      <Row>時間</Row>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                        {/* <FormHelperText>Without label</FormHelperText>  */}
                          <Select
                            value={time}
                            onChange={handleTimeChange}
                            displayEmpty
                          >
                            {time_interval.map((item)=>(
                              <MenuItem value={item.time}>{item.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                    </Column>
                    </div>
                  <div>
                    <Button onClick={handleClose} >取消</Button>
                    <Button onClick={handleSubmit} >送出</Button>
                  </div>
                </Card>


            </Modal>


            <IconButton>
              {/* <Link href="/search/boards"> */}
                <SearchIcon onClick={()=>handleBasicSearch()}/>
              {/* </Link> */}
            </IconButton>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <Tooltip title="發文">  
              <IconButton aria-label="NewPost" color="inherit">
                  {/* <BorderColorIcon /> */}
                 <Link href="NewPost">
                  <ModeEditIcon/>
                 </Link>

              </IconButton>
            </Tooltip>

            <Tooltip title="站內信">
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="通知">
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
    </div>
  );
}
