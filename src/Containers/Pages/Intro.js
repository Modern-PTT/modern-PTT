import * as PIXI from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import SimplexNoise from 'simplex-noise';
import hsl from 'hsl-to-hex';
import debounce from 'debounce';

import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BgBubble, colors, hue} from '../Effects/BgBubble'
import { MEDIA_QUERY_MD, MEDIA_QUERY_XL } from '../../css/Media_query'

const StyledDiv = styled.div`
    width: 100vw;
    height:100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors['bg-gradient']};
    .overlay{
      width: 90%;
      max-width: 840px;
      max-height: 640px;
      padding: 8rem 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.375);
      box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
      border-radius: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.125);
      .overlay-inner {
        max-width: 36rem;
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        justify-items: center;
      }
      .overlay-title {
        font-size: 1.875rem;
        line-height: 2.75rem;
        font-weight: 700;
        letter-spacing: -0.025em;
        text-align: center;
        span.text-gradient{
          display: block;
          background-image: linear-gradient(
          45deg,
          ${colors['base']} 25%,
          ${colors['complimentary2']}
        );
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -webkit-background-clip: text;
        -moz-text-fill-color: transparent;
        }
      }
      .overlay-description{
        text-align: center;
        /* max-width: 60%; */
        line-height: 1.5;
      }
      .overlay-btns{
        width: 100%;
        max-width: 30rem;
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-items: center;
        grid-row-gap: 10px;
        .overlay-btn{
          width: 80%;
          height: 2.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: ${colors['light-color']};
          background: ${colors['dark-color']};
          border: none;
          border-radius: 0.5rem;
          cursor: not-allowed;
          transition: transform 150ms ease;
          outline-color: hsl(${hue['hue']}, 95%, 50%);
          &:hover{
            transform: scale(1.05);
            cursor: pointer;
          }
          a{
            color: ${colors['light-color']};
            background: ${colors['dark-color']};
            text-decoration: none;
          }
        }
        .overlay-btn-transparent{
          background: transparent;
          color: ${colors['dark-color']};
          border: 2px solid ${colors['dark-color']};
          border-width: 2px;
          outline: none;
        }
      }
    }
    ${MEDIA_QUERY_MD}{
      .overlay{
        padding: 4rem 2rem;
        width: 85%;
        .overlay-inner{
          
          .overlay-btns{
            width: 150%;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1;
            grid-column-gap: 20px;
            .overlay-btn{
              width: 100%;
            }
          }
        }
      }
    }
    ${MEDIA_QUERY_XL}{
      .overlay{
        width: 60%;
        .overlay-inner{
          .overlay-title{
            span.text-gradient{
              display: inline;
              margin-left: 10px;
            }
          }
          .overlay-btns{
            width: 200%;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1;
            grid-column-gap: 20px;
            .overlay-btn{
              width: 100%;
            }
          }
        }
      }
    }
`
const Intro = () => {

  return (
    <StyledDiv className="intro">
      <BgBubble/>
      <div className="overlay">
        <div className="overlay-inner">
          <div className="overlay-title">
            歡迎來到
            <span className="text-gradient">
              Modern PTT
            </span>
          </div>
          <p className="overlay-description">
            全新的PTT 全新的體驗（Beta）
          </p>
          <div className="overlay-btns">
            <button className="overlay-btn overlay-btn-transparent">舊愛是最美</button>

            <button className="overlay-btn">
              <Link to="/home">
                加入新世界
              </Link>
            </button>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}

export default Intro;