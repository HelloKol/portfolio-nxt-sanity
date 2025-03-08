import React from "react";
import Container from "../Container";
import { Marquee } from "@/components/Marquee";
import Section from "../Section";

const smallSvgClassName = "h-[60px] w-[60px] lg:h-[80px] lg:w-[80px]";
const lagrgeSvgClassName = "h-[150px] w-[150px] md:h-[150px] md:w-[150px]";

const Logos = {
  nextjs: () => (
    <svg
      className={"h-[20px] items-center"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 394 79"
    >
      <path d="M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z"></path>
      <path d="M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z"></path>
      <path d="M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z"></path>
      <path d="M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z"></path>
      <path
        clipRule="evenodd"
        d="M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z"
        fillRule="evenodd"
      ></path>
      <path d="M333.607 78.8546C332.61 78.8546 331.762 78.5093 331.052 77.8186C330.342 77.1279 329.991 76.2917 330 75.3011C329.991 74.3377 330.342 73.5106 331.052 72.8199C331.762 72.1292 332.61 71.7838 333.607 71.7838C334.566 71.7838 335.405 72.1292 336.115 72.8199C336.835 73.5106 337.194 74.3377 337.204 75.3011C337.194 75.9554 337.028 76.5552 336.696 77.0914C336.355 77.6368 335.922 78.064 335.377 78.373C334.842 78.6911 334.252 78.8546 333.607 78.8546Z"></path>
      <path d="M356.84 45.4453H362.872V68.6846C362.863 70.8204 362.401 72.6472 361.498 74.1832C360.585 75.7191 359.321 76.8914 357.698 77.7185C356.084 78.5364 354.193 78.9546 352.044 78.9546C350.079 78.9546 348.318 78.6001 346.75 77.9094C345.182 77.2187 343.937 76.1826 343.024 74.8193C342.101 73.456 341.649 71.7565 341.649 69.7207H347.691C347.7 70.6114 347.903 71.3838 348.29 72.0291C348.677 72.6744 349.212 73.1651 349.895 73.5105C350.586 73.8559 351.38 74.0286 352.274 74.0286C353.243 74.0286 354.073 73.8286 354.746 73.4196C355.419 73.0197 355.936 72.4199 356.296 71.6201C356.646 70.8295 356.831 69.8479 356.84 68.6846V45.4453Z"></path>
      <path d="M387.691 54.5338C387.544 53.1251 386.898 52.0254 385.773 51.2438C384.638 50.4531 383.172 50.0623 381.373 50.0623C380.11 50.0623 379.022 50.2532 378.118 50.6258C377.214 51.0075 376.513 51.5164 376.033 52.1617C375.554 52.807 375.314 53.5432 375.295 54.3703C375.295 55.061 375.461 55.6608 375.784 56.1607C376.107 56.6696 376.54 57.0968 377.103 57.4422C377.656 57.7966 378.274 58.0874 378.948 58.3237C379.63 58.56 380.313 58.76 380.995 58.9236L384.14 59.6961C385.404 59.9869 386.631 60.3778 387.802 60.8776C388.973 61.3684 390.034 61.9955 390.965 62.7498C391.897 63.5042 392.635 64.413 393.179 65.4764C393.723 66.5397 394 67.7848 394 69.2208C394 71.1566 393.502 72.8562 392.496 74.3285C391.491 75.7917 390.043 76.9369 388.143 77.764C386.252 78.582 383.965 79 381.272 79C378.671 79 376.402 78.6002 374.493 77.8004C372.575 77.0097 371.08 75.8463 370.001 74.3194C368.922 72.7926 368.341 70.9294 368.258 68.7391H374.235C374.318 69.8842 374.687 70.8386 375.314 71.6111C375.95 72.3745 376.78 72.938 377.795 73.3197C378.819 73.6923 379.962 73.8832 381.226 73.8832C382.545 73.8832 383.707 73.6832 384.712 73.2924C385.708 72.9016 386.492 72.3564 387.055 71.6475C387.627 70.9476 387.913 70.1206 387.922 69.1754C387.913 68.312 387.654 67.5939 387.156 67.0304C386.649 66.467 385.948 65.9944 385.053 65.6127C384.15 65.231 383.098 64.8856 381.899 64.5857L378.081 63.6223C375.323 62.9225 373.137 61.8592 371.541 60.4323C369.937 59.0054 369.143 57.115 369.143 54.7429C369.143 52.798 369.678 51.0894 370.758 49.6261C371.827 48.1629 373.294 47.0268 375.148 46.2179C377.011 45.4 379.114 45 381.456 45C383.836 45 385.92 45.4 387.719 46.2179C389.517 47.0268 390.929 48.1538 391.952 49.5897C392.976 51.0257 393.511 52.6707 393.539 54.5338H387.691Z"></path>
    </svg>
  ),
  tailwindcss: () => (
    <svg
      viewBox="0 -224 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      fill="#000000"
      className={lagrgeSvgClassName}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#CCCCCC"
        stroke-width="8.192"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <defs>
          <linearGradient
            x1="-2.77777778%"
            y1="32%"
            x2="100%"
            y2="67.5555556%"
            id="linearGradient-1"
          >
            <stop stop-color="#2298BD" offset="0%"></stop>
            <stop stop-color="#0ED7B5" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g>
          <path
            d="M52.8666139,-1.0658141e-14 C38.7688502,-1.0658141e-14 29.9577479,7.04888185 26.4333069,21.1466456 C31.7199683,14.0977637 37.88774,11.454433 44.9366218,13.2166535 C48.9584005,14.2220981 51.8329737,17.1397478 55.0147606,20.3695063 C60.1980384,25.6307134 66.1970285,31.7199683 79.2999208,31.7199683 C93.3976845,31.7199683 102.208787,24.6710865 105.733228,10.5733228 C100.446566,17.6222046 94.2787948,20.2655353 87.2299129,18.5033149 C83.2081342,17.4978702 80.333561,14.5802205 77.1517741,11.350462 C71.9684963,6.08925491 65.9695062,-1.0658141e-14 52.8666139,-1.0658141e-14 Z M26.4333069,31.7199683 C12.3355432,31.7199683 3.52444093,38.7688502 0,52.8666139 C5.28666139,45.817732 11.454433,43.1744013 18.5033149,44.9366218 C22.5250936,45.9420665 25.3996667,48.8597162 28.5814537,52.0894747 C33.7647315,57.3506818 39.7637215,63.4399367 52.8666139,63.4399367 C66.9643776,63.4399367 75.7754799,56.3910548 79.2999208,42.2932911 C74.0132594,49.342173 67.8454878,51.9855037 60.796606,50.2232832 C56.7748273,49.2178385 53.9002541,46.3001888 50.7184671,43.0704303 C45.5351894,37.8092232 39.5361993,31.7199683 26.4333069,31.7199683 Z"
            fill="url(#linearGradient-1)"
          ></path>
          <path
            d="M158.59201,26.7309264 L149.365806,26.7309264 L149.365806,44.5880938 C149.365806,49.350005 152.490811,49.2756002 158.59201,48.9779807 L158.59201,56.1952525 C146.240802,57.6833498 141.330081,54.2607261 141.330081,44.5880938 L141.330081,26.7309264 L134.484834,26.7309264 L134.484834,18.9928205 L141.330081,18.9928205 L141.330081,8.9990725 L149.365806,6.61811685 L149.365806,18.9928205 L158.59201,18.9928205 L158.59201,26.7309264 Z M193.762014,18.9928205 L201.797739,18.9928205 L201.797739,56.1952525 L193.762014,56.1952525 L193.762014,50.8381023 C190.934629,54.7815601 186.544742,57.1625158 180.741163,57.1625158 C170.622101,57.1625158 162.214352,48.6059564 162.214352,37.5940365 C162.214352,26.5077118 170.622101,18.0255573 180.741163,18.0255573 C186.544742,18.0255573 190.934629,20.406513 193.762014,24.2755659 L193.762014,18.9928205 Z M182.006045,49.4988148 C188.702483,49.4988148 193.762014,44.5136889 193.762014,37.5940365 C193.762014,30.6743842 188.702483,25.6892583 182.006045,25.6892583 C175.309608,25.6892583 170.250077,30.6743842 170.250077,37.5940365 C170.250077,44.5136889 175.309608,49.4988148 182.006045,49.4988148 Z M215.190615,13.4124557 C212.36323,13.4124557 210.056679,11.0315001 210.056679,8.27852013 C210.056679,5.4511353 212.36323,3.14458451 215.190615,3.14458451 C218.018,3.14458451 220.32455,5.4511353 220.32455,8.27852013 C220.32455,11.0315001 218.018,13.4124557 215.190615,13.4124557 Z M211.172752,56.1952525 L211.172752,18.9928205 L219.208477,18.9928205 L219.208477,56.1952525 L211.172752,56.1952525 Z M228.509085,56.1952525 L228.509085,1.87970183 L236.544811,1.87970183 L236.544811,56.1952525 L228.509085,56.1952525 Z M288.70262,18.9928205 L297.184775,18.9928205 L285.503211,56.1952525 L277.616296,56.1952525 L269.87819,31.1208134 L262.065679,56.1952525 L254.178764,56.1952525 L242.4972,18.9928205 L250.979354,18.9928205 L258.196626,44.6624986 L266.009137,18.9928205 L273.672838,18.9928205 L281.410944,44.6624986 L288.70262,18.9928205 Z M307.155027,13.4124557 C304.327642,13.4124557 302.021091,11.0315001 302.021091,8.27852013 C302.021091,5.4511353 304.327642,3.14458451 307.155027,3.14458451 C309.982411,3.14458451 312.288962,5.4511353 312.288962,8.27852013 C312.288962,11.0315001 309.982411,13.4124557 307.155027,13.4124557 Z M303.137164,56.1952525 L303.137164,18.9928205 L311.172889,18.9928205 L311.172889,56.1952525 L303.137164,56.1952525 Z M340.041977,18.0255573 C348.375321,18.0255573 354.32771,23.680327 354.32771,33.3529593 L354.32771,56.1952525 L346.291985,56.1952525 L346.291985,34.1714128 C346.291985,28.5166431 343.018171,25.5404486 337.95864,25.5404486 C332.675895,25.5404486 328.509223,28.6654529 328.509223,36.254749 L328.509223,56.1952525 L320.473497,56.1952525 L320.473497,18.9928205 L328.509223,18.9928205 L328.509223,23.7547318 C330.964583,19.8856789 334.982446,18.0255573 340.041977,18.0255573 Z M392.423001,4.11184775 L400.458726,4.11184775 L400.458726,56.1952525 L392.423001,56.1952525 L392.423001,50.8381023 C389.595616,54.7815601 385.205729,57.1625158 379.40215,57.1625158 C369.283088,57.1625158 360.875338,48.6059564 360.875338,37.5940365 C360.875338,26.5077118 369.283088,18.0255573 379.40215,18.0255573 C385.205729,18.0255573 389.595616,20.406513 392.423001,24.2755659 L392.423001,4.11184775 Z M380.667032,49.4988148 C387.36347,49.4988148 392.423001,44.5136889 392.423001,37.5940365 C392.423001,30.6743842 387.36347,25.6892583 380.667032,25.6892583 C373.970595,25.6892583 368.911064,30.6743842 368.911064,37.5940365 C368.911064,44.5136889 373.970595,49.4988148 380.667032,49.4988148 Z M427.393287,57.1625158 C416.158152,57.1625158 407.750403,48.6059564 407.750403,37.5940365 C407.750403,26.5077118 416.158152,18.0255573 427.393287,18.0255573 C434.684964,18.0255573 441.009377,21.8202054 443.985572,27.6237848 L437.065919,31.6416474 C435.429012,28.1446188 431.783174,25.9124729 427.318882,25.9124729 C420.771254,25.9124729 415.786128,30.8975988 415.786128,37.5940365 C415.786128,44.2904743 420.771254,49.2756002 427.318882,49.2756002 C431.783174,49.2756002 435.429012,46.9690494 437.214729,43.5464257 L444.134381,47.4898834 C441.009377,53.3678677 434.684964,57.1625158 427.393287,57.1625158 Z M457.378447,29.2606918 C457.378447,36.0315344 477.393355,31.9392669 477.393355,45.7041667 C477.393355,53.1446531 470.920132,57.1625158 462.884407,57.1625158 C455.443921,57.1625158 450.08677,53.8142969 447.705815,48.4571467 L454.625467,44.439284 C455.815945,47.7875029 458.792139,49.7964342 462.884407,49.7964342 C466.45584,49.7964342 469.20882,48.6059564 469.20882,45.6297618 C469.20882,39.007729 449.193912,42.7279722 449.193912,29.4095015 C449.193912,22.4154443 455.220706,18.0255573 462.810002,18.0255573 C468.911201,18.0255573 473.970732,20.8529421 476.574902,25.7636632 L469.804059,29.5583112 C468.464772,26.6565215 465.860602,25.317234 462.810002,25.317234 C459.908212,25.317234 457.378447,26.5821167 457.378447,29.2606918 Z M491.679089,29.2606918 C491.679089,36.0315344 511.693998,31.9392669 511.693998,45.7041667 C511.693998,53.1446531 505.220775,57.1625158 497.185049,57.1625158 C489.744563,57.1625158 484.387413,53.8142969 482.006457,48.4571467 L488.926109,44.439284 C490.116587,47.7875029 493.092782,49.7964342 497.185049,49.7964342 C500.756483,49.7964342 503.509463,48.6059564 503.509463,45.6297618 C503.509463,39.007729 483.494554,42.7279722 483.494554,29.4095015 C483.494554,22.4154443 489.521348,18.0255573 497.110644,18.0255573 C503.211843,18.0255573 508.271374,20.8529421 510.875544,25.7636632 L504.104702,29.5583112 C502.765414,26.6565215 500.161244,25.317234 497.110644,25.317234 C494.208855,25.317234 491.679089,26.5821167 491.679089,29.2606918 Z"
            fill="#2D3748"
          ></path>
        </g>
      </g>
    </svg>
  ),
  sanity: () => (
    <svg
      viewBox="0 -204 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      className={lagrgeSvgClassName}
    >
      <g>
        <polygon
          fill="#F37368"
          points="381.461756 36.9858357 381.461756 101.81983 360.575637 101.81983 360.575637 26.8328612"
        ></polygon>
        <path
          d="M85.8651558,89.7813031 L101.529745,103.415297 L167.524079,69.0402266 L160.707082,52.6504249 L85.8651558,89.7813031 Z M360.575637,48.0090652 L413.66119,20.4509915 L404.668555,4.93144476 L360.575637,26.8328612 L360.575637,48.0090652 Z"
          fill="#F7A199"
        ></path>
        <path
          d="M211.18187,31.9093484 L211.18187,101.81983 L191.166006,101.81983 L191.166006,2.17563739 L211.18187,31.9093484 Z M85.8651558,89.7813031 L101.529745,103.415297 L131.698584,27.9932011 L121.980737,2.17563739 L85.8651558,89.7813031 Z"
          fill="#F37368"
        ></path>
        <path
          d="M121.980737,2.17563739 L142.576771,2.17563739 L180.722946,101.81983 L159.546742,101.81983 L121.980737,2.17563739 Z M214.227762,2.17563739 L258.175637,70.2005666 L258.175637,101.81983 L191.166006,2.17563739 L214.227762,2.17563739 Z M295.886686,2.17563739 L316.627762,2.17563739 L316.627762,101.81983 L295.886686,101.81983 L295.886686,2.17563739 Z M360.575637,20.4509915 L328.666289,20.4509915 L328.666289,2.17563739 L403.073088,2.17563739 L413.66119,20.4509915 L381.461756,20.4509915 L360.575637,20.4509915 Z"
          fill="#F04939"
        ></path>
        <polyline
          fill="#F7A199"
          points="475.014164 63.9637394 475.014164 101.81983 454.41813 101.81983 454.41813 63.9637394"
        ></polyline>
        <polygon
          fill="#F04939"
          points="489.228329 2.17563739 454.41813 63.9637394 475.014164 63.9637394 511.129745 2.17563739"
        ></polygon>
        <polygon
          fill="#F37368"
          points="454.41813 63.9637394 418.447592 2.17563739 441.074221 2.17563739 465.296317 44.5280453"
        ></polygon>
        <path
          d="M8.55750708,13.7790368 C8.55750708,27.5580737 17.1150142,35.8254958 34.2300283,40.1767705 L52.3603399,44.3830028 C68.6050992,48.1541076 78.4679887,57.4368272 78.4679887,72.5212465 C78.6130312,79.0481586 76.4373938,85.4300283 72.5212465,90.6515581 C72.5212465,75.5671388 64.6889518,67.4447592 45.9784703,62.5133144 L28.1382436,58.4521246 C13.7790368,55.2611898 2.75580737,47.5739377 2.75580737,31.184136 C2.75580737,24.9473088 4.78640227,18.7104816 8.55750708,13.7790368"
          fill="#F04939"
        ></path>
        <polygon
          fill="#F37368"
          points="258.175637 65.1240793 258.175637 2.17563739 278.191501 2.17563739 278.191501 101.81983 258.175637 101.81983"
        ></polygon>
        <path
          d="M61.3529745,68.7501416 C69.0402266,73.6815864 72.5212465,80.6436261 72.5212465,90.6515581 C65.9943343,98.9189802 54.8260623,103.415297 41.6271955,103.415297 C19.4356941,103.415297 3.62606232,92.392068 0.290084986,73.3915014 L21.6113314,73.3915014 C24.3671388,82.094051 31.6192635,86.1552408 41.482153,86.1552408 C53.2305949,86.3002833 61.207932,79.9184136 61.3529745,68.7501416 M8.55750708,13.6339943 C14.7943343,5.51161473 25.5274788,0.580169972 38.5813031,0.580169972 C61.3529745,0.580169972 74.4067989,12.6186969 77.7427762,29.4436261 L57.1467422,29.4436261 C54.8260623,22.7716714 49.1694051,17.5501416 38.8713881,17.5501416 C27.7031161,17.6951841 20.1609065,24.0770538 19.725779,34.2300283 C12.2517705,30.1081799 8.2674221,22.0464589 8.55750708,13.6339943 Z"
          fill="#F37368"
        ></path>
      </g>
    </svg>
  ),
  reactjs: () => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={smallSvgClassName}
    >
      <title>file_type_reactjs</title>
      <circle cx="16" cy="15.974" r="2.5" className="fill-[#00d8ff]" />
      <path
        d="M16,21.706a28.385,28.385,0,0,1-8.88-1.2,11.3,11.3,0,0,1-3.657-1.958A3.543,3.543,0,0,1,2,15.974c0-1.653,1.816-3.273,4.858-4.333A28.755,28.755,0,0,1,16,10.293a28.674,28.674,0,0,1,9.022,1.324,11.376,11.376,0,0,1,3.538,1.866A3.391,3.391,0,0,1,30,15.974c0,1.718-2.03,3.459-5.3,4.541A28.8,28.8,0,0,1,16,21.706Zm0-10.217a27.948,27.948,0,0,0-8.749,1.282c-2.8.977-4.055,2.313-4.055,3.2,0,.928,1.349,2.387,4.311,3.4A27.21,27.21,0,0,0,16,20.51a27.6,27.6,0,0,0,8.325-1.13C27.4,18.361,28.8,16.9,28.8,15.974a2.327,2.327,0,0,0-1.01-1.573,10.194,10.194,0,0,0-3.161-1.654A27.462,27.462,0,0,0,16,11.489Z"
        className="fill-[#00d8ff]"
      />
      <path
        d="M10.32,28.443a2.639,2.639,0,0,1-1.336-.328c-1.432-.826-1.928-3.208-1.327-6.373a28.755,28.755,0,0,1,3.4-8.593h0A28.676,28.676,0,0,1,16.71,5.995a11.376,11.376,0,0,1,3.384-2.133,3.391,3.391,0,0,1,2.878,0c1.489.858,1.982,3.486,1.287,6.859a28.806,28.806,0,0,1-3.316,8.133,28.385,28.385,0,0,1-5.476,7.093,11.3,11.3,0,0,1-3.523,2.189A4.926,4.926,0,0,1,10.32,28.443Zm1.773-14.7a27.948,27.948,0,0,0-3.26,8.219c-.553,2.915-.022,4.668.75,5.114.8.463,2.742.024,5.1-2.036a27.209,27.209,0,0,0,5.227-6.79,27.6,27.6,0,0,0,3.181-7.776c.654-3.175.089-5.119-.713-5.581a2.327,2.327,0,0,0-1.868.089A10.194,10.194,0,0,0,17.5,6.9a27.464,27.464,0,0,0-5.4,6.849Z"
        className="fill-[#00d8ff]"
      />
      <path
        d="M21.677,28.456c-1.355,0-3.076-.82-4.868-2.361a28.756,28.756,0,0,1-5.747-7.237h0a28.676,28.676,0,0,1-3.374-8.471,11.376,11.376,0,0,1-.158-4A3.391,3.391,0,0,1,8.964,3.9c1.487-.861,4.01.024,6.585,2.31a28.8,28.8,0,0,1,5.39,6.934,28.384,28.384,0,0,1,3.41,8.287,11.3,11.3,0,0,1,.137,4.146,3.543,3.543,0,0,1-1.494,2.555A2.59,2.59,0,0,1,21.677,28.456Zm-9.58-10.2a27.949,27.949,0,0,0,5.492,6.929c2.249,1.935,4.033,2.351,4.8,1.9.8-.465,1.39-2.363.782-5.434A27.212,27.212,0,0,0,19.9,13.74,27.6,27.6,0,0,0,14.755,7.1c-2.424-2.152-4.39-2.633-5.191-2.169a2.327,2.327,0,0,0-.855,1.662,10.194,10.194,0,0,0,.153,3.565,27.465,27.465,0,0,0,3.236,8.1Z"
        className="fill-[#00d8ff]"
      />
    </svg>
  ),
  typescript: () => (
    <svg
      viewBox="0 -193.5 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      className={lagrgeSvgClassName}
    >
      <g>
        <path
          d="M63.8177792,11.3381841 L37.2540335,11.3381841 L37.2540335,93.621006 L26.4017716,93.621006 L26.4017716,11.3381841 L0,11.3381841 L0,1.61974059 L63.8177792,1.61974059 L63.8177792,11.3381841 Z M113.867763,27.8595381 L83.5786144,104.14932 C78.2334704,117.755141 70.6206897,124.558051 60.9022461,124.558051 C58.1486871,124.558051 55.8810503,124.234103 54.0993357,123.748181 L54.0993357,114.353686 C56.3669725,115.163556 58.4726352,115.487504 60.2543499,115.487504 C65.5994938,115.487504 69.4868712,112.248023 72.2404302,105.931034 L77.4236001,93.459032 L51.8316988,27.8595381 L63.4938311,27.8595381 L81.3109775,78.3954445 C81.4729516,79.0433407 81.9588738,80.6630813 82.60677,83.4166403 L82.9307181,83.4166403 C83.0926922,82.444796 83.5786144,80.8250554 84.2265106,78.5574185 L102.853527,27.8595381 L113.867763,27.8595381 L113.867763,27.8595381 Z M131.037014,84.0645365 L130.713065,84.0645365 L130.713065,123.748181 L120.184752,123.748181 L120.184752,27.8595381 L130.713065,27.8595381 L130.713065,39.3596963 L131.037014,39.3596963 C136.220183,30.6130971 143.832964,26.2397975 153.713382,26.2397975 C162.136033,26.2397975 168.776969,29.1553306 173.474217,34.9863967 C178.171465,40.8174628 180.601076,48.7541917 180.601076,58.6346093 C180.601076,69.6488453 177.847517,78.3954445 172.502373,85.0363809 C167.157229,91.6773173 159.868396,94.9167985 150.635875,94.9167985 C142.375198,95.2407466 135.734261,91.5153432 131.037014,84.0645365 L131.037014,84.0645365 Z M130.87504,57.6627649 L130.87504,66.8952863 C130.87504,72.4024043 132.656754,76.937678 136.220183,80.6630813 C139.783613,84.3884847 144.156912,86.3321734 149.66403,86.3321734 C155.981019,86.3321734 161.002214,83.9025625 164.727618,79.0433407 C168.291047,74.1841189 170.072762,67.3812085 170.072762,58.6346093 C170.072762,51.3457767 168.453021,45.5147105 165.051566,41.4653591 C161.650111,37.2540335 157.114837,35.3103448 151.283771,35.3103448 C145.128757,35.3103448 140.269535,37.4160076 136.544132,41.6273331 C132.656754,45.8386587 130.87504,51.1838026 130.87504,57.6627649 L130.87504,57.6627649 Z M245.066751,63.331857 L198.74217,63.331857 C198.904144,70.6206897 200.847833,76.2897817 204.573236,80.3391332 C208.29864,84.3884847 213.48181,86.3321734 220.122746,86.3321734 C227.573553,86.3321734 234.376463,83.9025625 240.531477,79.0433407 L240.531477,88.9237583 C234.700411,93.1350838 227.08763,95.2407466 217.693135,95.2407466 C208.460614,95.2407466 201.171781,92.3252135 195.826637,86.3321734 C190.481493,80.3391332 187.889908,71.9164821 187.889908,61.2261942 C187.889908,51.0218285 190.805441,42.5991775 196.636507,36.2821892 C202.467574,29.8032268 209.594432,26.5637457 218.179057,26.5637457 C226.763682,26.5637457 233.404619,29.3173047 238.101866,34.9863967 C242.799114,40.4935147 245.228725,48.2682695 245.228725,58.1486871 L245.066751,63.331857 L245.066751,63.331857 Z M234.214489,54.4232838 C234.214489,48.2682695 232.756723,43.5710218 229.841189,40.1695666 C226.925656,36.7681114 222.876305,35.1483708 217.855109,35.1483708 C212.833913,35.1483708 208.622588,36.9300854 205.221133,40.4935147 C201.819677,44.056944 199.55204,48.7541917 198.74217,54.4232838 L234.214489,54.4232838 Z M250.249921,90.3815248 L250.249921,83.0926922 C256.890857,87.3040177 263.531794,89.4096805 270.334704,89.4096805 C277.461563,89.4096805 282.968681,87.951914 286.694084,84.8744068 C290.419488,81.7968997 292.201202,77.7475482 292.201202,72.4024043 C292.201202,67.7051566 290.90541,63.9797532 288.475799,61.0642202 C286.046188,58.3106612 280.53907,54.4232838 272.278393,49.564062 C262.883898,44.056944 257.052831,39.5216704 254.62322,35.9582411 C252.19361,32.2328377 250.897817,28.0215122 250.897817,23.3242645 C250.897817,16.8453021 253.489402,11.3381841 258.510598,6.80291047 C263.531794,2.26763682 270.334704,0 278.757355,0 C284.264473,0 289.771591,0.971844353 295.116735,2.753559 L295.116735,9.39449541 C289.771591,6.96488453 283.940525,5.66909206 277.785511,5.66909206 C271.468523,5.66909206 266.609301,7.28883265 262.883898,10.3663398 C259.158494,13.6058209 257.37678,17.4931984 257.37678,22.3524201 C257.37678,27.0496678 258.672572,30.7750712 261.102183,33.5286302 C263.531794,36.2821892 269.038912,40.1695666 277.299589,44.8668143 C285.884214,49.7260361 291.553306,54.0993357 294.468839,57.824739 C297.384372,61.5501424 298.680165,65.9234419 298.680165,70.9446378 C298.680165,78.0714964 296.250554,83.7405884 291.391332,88.2758621 C286.53211,92.8111357 279.567226,94.9167985 270.658652,94.9167985 C267.419171,94.9167985 263.855742,94.4308763 259.644416,93.459032 C255.433091,92.4871876 252.355584,91.6773173 250.249921,90.3815248 L250.249921,90.3815248 Z M353.427396,90.705473 C348.568175,93.621006 342.737109,95.2407466 335.934198,95.2407466 C327.025625,95.2407466 319.736792,92.1632395 314.229674,86.0082252 C308.722556,79.853211 305.968997,71.9164821 305.968997,61.8740905 C305.968997,51.5077507 309.046504,42.9231256 315.201519,36.2821892 C321.356533,29.6412528 329.293262,26.2397975 339.011705,26.2397975 C344.032901,26.2397975 348.892123,27.2116419 353.58937,29.3173047 L353.58937,35.9582411 C348.892123,33.042708 343.708953,31.5849415 338.201835,31.5849415 C330.42708,31.5849415 324.272066,34.3385005 319.412844,39.8456185 C314.553622,45.3527365 312.285985,52.6415691 312.285985,61.3881683 C312.285985,69.9727934 314.553622,76.7757039 318.926922,81.9588738 C323.300221,87.1420437 329.131288,89.7336286 336.258146,89.7336286 C342.899083,89.7336286 348.568175,87.951914 353.427396,84.5504587 L353.427396,90.705473 L353.427396,90.705473 Z M392.625119,34.0145524 C390.68143,32.5567858 388.413793,31.9088896 385.660234,31.9088896 C380.477064,31.9088896 376.103765,34.6624486 372.702309,40.0075925 C369.13888,45.3527365 367.51914,52.9655172 367.51914,62.8459348 L367.51914,93.7829801 L361.688073,93.7829801 L361.688073,27.8595381 L367.51914,27.8595381 L367.51914,42.4372034 L367.843088,42.4372034 C369.300854,37.4160076 371.730465,33.5286302 374.969946,30.7750712 C378.209427,28.0215122 381.934831,26.5637457 386.30813,26.5637457 C388.737741,26.5637457 391.005378,26.8876938 392.787093,27.6975641 L392.787093,34.0145524 L392.625119,34.0145524 L392.625119,34.0145524 Z M402.019614,11.3381841 C400.723822,11.3381841 399.590003,10.8522619 398.618159,9.88041759 C397.646314,8.90857324 397.160392,7.77475482 397.160392,6.31698829 C397.160392,4.85922177 397.646314,3.72540335 398.618159,2.91553306 C399.590003,2.10566276 400.723822,1.61974059 402.019614,1.61974059 C403.315407,1.61974059 404.449225,2.10566276 405.583043,2.91553306 C406.554888,3.72540335 407.04081,4.85922177 407.04081,6.31698829 C407.04081,7.61278077 406.554888,8.90857324 405.583043,9.88041759 C404.449225,10.8522619 403.315407,11.3381841 402.019614,11.3381841 Z M399.104081,93.621006 L399.104081,27.8595381 L404.935147,27.8595381 L404.935147,93.621006 L399.104081,93.621006 Z M425.181904,81.9588738 L424.857956,81.9588738 L424.857956,123.910155 L419.02689,123.910155 L419.02689,27.8595381 L424.857956,27.8595381 L424.857956,41.4653591 L425.181904,41.4653591 C427.611515,36.6061373 430.850997,32.8807339 435.224296,30.289149 C439.597596,27.6975641 444.456817,26.4017716 449.639987,26.4017716 C458.062638,26.4017716 464.541601,29.3173047 469.238848,34.9863967 C473.936096,40.8174628 476.203733,48.5922177 476.203733,58.4726352 C476.203733,69.4868712 473.450174,78.3954445 468.10503,85.198355 C462.759886,92.0012654 455.633028,95.4027207 446.886428,95.4027207 C437.167985,95.2407466 429.879152,90.867447 425.181904,81.9588738 Z M424.857956,57.5007909 L424.857956,65.7614679 C424.857956,72.4024043 426.963619,78.0714964 431.012971,82.7687441 C435.224296,87.4659918 440.56944,89.8956027 447.372351,89.8956027 C454.013287,89.8956027 459.520405,86.9800696 463.73173,81.3109775 C467.943056,75.4799114 470.048719,68.0291047 470.048719,58.6346093 C470.048719,50.3739323 468.10503,43.8949699 464.217653,39.0357482 C460.330275,34.1765264 455.309079,31.7469155 448.830117,31.7469155 C441.217336,31.7469155 435.224296,34.3385005 431.012971,39.5216704 C426.801645,44.7048402 424.857956,50.5359064 424.857956,57.5007909 Z M512,92.6491617 C508.922493,94.1069282 506.00696,94.7548244 503.415375,94.7548244 C493.696931,94.7548244 488.83771,88.9237583 488.83771,77.2616261 L488.83771,33.3666561 L477.013603,33.3666561 L477.013603,28.0215122 L488.83771,28.0215122 L488.83771,10.8522619 L491.753243,9.88041759 L494.668776,8.90857324 L494.668776,28.0215122 L512,28.0215122 L512,33.3666561 L494.668776,33.3666561 L494.668776,76.7757039 C494.668776,81.3109775 495.316672,84.5504587 496.774438,86.6561215 C498.232205,88.7617842 500.661816,89.7336286 504.063271,89.7336286 C506.492882,89.7336286 509.084467,88.9237583 512,87.3040177 L512,92.6491617 L512,92.6491617 Z"
          fill="#007ACC"
        ></path>
      </g>
    </svg>
  ),
  scss: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className={smallSvgClassName}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="#CB6699"
        d="M1.219 56.156c0 .703.207 1.167.323 1.618.756 2.933 2.381 5.45 4.309 7.746 2.746 3.272 6.109 5.906 9.554 8.383 2.988 2.148 6.037 4.248 9.037 6.38.515.366 1.002.787 1.561 1.236-.481.26-.881.489-1.297.7-3.959 2.008-7.768 4.259-11.279 6.986-2.116 1.644-4.162 3.391-5.607 5.674-2.325 3.672-3.148 7.584-1.415 11.761.506 1.22 1.278 2.274 2.367 3.053.353.252.749.502 1.162.6 1.058.249 2.136.412 3.207.609l3.033-.002c3.354-.299 6.407-1.448 9.166-3.352 4.312-2.976 7.217-6.966 8.466-12.087.908-3.722.945-7.448-.125-11.153a11.696 11.696 0 00-.354-1.014c-.13-.333-.283-.657-.463-1.072l6.876-3.954.103.088c-.125.409-.258.817-.371 1.23-.817 2.984-1.36 6.02-1.165 9.117.208 3.3 1.129 6.389 3.061 9.146 1.562 2.23 5.284 2.313 6.944.075.589-.795 1.16-1.626 1.589-2.513 1.121-2.315 2.159-4.671 3.23-7.011l.187-.428c-.077 1.108-.167 2.081-.208 3.055-.064 1.521.025 3.033.545 4.48.445 1.238 1.202 2.163 2.62 2.326.97.111 1.743-.333 2.456-.896a10.384 10.384 0 002.691-3.199c1.901-3.491 3.853-6.961 5.576-10.54 1.864-3.871 3.494-7.855 5.225-11.792l.286-.698c.409 1.607.694 3.181 1.219 4.671.61 1.729 1.365 3.417 2.187 5.058.389.775.344 1.278-.195 1.928-2.256 2.72-4.473 5.473-6.692 8.223-.491.607-.98 1.225-1.389 1.888a3.701 3.701 0 00-.48 1.364 1.737 1.737 0 001.383 1.971 9.661 9.661 0 002.708.193c3.097-.228 5.909-1.315 8.395-3.157 3.221-2.386 4.255-5.642 3.475-9.501-.211-1.047-.584-2.065-.947-3.074-.163-.455-.174-.774.123-1.198 2.575-3.677 4.775-7.578 6.821-11.569.081-.157.164-.314.306-.482.663 3.45 1.661 6.775 3.449 9.792-.912.879-1.815 1.676-2.632 2.554-1.799 1.934-3.359 4.034-4.173 6.595-.35 1.104-.619 2.226-.463 3.405.242 1.831 1.742 3.021 3.543 2.604 3.854-.892 7.181-2.708 9.612-5.925 1.636-2.166 1.785-4.582 1.1-7.113-.188-.688-.411-1.365-.651-2.154.951-.295 1.878-.649 2.837-.868 4.979-1.136 9.904-.938 14.702.86 2.801 1.05 5.064 2.807 6.406 5.571 1.639 3.379.733 6.585-2.452 8.721-.297.199-.637.356-.883.605a.869.869 0 00-.205.67c.021.123.346.277.533.275 1.047-.008 1.896-.557 2.711-1.121 2.042-1.413 3.532-3.314 3.853-5.817l.063-.188-.077-1.63c-.031-.094.023-.187.016-.258-.434-3.645-2.381-6.472-5.213-8.688-3.28-2.565-7.153-3.621-11.249-3.788a25.401 25.401 0 00-9.765 1.503c-.897.325-1.786.71-2.688 1.073-.121-.219-.251-.429-.358-.646-.926-1.896-2.048-3.708-2.296-5.882-.176-1.544-.392-3.086-.025-4.613.353-1.469.813-2.913 1.246-4.362.223-.746.066-1.164-.646-1.5a2.854 2.854 0 00-.786-.258c-1.75-.254-3.476-.109-5.171.384-.6.175-1.036.511-1.169 1.175-.076.381-.231.746-.339 1.122-.443 1.563-.757 3.156-1.473 4.645-1.794 3.735-3.842 7.329-5.938 10.897-.227.385-.466.763-.752 1.23-.736-1.54-1.521-2.922-1.759-4.542-.269-1.832-.481-3.661-.025-5.479.339-1.356.782-2.687 1.19-4.025.193-.636.104-.97-.472-1.305-.291-.169-.62-.319-.948-.368a11.643 11.643 0 00-5.354.438c-.543.176-.828.527-.994 1.087-.488 1.652-.904 3.344-1.589 4.915-2.774 6.36-5.628 12.687-8.479 19.013-.595 1.321-1.292 2.596-1.963 3.882-.17.326-.418.613-.63.919-.17-.201-.236-.339-.235-.477.005-.813-.092-1.65.063-2.436a172.189 172.189 0 011.578-7.099c.47-1.946 1.017-3.874 1.538-5.807.175-.647.178-1.252-.287-1.796-.781-.911-2.413-1.111-3.381-.409l-.428.242.083-.69c.204-1.479.245-2.953-.161-4.41-.506-1.816-1.802-2.861-3.686-2.803-.878.027-1.8.177-2.613.497-3.419 1.34-6.048 3.713-8.286 6.568a2.592 2.592 0 01-.757.654c-2.893 1.604-5.795 3.188-8.696 4.778l-3.229 1.769c-.866-.826-1.653-1.683-2.546-2.41-2.727-2.224-5.498-4.393-8.244-6.592-2.434-1.949-4.792-3.979-6.596-6.56-1.342-1.92-2.207-4.021-2.29-6.395-.105-3.025.753-5.789 2.293-8.362 1.97-3.292 4.657-5.934 7.611-8.327 3.125-2.53 6.505-4.678 10.008-6.639 4.901-2.743 9.942-5.171 15.347-6.774 5.542-1.644 11.165-2.585 16.965-1.929 2.28.258 4.494.78 6.527 1.895 1.557.853 2.834 1.97 3.428 3.716.586 1.718.568 3.459.162 5.204-.825 3.534-2.76 6.447-5.195 9.05-3.994 4.267-8.866 7.172-14.351 9.091a39.478 39.478 0 01-9.765 2.083c-2.729.229-5.401-.013-7.985-.962-1.711-.629-3.201-1.591-4.399-2.987-.214-.25-.488-.521-.887-.287-.391.23-.46.602-.329.979.219.626.421 1.278.762 1.838.857 1.405 2.107 2.424 3.483 3.298 2.643 1.681 5.597 2.246 8.66 2.377 4.648.201 9.183-.493 13.654-1.74 6.383-1.78 11.933-4.924 16.384-9.884 3.706-4.13 6.353-8.791 6.92-14.419.277-2.747-.018-5.438-1.304-7.944-1.395-2.715-3.613-4.734-6.265-6.125C68.756 18.179 64.588 17 60.286 17h-4.31c-5.21 0-10.247 1.493-15.143 3.274-3.706 1.349-7.34 2.941-10.868 4.703-7.683 3.839-14.838 8.468-20.715 14.833-2.928 3.171-5.407 6.67-6.833 10.79a40.494 40.494 0 00-1.111 3.746m27.839 36.013c-.333 4.459-2.354 8.074-5.657 11.002-1.858 1.646-3.989 2.818-6.471 3.23-.9.149-1.821.185-2.694-.188-1.245-.532-1.524-1.637-1.548-2.814-.037-1.876.62-3.572 1.521-5.186 1.176-2.104 2.9-3.708 4.741-5.206 2.9-2.361 6.046-4.359 9.268-6.245l.243-.1c.498 1.84.735 3.657.597 5.507zM54.303 70.98c-.235 1.424-.529 2.849-.945 4.229-1.438 4.777-3.285 9.406-5.282 13.973-.369.845-.906 1.616-1.373 2.417a1.689 1.689 0 01-.283.334c-.578.571-1.126.541-1.418-.206-.34-.868-.549-1.797-.729-2.716-.121-.617-.092-1.265-.13-1.897.039-4.494 1.41-8.578 3.736-12.38.959-1.568 2.003-3.062 3.598-4.054a6.27 6.27 0 011.595-.706c.85-.239 1.372.154 1.231 1.006zm17.164 21.868l6.169-7.203c.257 2.675-4.29 8.015-6.169 7.203zm19.703-4.847c-.436.25-.911.43-1.358.661-.409.212-.544-.002-.556-.354a2.385 2.385 0 01.093-.721c.833-2.938 2.366-5.446 4.647-7.486l.16-.082c1.085 3.035-.169 6.368-2.986 7.982z"
      />
    </svg>
  ),
  figma: () => (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={smallSvgClassName}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 16C16 13.7909 17.7909 12 20 12C22.2091 12 24 13.7909 24 16C24 18.2091 22.2091 20 20 20C17.7909 20 16 18.2091 16 16Z"
        fill="#1ABCFE"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 24C8 21.7909 9.79086 20 12 20H16V24C16 26.2091 14.2091 28 12 28C9.79086 28 8 26.2091 8 24Z"
        fill="#0ACF83"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 4V12H20C22.2091 12 24 10.2091 24 8C24 5.79086 22.2091 4 20 4H16Z"
        fill="#FF7262"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 8C8 10.2091 9.79086 12 12 12H16V4H12C9.79086 4 8 5.79086 8 8Z"
        fill="#F24E1E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 16C8 18.2091 9.79086 20 12 20H16V12H12C9.79086 12 8 13.7909 8 16Z"
        fill="#A259FF"
      />
    </svg>
  ),
  html: () => (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={smallSvgClassName}
    >
      <path d="M6 28L4 3H28L26 28L16 31L6 28Z" fill="#E44D26" />
      <path d="M26 5H16V29.5L24 27L26 5Z" fill="#F16529" />
      <path
        d="M9.5 17.5L8.5 8H24L23.5 11H11.5L12 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5H9.5Z"
        fill="white"
      />
    </svg>
  ),
};

const SkillsSection = () => {
  const LOGO_ORDER = [
    "tailwindcss",
    "sanity",
    "nextjs",
    "reactjs",
    "typescript",
    "scss",
    "figma",
    "html",
  ] as const;

  return (
    <Section withMargin={false}>
      <Container>
        <h1 className="font-heading-bold text-center text-xl tracking-widest text-black uppercase">
          Technologies & Skills
        </h1>
        <Marquee>
          {LOGO_ORDER.map((logoKey, index) => (
            <div
              key={index}
              className="relative mx-6 flex h-full w-fit items-center justify-start lg:mx-[4rem]"
            >
              {Logos[logoKey]()}
            </div>
          ))}
        </Marquee>
      </Container>
    </Section>
  );
};

export default SkillsSection;
