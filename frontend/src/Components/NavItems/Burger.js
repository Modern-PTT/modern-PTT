import styled from "styled-components";
import { Link } from "@mui/material";


const StyledDiv = styled.div`
grid-column: -1;
right: 10px;
#burger-toggle {
  position: absolute;
  appearance: none;
  opacity: 0;
  &:checked {
    & ~ .menu {
      opacity: 1;
      visibility: visible;

      .menu-nav-link span div,
      img,
      .title p {
        transform: translateY(0);
        transition: 1.2s 0.1s cubic-bezier(0.35, 0, 0.07, 1);
      }

    }

    & ~ .burger-menu {
      .line {
        &::after {
          transform: translateX(0);
        }

        &:nth-child(1) {
          transform: translateY(calc(var(--burger-menu-radius) / 5))
            rotate(45deg);
        }

        &:nth-child(2) {
          transform: scaleX(0);
        }

        &:nth-child(3) {
          transform: translateY(calc(var(--burger-menu-radius) / -5))
            rotate(-45deg);
        }
      }
    }
  }
}

.burger-menu {
  --burger-menu-radius: 4em;
  z-index: 100;
  display: block;
  width: var(--burger-menu-radius);
  height: var(--burger-menu-radius);
  outline: none;
  cursor: pointer;

  .line {
    position: absolute;
    left: 25%;
    width: 50%;
    height: 3px;
    background: hsla(210, 29%, 24%, 0.3);
    border-radius: 10px;
    overflow: hidden;
    transition: 0.5s;

    &:nth-child(1) {
      top: 30%;
    }

    &:nth-child(2) {
      top: 50%;
    }

    &:nth-child(3) {
      top: 70%;
    }

    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #E100FF, #7F00FF);
      transform: translateX(-100%);
      transition: 0.25s;
    }
    &:nth-child(2)::after {
        transition-delay: 0.1s;
      }
    &:nth-child(3)::after {
        transition-delay: 0.2s;
      }
  }
  
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1e23;
  opacity: 0;
  overflow-x: hidden;
  visibility: hidden;
  transition: 0.3s;
  z-index: 10;
  &-nav {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-row-gap: 20px;
    margin: 0;
    padding: 0;
    text-align: center;
    list-style-type: none;

    &-item {
      flex: 1;
    }

    &-link {
      position: relative;
      display: inline-flex;
      font-size: 2rem;
      color: white;
      text-decoration: none;
      width: 100%;
      span {
        overflow: hidden;
        div {
          transform: translateY(102%);
        }
      }

      &::after {
        position: absolute;
        content: "";
        top: 100%;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(to right, #E100FF, #7F00FF);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s;
      }

      &:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }

}
`

const Burger = () => {
    return ( <StyledDiv>
<input type="checkbox" id="burger-toggle"/>
<label htmlFor="burger-toggle" className="burger-menu">
  <div className="line"></div>
  <div className="line"></div>
  <div className="line"></div>
</label>
<div className="menu">
  <div className="menu-inner">
    <ul className="menu-nav">
      <li className="menu-nav-item"><Link className="menu-nav-link" href="/home"><span>
            <div>首頁</div>
          </span></Link></li>
      <li className="menu-nav-item"><Link className="menu-nav-link" href=""><span>
            <div>站內信</div>
          </span></Link></li>
      <li className="menu-nav-item"><Link className="menu-nav-link" href="#"><span>
            <div>我的通知</div>
          </span></Link></li>
      <li className="menu-nav-item"><Link className="menu-nav-link" href="#"><span>
            <div>個人檔案</div>
          </span></Link></li>
      <li className="menu-nav-item"><Link className="menu-nav-link" href="#"><span>
            <div>設定</div>
          </span></Link></li>
    </ul>
  </div>
</div>
    </StyledDiv> );
}
 
export default Burger;

