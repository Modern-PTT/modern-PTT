import * as PIXI from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import SimplexNoise from 'simplex-noise';
import hsl from 'hsl-to-hex';
import debounce from 'debounce';

import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MEDIA_QUERY_MD, MEDIA_QUERY_XL } from '../css/Media_query'

var hue = {
  'hue': '',
  'complimentary1': '',
  'complimentary2': '',
}
var colors = {}




const simplex = new SimplexNoise();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

class Orb {
  // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
  constructor(fill = 0x000000) {
    // bounds = the area an orb is "allowed" to move within
    this.bounds = this.setBounds();
    // initialise the orb's { x, y } values to a random point within it's bounds
    this.x = random(this.bounds['x'].min, this.bounds['x'].max);
    this.y = random(this.bounds['y'].min, this.bounds['y'].max);

    // how large the orb is vs it's original radius (this will modulate over time)
    this.scale = 1;

    // what color is the orb?
    this.fill = fill;

    // the original radius of the orb, set relative to window height
    this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

    // starting points in "time" for the noise/self similar random values
    this.xOff = random(0, 1000);
    this.yOff = random(0, 1000);
    // how quickly the noise/self similar random values step through time
    this.inc = 0.002;

    // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 0.825;

    // 250ms after the last window resize event, recalculate orb positions.
    window.addEventListener(
      'resize',
      debounce(() => {
        this.bounds = this.setBounds();
      }, 250)
    );
  }
  setBounds() {
    // how far from the { x, y } origin can each orb move
    const maxDist =
      window.innerWidth < 1000 ? window.innerWidth / 2 : window.innerWidth / 5;
    // the { x, y } origin for each orb (the bottom right of the screen)
    const originX = window.innerWidth / 1.5;
    const originY =
      window.innerWidth < 1000
        ? window.innerHeight
        : window.innerHeight / 1.5;

    // allow each orb to move x distance away from it's { x, y }origin
    return {
      x: {
        min: originX - maxDist,
        max: originX + maxDist
      },
      y: {
        min: originY - maxDist,
        max: originY + maxDist
      }
    };
  }
  update() {
    // self similar "psuedo-random" or noise values at a given point in "time"
    const xNoise = simplex.noise2D(this.xOff, this.xOff);
    const yNoise = simplex.noise2D(this.yOff, this.yOff);
    const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

    // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
    this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
    this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
    // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    // step through "time"
    this.xOff += this.inc;
    this.yOff += this.inc;
  }
  render() {
    // update the PIXI.Graphics position and scale values
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    // clear anything currently drawn to graphics
    this.graphics.clear();

    // tell graphics to fill any shapes drawn after this with the orb's fill color
    this.graphics.beginFill(this.fill);
    // draw a circle at { 0, 0 } with it's size set by this.radius
    this.graphics.drawCircle(0, 0, this.radius);
    // let graphics know we won't be filling in any more shapes
    this.graphics.endFill();
  }
}
const orbs = [];

class ColorPalette {
  constructor() {
    this.setColors();
    this.setCustomProperties();
    colors = {
      'dark-color': 'hsl(' + hue['hue'] + ', 100%, 9%)',
      'light-color': 'hsl(' + hue['hue'] + ', 95%, 98%)',
      'base': 'hsl(' + hue['hue'] + ', 95%, 50%)',
      'complimentary1': 'hsl(' + hue['complimentary1'] + ', 95%, 50%)',
      'complimentary2': 'hsl(' + hue['complimentary2'] + ', 95%, 50%)',
      'bg-gradient': 'linear-gradient(to bottom, hsl(' + hue['hue'] + ', 95%, 99%),hsl(' + hue['hue'] + ', 95%, 84%))'
    }
  }

  setColors() {
    // pick a random hue somewhere between 220 and 360
    this.hue = ~~random(220, 300);
    this.complimentaryHue1 = this.hue + 30;
    this.complimentaryHue2 = this.hue + 60;
    // define a fixed saturation and lightness
    this.saturation = 95;
    this.lightness = 50;

    // define a base color
    this.baseColor = hsl(this.hue, this.saturation, this.lightness);
    // define a complimentary color, 30 degress away from the base
    this.complimentaryColor1 = hsl(
      this.complimentaryHue1,
      this.saturation,
      this.lightness
    );
    // define a second complimentary color, 60 degrees away from the base
    this.complimentaryColor2 = hsl(
      this.complimentaryHue2,
      this.saturation,
      this.lightness
    );

    // store the color choices in an array so that a random one can be picked later
    this.colorChoices = [
      this.baseColor,
      this.complimentaryColor1,
      this.complimentaryColor2,
    ];
  }

  randomColor() {
    // pick a random color
    return this.colorChoices[~~random(0, this.colorChoices.length)].replace(
      '#',
      '0x'
    );
  }

  setCustomProperties() {
    // set CSS custom properties so that the colors defined here can be used throughout the UI
    // document.documentElement.style.setProperty('--hue', this.hue);
    hue['hue'] = this.hue
    hue['complimentary1'] = this.complimentaryHue1
    hue['complimentary2'] = this.complimentaryHue2
    // document.documentElement.style.setProperty(
    //   '--hue-complimentary1',
    //   this.complimentaryHue1
    // );
    // document.documentElement.style.setProperty(
    //   '--hue-complimentary2',
    //   this.complimentaryHue2
    // );
  }
}
const colorPalette = new ColorPalette();

const StyledDiv = styled.div`
    width: 100vw;
    height:100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors['bg-gradient']};
    .orb-canvas{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
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
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
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
  const target = useRef(null);
  useEffect(() => {
    const app = new PIXI.Application({
      // render to <canvas class="orb-canvas"></canvas>
      view: target.current,
      // auto adjust size to fit the current window
      resizeTo: window,
      // transparent background, we will be creating a gradient background later using CSS
      backgroundAlpha: 0,
    });
    app.stage.filters = [new KawaseBlurFilter(30, 10, true)];
    for (let i = 0; i < 10; i++) {
      // each orb will be black, just for now
      const orb = new Orb(colorPalette.randomColor());
      app.stage.addChild(orb.graphics);
      orbs.push(orb);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      app.ticker.add(() => {
        // update and render each orb, each frame. app.ticker attempts to run at 60fps
        orbs.forEach((orb) => {
          orb.update();
          orb.render();
        });
      });
    } else {
      // perform one update and render per orb, do not animate
      orbs.forEach((orb) => {
        orb.update();
        orb.render();
      });
    }
  }, [])

  return (
    <StyledDiv className="intro">
      <canvas className="orb-canvas" ref={target} />
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