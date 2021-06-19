import { useState } from "react";

import "../css/setDate.css";

const SetDate = ({ handleClose, handleSet }) => {
  const [expireTime, setExpireTime] = useState("1 day");

  const handleChangeTime = (e) => {
    setExpireTime(e.target.value);
  };

  const handleSendData = () => {
    handleSet(expireTime);
  };
  return (
    <section id="setDate">
      <button id="closeDate" onClick={handleClose}>
        <svg
          height="30px"
          viewBox="0 0 144 145"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="17.9061"
            y="0.728638"
            width="178"
            height="25"
            rx="12.5"
            transform="rotate(45 17.9061 0.728638)"
            fill="white"
          />
          <rect
            x="0.228638"
            y="126.594"
            width="178"
            height="25"
            rx="12.5"
            transform="rotate(-45 0.228638 126.594)"
            fill="white"
          />
        </svg>
      </button>
      <section id="setTime">
        <h3>Set expire date</h3>
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d)">
            <circle cx="200" cy="196" r="183" fill="#5FEDA9" />
          </g>
          <path
            d="M254.071 134.308V75.0128H144.339V134.308C144.339 156.211 157.001 175.125 175.343 184.033C179.487 186.045 182.178 190.208 182.178 194.846V195.565C182.178 200.203 179.487 204.365 175.343 206.378C157.001 215.286 144.339 234.199 144.339 256.103V315.397H254.071V256.102C254.071 234.199 241.41 215.285 223.067 206.377C218.924 204.365 216.232 200.202 216.232 195.564V194.845C216.232 190.207 218.924 186.045 223.067 184.032C241.41 175.125 254.071 156.212 254.071 134.308Z"
            fill="#FFEACF"
          />
          <path
            d="M246.058 259.107C244.398 259.107 243.053 257.762 243.053 256.102C243.053 239.231 233.319 223.604 218.254 216.288C216.761 215.562 216.138 213.765 216.863 212.272C217.59 210.78 219.386 210.158 220.879 210.882C238 219.196 249.063 236.946 249.063 256.101C249.063 257.762 247.718 259.107 246.058 259.107Z"
            fill="#FCF9DE"
          />
          <path
            d="M203.388 206.377C207.531 204.364 210.223 200.202 210.223 195.564V194.845C210.223 190.207 207.531 186.045 203.388 184.032C185.045 175.124 172.384 156.211 172.384 134.307V75.0128H144.339V134.308C144.339 156.211 157.001 175.125 175.343 184.033C179.487 186.046 182.178 190.208 182.178 194.846V195.565C182.178 200.203 179.487 204.365 175.343 206.378C157.001 215.286 144.339 234.199 144.339 256.103V315.397H172.384V256.102C172.384 234.199 185.045 215.285 203.388 206.377Z"
            fill="#FFD59A"
          />
          <path
            d="M158.649 154.823C166.111 169.707 181.415 179.943 199.053 179.943H199.356C216.994 179.943 232.298 169.707 239.76 154.823H158.649Z"
            fill="#F9BB32"
          />
          <path
            d="M244.611 299.817V292.351C244.611 267.188 224.31 246.716 199.356 246.716H199.053C174.1 246.716 153.799 267.188 153.799 292.351V299.817H244.611Z"
            fill="#F9BB32"
          />
          <path
            d="M203.212 170.403H195.199V250.531H203.212V170.403Z"
            fill="#F9BB32"
          />
          <path
            d="M172.384 256.102C172.384 255.903 172.393 255.706 172.395 255.505C161.133 263.815 153.8 277.232 153.8 292.35V299.816H172.385V256.102H172.384Z"
            fill="#DB9C2E"
          />
          <path
            d="M195.199 211.285C197.718 209.459 200.398 207.845 203.212 206.466V183.944C200.398 182.565 197.718 180.952 195.199 179.125V211.285Z"
            fill="#DB9C2E"
          />
          <path
            d="M196.232 179.848C187.354 173.722 180.361 165.027 176.302 154.823H158.649C165.71 168.908 179.794 178.824 196.232 179.848Z"
            fill="#DB9C2E"
          />
          <path
            d="M261.615 96.1577H136.795C133.647 96.1577 131.096 93.6056 131.096 90.4586V80.8712C131.096 77.7232 133.648 75.1721 136.795 75.1721H261.615C264.763 75.1721 267.314 77.7242 267.314 80.8712V90.4586C267.314 93.6056 264.762 96.1577 261.615 96.1577Z"
            fill="#BF6C0D"
          />
          <path
            d="M136.795 294.252H261.615C264.763 294.252 267.314 296.804 267.314 299.951V309.539C267.314 312.687 264.762 315.238 261.615 315.238H136.795C133.647 315.238 131.096 312.686 131.096 309.539V299.951C131.096 296.804 133.648 294.252 136.795 294.252Z"
            fill="#BF6C0D"
          />
          <path
            d="M186.295 119.225C191.274 119.225 195.31 115.189 195.31 110.21C195.31 105.232 191.274 101.196 186.295 101.196C181.317 101.196 177.281 105.232 177.281 110.21C177.281 115.189 181.317 119.225 186.295 119.225Z"
            fill="#FFD59A"
          />
          <path
            d="M186.295 291.334C191.274 291.334 195.31 287.298 195.31 282.319C195.31 277.341 191.274 273.305 186.295 273.305C181.317 273.305 177.281 277.341 177.281 282.319C177.281 287.298 181.317 291.334 186.295 291.334Z"
            fill="#DB9C2E"
          />
          <path
            d="M159.141 90.4586V80.8722C159.141 77.7232 161.693 75.1721 164.84 75.1721H136.795C133.647 75.1721 131.096 77.7242 131.096 80.8722V90.4586C131.096 93.6066 133.648 96.1577 136.795 96.1577H164.84C161.693 96.1577 159.141 93.6056 159.141 90.4586Z"
            fill="#A56021"
          />
          <path
            d="M159.141 309.538V299.951C159.141 296.803 161.693 294.252 164.84 294.252H136.795C133.647 294.252 131.096 296.804 131.096 299.951V309.538C131.096 312.687 133.648 315.237 136.795 315.237H164.84C161.693 315.238 159.141 312.687 159.141 309.538Z"
            fill="#A56021"
          />
          <defs>
            <filter
              id="filter0_d"
              x="0"
              y="0"
              width="400"
              height="400"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feMorphology
                radius="4"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="6.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <select value={expireTime} onChange={handleChangeTime}>
          <option>1 day</option>
          <option>1 week</option>
          <option>1 month</option>
        </select>
        <br />
        <button class="set" onClick={handleSendData}>
          SUMBIT
        </button>
      </section>
    </section>
  );
};

export default SetDate;
