import { createGlobalStyle } from 'styled-components';
import { colors, hue } from '../Containers/Effects/BgBubble';
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG, MEDIA_QUERY_XL } from './Media_query'

const GlobalStyle = createGlobalStyle`

    .card-container-modal{
        width: 100%;
        height: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
        .card{
          padding: 20px;
          display: grid;
          grid-row-gap: 20px;
          justify-content: center;
          *{
            text-align: center;
          }
          .row{
            display: grid;
            grid-template-columns: auto auto;
            align-items: center;
            grid-column-gap: 20px;
            #board_search, #title_search, #form, #select_form{
              padding: 5px;
            }
          }
        }
    }
    .font-color-link{
      color: #1976d2;
    }
    .bordered{
      border: solid 1px rgba(0,0,0,0.1);
      border-radius: 10px;
    }
    .background-gradient{
      background: ${colors['bg-gradient']};
    }
    .background-glass{
      background: rgba(255, 255, 255, 0.375);
    }
    .page-container{
      padding-top: 100px;
    }
    .overlay{
        max-width: 840px;
            max-height: 640px;
            padding: 8rem 2rem;
            background: rgba(255, 255, 255, 0.375);
            border-radius: 2rem;
    }
  .overlay-title{
      font-size: 1.875rem;
        line-height: 2.75rem;
        font-weight: 700;
        letter-spacing: -0.025em;
        text-align: center;
  }
  .text-gradient{
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
  .overlay-btns{
    width: 100%;
        max-width: 30rem;
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-items: center;
        grid-row-gap: 10px;
  }
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
          overflow: hidden;
          &:hover{
            transform: scale(1.05);
            cursor: pointer;
          }
          a{
            color: ${colors['light-color']};
            background: ${colors['dark-color']};
            text-decoration: none;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        }
        .overlay-btn-transparent{
          background: transparent;
          color: ${colors['dark-color']};
          border: 2px solid ${colors['dark-color']};
          border-width: 2px;
          outline: none;
          a{
            background: transparent;
            color: ${colors['dark-color']};
          }
        }
        ${MEDIA_QUERY_MD}{
      .overlay{
        padding: 4rem 2rem;
        width: 85%;
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
    ${MEDIA_QUERY_XL}{
      .overlay{
        width: 60%;
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
`

export default GlobalStyle;