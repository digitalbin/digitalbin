// import gsap from 'gsap';

const innerHTML = `
<div>
    <svg id="loading" viewBox="0 0 1611 303" xmlns="http://www.w3.org/2000/svg">
        <path class="letter" d="M53.7511 63.272L4.59914 84.008L0.119141 70.184L36.0871 56.232L0.119141 42.28L4.59914 28.456L53.7511 49.064V63.272Z" />
        <path class="letter" d="M142.583 58.536C142.583 63.912 143.564 68.3066 145.527 71.72C147.575 75.1333 150.818 76.84 155.255 76.84C156.535 76.84 157.73 76.7973 158.839 76.712C159.948 76.6266 161.1 76.4986 162.295 76.328V43.56C161.1 42.8773 159.735 42.3226 158.199 41.896C156.663 41.384 155.042 41.128 153.335 41.128C149.58 41.128 146.85 42.6213 145.143 45.608C143.436 48.5946 142.583 52.904 142.583 58.536ZM178.039 87.208C175.138 88.1466 171.596 88.9146 167.415 89.512C163.234 90.1093 159.138 90.408 155.127 90.408C145.74 90.408 138.615 87.6346 133.751 82.088C128.972 76.5413 126.583 68.9466 126.583 59.304C126.583 49.4906 128.588 41.768 132.599 36.136C136.695 30.4186 142.711 27.56 150.647 27.56C152.78 27.56 154.871 27.816 156.919 28.328C158.967 28.7546 160.759 29.3946 162.295 30.248V2.85596L178.039 0.167969V87.208Z" />
        <path class="letter" d="M223.351 11.56C223.351 14.632 222.37 17.064 220.407 18.856C218.444 20.648 216.098 21.544 213.367 21.544C210.636 21.544 208.29 20.648 206.327 18.856C204.45 17.064 203.511 14.632 203.511 11.56C203.511 8.40263 204.45 5.92797 206.327 4.13596C208.29 2.34397 210.636 1.44797 213.367 1.44797C216.098 1.44797 218.444 2.34397 220.407 4.13596C222.37 5.92797 223.351 8.40263 223.351 11.56ZM246.775 86.44C243.532 87.976 240.46 89 237.559 89.512C234.743 90.1093 232.14 90.408 229.751 90.408C225.655 90.408 222.199 89.8106 219.383 88.616C216.652 87.4213 214.434 85.7146 212.727 83.496C211.106 81.192 209.954 78.4186 209.271 75.176C208.588 71.9333 208.247 68.2213 208.247 64.04V41.896H191.607V28.84H223.991V66.088C223.991 69.672 224.631 72.36 225.911 74.152C227.276 75.8586 229.495 76.712 232.567 76.712C234.018 76.712 235.767 76.5413 237.815 76.2C239.863 75.7733 242.167 74.9626 244.727 73.768L246.775 86.44Z" />
        <path class="letter" d="M271.223 57C271.223 61.9493 272.119 65.7466 273.911 68.392C275.703 70.952 278.519 72.232 282.359 72.232C284.066 72.232 285.644 72.0186 287.095 71.592C288.631 71.1653 289.996 70.6106 291.191 69.928V41C289.996 40.744 288.93 40.5733 287.991 40.488C287.052 40.4026 286.071 40.36 285.047 40.36C275.831 40.36 271.223 45.9066 271.223 57ZM307.063 81.704C307.063 91.5173 304.674 98.7706 299.895 103.464C295.202 108.157 287.607 110.504 277.111 110.504C273.356 110.504 269.73 110.12 266.231 109.352C262.818 108.584 259.532 107.688 256.375 106.664L259.319 93.352C261.794 94.2906 264.396 95.144 267.127 95.912C269.858 96.7653 273.271 97.192 277.367 97.192C280.098 97.192 282.359 96.8506 284.151 96.168C285.943 95.5706 287.351 94.7173 288.375 93.608C289.399 92.4986 290.124 91.176 290.551 89.64C290.978 88.1893 291.191 86.6106 291.191 84.904V82.472C288.972 83.3253 286.924 83.9653 285.047 84.392C283.255 84.8186 281.292 85.032 279.159 85.032C271.308 85.032 265.335 82.5573 261.239 77.608C257.228 72.6586 255.223 65.7893 255.223 57C255.223 47.1013 257.954 39.72 263.415 34.856C268.876 29.992 276.3 27.56 285.687 27.56C292.258 27.56 299.383 28.6266 307.063 30.76V81.704Z" />
        <path class="letter" d="M351.351 11.56C351.351 14.632 350.37 17.064 348.407 18.856C346.444 20.648 344.098 21.544 341.367 21.544C338.636 21.544 336.29 20.648 334.327 18.856C332.45 17.064 331.511 14.632 331.511 11.56C331.511 8.40263 332.45 5.92797 334.327 4.13596C336.29 2.34397 338.636 1.44797 341.367 1.44797C344.098 1.44797 346.444 2.34397 348.407 4.13596C350.37 5.92797 351.351 8.40263 351.351 11.56ZM374.775 86.44C371.532 87.976 368.46 89 365.559 89.512C362.743 90.1093 360.14 90.408 357.751 90.408C353.655 90.408 350.199 89.8106 347.383 88.616C344.652 87.4213 342.434 85.7146 340.727 83.496C339.106 81.192 337.954 78.4186 337.271 75.176C336.588 71.9333 336.247 68.2213 336.247 64.04V41.896H319.607V28.84H351.991V66.088C351.991 69.672 352.631 72.36 353.911 74.152C355.276 75.8586 357.495 76.712 360.567 76.712C362.018 76.712 363.767 76.5413 365.815 76.2C367.863 75.7733 370.167 74.9626 372.727 73.768L374.775 86.44Z" />
        <path class="letter" d="M397.303 41.896H383.607V28.84H397.303V13.736L413.047 11.176V28.84H438.263V41.896H413.047V66.216C413.047 68.4346 413.26 70.2266 413.687 71.592C414.114 72.9573 414.711 74.024 415.479 74.792C416.247 75.56 417.186 76.072 418.295 76.328C419.404 76.584 420.642 76.712 422.007 76.712C423.458 76.712 424.78 76.6693 425.975 76.584C427.255 76.4986 428.45 76.3706 429.559 76.2C430.754 75.944 431.948 75.6026 433.143 75.176C434.423 74.7493 435.788 74.1946 437.239 73.512L439.415 87.08C436.514 88.2746 433.356 89.128 429.943 89.64C426.615 90.152 423.372 90.408 420.215 90.408C416.546 90.408 413.303 90.1093 410.487 89.512C407.671 88.9146 405.282 87.7626 403.319 86.056C401.356 84.3493 399.863 81.96 398.839 78.888C397.815 75.7306 397.303 71.6346 397.303 66.6V41.896Z" />
        <path class="letter" d="M475.127 77.736C476.834 77.736 478.498 77.736 480.119 77.736C481.74 77.6506 483.148 77.5226 484.343 77.352V63.528C483.319 63.3573 482.082 63.2293 480.631 63.144C479.18 62.9733 477.858 62.888 476.663 62.888C475.042 62.888 473.463 63.016 471.927 63.272C470.391 63.4426 469.026 63.784 467.831 64.296C466.722 64.808 465.826 65.5333 465.143 66.472C464.46 67.4106 464.119 68.648 464.119 70.184C464.119 72.9146 465.143 74.8773 467.191 76.072C469.239 77.1813 471.884 77.736 475.127 77.736ZM473.719 27.304C478.668 27.304 482.764 27.9013 486.007 29.096C489.335 30.2053 491.98 31.8266 493.943 33.96C495.906 36.008 497.314 38.568 498.167 41.64C499.02 44.6266 499.447 47.9973 499.447 51.752V87.592C497.143 88.104 493.73 88.7013 489.207 89.384C484.684 90.0666 479.607 90.408 473.975 90.408C470.135 90.408 466.636 90.0666 463.479 89.384C460.407 88.7013 457.762 87.592 455.543 86.056C453.324 84.4346 451.618 82.3866 450.423 79.912C449.228 77.352 448.631 74.2373 448.631 70.568C448.631 67.0693 449.314 64.1253 450.679 61.736C452.044 59.3466 453.879 57.4266 456.183 55.976C458.487 54.5253 461.132 53.5013 464.119 52.904C467.106 52.2213 470.22 51.88 473.463 51.88C477.559 51.88 481.186 52.2213 484.343 52.904V50.984C484.343 47.9973 483.404 45.5226 481.527 43.56C479.65 41.512 476.407 40.488 471.799 40.488C468.812 40.488 465.911 40.7013 463.095 41.128C460.364 41.5546 458.146 42.0666 456.439 42.664L454.263 29.992C456.226 29.3093 458.999 28.712 462.583 28.2C466.167 27.6026 469.879 27.304 473.719 27.304Z" />
        <path class="letter" d="M566.775 86.44C566.519 86.6106 565.922 86.9093 564.983 87.336C564.13 87.7626 562.978 88.232 561.527 88.744C560.076 89.1706 558.284 89.5546 556.151 89.896C554.103 90.2373 551.756 90.408 549.111 90.408C541.858 90.408 536.567 88.2746 533.239 84.008C529.911 79.656 528.247 73.3413 528.247 65.064V13.992H511.607V0.935966H543.991V66.216C543.991 70.312 544.802 73.0853 546.423 74.536C548.044 75.9866 550.092 76.712 552.567 76.712C555.724 76.712 558.37 76.2853 560.503 75.432C562.636 74.5786 564.045 74.024 564.727 73.768L566.775 86.44Z" />
        <path class="letter" d="M615.159 58.536C615.159 52.904 614.22 48.5946 612.343 45.608C610.551 42.6213 607.778 41.128 604.023 41.128C602.316 41.128 600.61 41.384 598.903 41.896C597.282 42.3226 595.874 42.8773 594.679 43.56V76.2C595.874 76.456 597.111 76.6266 598.391 76.712C599.756 76.7973 600.909 76.84 601.847 76.84C605.943 76.84 609.186 75.4746 611.575 72.744C613.964 69.928 615.159 65.192 615.159 58.536ZM631.159 58.92C631.159 63.6986 630.519 68.0506 629.239 71.976C627.959 75.816 626.082 79.1013 623.607 81.832C621.132 84.5626 618.103 86.696 614.519 88.232C610.935 89.6826 606.839 90.408 602.231 90.408C598.135 90.408 593.954 90.1093 589.687 89.512C585.42 88.9146 581.836 88.1466 578.935 87.208V2.85596L594.679 0.167969V30.248C596.898 29.224 599.031 28.5413 601.079 28.2C603.127 27.7733 605.175 27.56 607.223 27.56C611.148 27.56 614.604 28.328 617.591 29.864C620.578 31.3146 623.052 33.448 625.015 36.264C627.063 38.9946 628.599 42.28 629.623 46.12C630.647 49.96 631.159 54.2266 631.159 58.92Z" />
        <path class="letter" d="M671.351 11.56C671.351 14.632 670.37 17.064 668.407 18.856C666.444 20.648 664.098 21.544 661.367 21.544C658.636 21.544 656.29 20.648 654.327 18.856C652.45 17.064 651.511 14.632 651.511 11.56C651.511 8.40263 652.45 5.92797 654.327 4.13596C656.29 2.34397 658.636 1.44797 661.367 1.44797C664.098 1.44797 666.444 2.34397 668.407 4.13596C670.37 5.92797 671.351 8.40263 671.351 11.56ZM694.775 86.44C691.532 87.976 688.46 89 685.559 89.512C682.743 90.1093 680.14 90.408 677.751 90.408C673.655 90.408 670.199 89.8106 667.383 88.616C664.652 87.4213 662.434 85.7146 660.727 83.496C659.106 81.192 657.954 78.4186 657.271 75.176C656.588 71.9333 656.247 68.2213 656.247 64.04V41.896H639.607V28.84H671.991V66.088C671.991 69.672 672.631 72.36 673.911 74.152C675.276 75.8586 677.495 76.712 680.567 76.712C682.018 76.712 683.767 76.5413 685.815 76.2C687.863 75.7733 690.167 74.9626 692.727 73.768L694.775 86.44Z" />
        <path class="letter" d="M707.063 30.76C709.879 29.992 713.335 29.2666 717.431 28.584C721.612 27.9013 726.135 27.56 730.999 27.56C735.778 27.56 739.746 28.2426 742.903 29.608C746.06 30.888 748.535 32.7653 750.327 35.24C752.204 37.6293 753.527 40.5306 754.295 43.944C755.063 47.272 755.447 50.984 755.447 55.08V89H739.703V57.128C739.703 51.496 739.063 47.4426 737.783 44.968C736.503 42.4933 733.9 41.256 729.975 41.256C728.78 41.256 727.586 41.2986 726.391 41.384C725.282 41.4693 724.087 41.5973 722.807 41.768V89H707.063V30.76Z" />
        <path class="letter" d="M806.519 78.888C806.519 82.6426 805.367 85.5013 803.063 87.464C800.759 89.4266 798.114 90.408 795.127 90.408C793.591 90.408 792.14 90.152 790.775 89.64C789.41 89.128 788.173 88.4026 787.063 87.464C786.039 86.44 785.186 85.2453 784.503 83.88C783.906 82.4293 783.607 80.7653 783.607 78.888C783.607 77.096 783.906 75.5173 784.503 74.152C785.186 72.7013 786.039 71.5066 787.063 70.568C788.173 69.6293 789.41 68.904 790.775 68.392C792.14 67.88 793.591 67.624 795.127 67.624C798.114 67.624 800.759 68.6053 803.063 70.568C805.367 72.5306 806.519 75.304 806.519 78.888ZM806.519 40.104C806.519 43.8586 805.367 46.7173 803.063 48.68C800.759 50.6426 798.114 51.624 795.127 51.624C793.591 51.624 792.14 51.368 790.775 50.856C789.41 50.344 788.173 49.6186 787.063 48.68C786.039 47.656 785.186 46.4613 784.503 45.096C783.906 43.6453 783.607 41.9813 783.607 40.104C783.607 38.312 783.906 36.7333 784.503 35.368C785.186 33.9173 786.039 32.7226 787.063 31.784C788.173 30.8453 789.41 30.12 790.775 29.608C792.14 29.096 793.591 28.84 795.127 28.84C798.114 28.84 800.759 29.8213 803.063 31.784C805.367 33.7466 806.519 36.52 806.519 40.104Z" />
        <path class="letter" d="M53.7511 255.272L4.59914 276.008L0.119141 262.184L36.0871 248.232L0.119141 234.28L4.59914 220.456L53.7511 241.064V255.272Z" />
        <path class="letter" d="M141.303 233.896H127.607V220.84H141.303V205.736L157.047 203.176V220.84H182.263V233.896H157.047V258.216C157.047 260.435 157.26 262.227 157.687 263.592C158.114 264.957 158.711 266.024 159.479 266.792C160.247 267.56 161.186 268.072 162.295 268.328C163.404 268.584 164.642 268.712 166.007 268.712C167.458 268.712 168.78 268.669 169.975 268.584C171.255 268.499 172.45 268.371 173.559 268.2C174.754 267.944 175.948 267.603 177.143 267.176C178.423 266.749 179.788 266.195 181.239 265.512L183.415 279.08C180.514 280.275 177.356 281.128 173.943 281.64C170.615 282.152 167.372 282.408 164.215 282.408C160.546 282.408 157.303 282.109 154.487 281.512C151.671 280.915 149.282 279.763 147.319 278.056C145.356 276.349 143.863 273.96 142.839 270.888C141.815 267.731 141.303 263.635 141.303 258.6V233.896Z" />
        <path class="letter" d="M195.063 281V194.856L210.807 192.168V221.352C212.087 220.925 213.623 220.541 215.415 220.2C217.207 219.773 218.786 219.56 220.151 219.56C224.588 219.56 228.3 220.243 231.287 221.608C234.274 222.888 236.663 224.765 238.455 227.24C240.247 229.629 241.527 232.531 242.295 235.944C243.063 239.272 243.447 242.984 243.447 247.08V281H227.703V249.128C227.703 243.496 227.063 239.443 225.783 236.968C224.503 234.493 222.071 233.256 218.487 233.256C217.036 233.256 215.586 233.427 214.135 233.768C212.77 234.109 211.66 234.408 210.807 234.664V281H195.063Z" />
        <path class="letter" d="M254.967 251.432C254.967 246.141 255.778 241.491 257.399 237.48C259.02 233.469 261.154 230.141 263.799 227.496C266.444 224.765 269.474 222.717 272.887 221.352C276.3 219.987 279.799 219.304 283.383 219.304C292.258 219.304 298.999 221.949 303.607 227.24C308.215 232.445 310.519 240.083 310.519 250.152C310.519 251.176 310.476 252.243 310.391 253.352C310.391 254.461 310.348 255.357 310.263 256.04H271.223C271.223 259.965 272.844 263.08 276.087 265.384C279.33 267.603 283.511 268.712 288.631 268.712C291.788 268.712 294.775 268.371 297.591 267.688C300.492 267.005 302.924 266.323 304.887 265.64L307.063 279.08C304.332 280.019 301.431 280.787 298.359 281.384C295.287 282.067 291.831 282.408 287.991 282.408C282.871 282.408 278.263 281.768 274.167 280.488C270.156 279.123 266.7 277.16 263.799 274.6C260.983 271.955 258.807 268.712 257.271 264.872C255.735 261.032 254.967 256.552 254.967 251.432ZM295.287 245.16C295.287 243.539 295.074 242.003 294.647 240.552C294.22 239.016 293.538 237.651 292.599 236.456C291.66 235.261 290.466 234.323 289.015 233.64C287.564 232.872 285.772 232.488 283.639 232.488C281.591 232.488 279.799 232.829 278.263 233.512C276.812 234.195 275.575 235.133 274.551 236.328C273.612 237.523 272.844 238.888 272.247 240.424C271.735 241.96 271.394 243.539 271.223 245.16H295.287Z" />
        <path class="letter" d="M411.127 269.736C412.834 269.736 414.498 269.736 416.119 269.736C417.74 269.651 419.148 269.523 420.343 269.352V255.528C419.319 255.357 418.082 255.229 416.631 255.144C415.18 254.973 413.858 254.888 412.663 254.888C411.042 254.888 409.463 255.016 407.927 255.272C406.391 255.443 405.026 255.784 403.831 256.296C402.722 256.808 401.826 257.533 401.143 258.472C400.46 259.411 400.119 260.648 400.119 262.184C400.119 264.915 401.143 266.877 403.191 268.072C405.239 269.181 407.884 269.736 411.127 269.736ZM409.719 219.304C414.668 219.304 418.764 219.901 422.007 221.096C425.335 222.205 427.98 223.827 429.943 225.96C431.906 228.008 433.314 230.568 434.167 233.64C435.02 236.627 435.447 239.997 435.447 243.752V279.592C433.143 280.104 429.73 280.701 425.207 281.384C420.684 282.067 415.607 282.408 409.975 282.408C406.135 282.408 402.636 282.067 399.479 281.384C396.407 280.701 393.762 279.592 391.543 278.056C389.324 276.435 387.618 274.387 386.423 271.912C385.228 269.352 384.631 266.237 384.631 262.568C384.631 259.069 385.314 256.125 386.679 253.736C388.044 251.347 389.879 249.427 392.183 247.976C394.487 246.525 397.132 245.501 400.119 244.904C403.106 244.221 406.22 243.88 409.463 243.88C413.559 243.88 417.186 244.221 420.343 244.904V242.984C420.343 239.997 419.404 237.523 417.527 235.56C415.65 233.512 412.407 232.488 407.799 232.488C404.812 232.488 401.911 232.701 399.095 233.128C396.364 233.555 394.146 234.067 392.439 234.664L390.263 221.992C392.226 221.309 394.999 220.712 398.583 220.2C402.167 219.603 405.879 219.304 409.719 219.304Z" />
        <path class="letter" d="M451.063 222.76C453.879 221.992 457.335 221.267 461.431 220.584C465.612 219.901 470.135 219.56 474.999 219.56C479.778 219.56 483.746 220.243 486.903 221.608C490.06 222.888 492.535 224.765 494.327 227.24C496.204 229.629 497.527 232.531 498.295 235.944C499.063 239.272 499.447 242.984 499.447 247.08V281H483.703V249.128C483.703 243.496 483.063 239.443 481.783 236.968C480.503 234.493 477.9 233.256 473.975 233.256C472.78 233.256 471.586 233.299 470.391 233.384C469.282 233.469 468.087 233.597 466.807 233.768V281H451.063V222.76Z" />
        <path class="letter" d="M539.127 269.736C540.834 269.736 542.498 269.736 544.119 269.736C545.74 269.651 547.148 269.523 548.343 269.352V255.528C547.319 255.357 546.082 255.229 544.631 255.144C543.18 254.973 541.858 254.888 540.663 254.888C539.042 254.888 537.463 255.016 535.927 255.272C534.391 255.443 533.026 255.784 531.831 256.296C530.722 256.808 529.826 257.533 529.143 258.472C528.46 259.411 528.119 260.648 528.119 262.184C528.119 264.915 529.143 266.877 531.191 268.072C533.239 269.181 535.884 269.736 539.127 269.736ZM537.719 219.304C542.668 219.304 546.764 219.901 550.007 221.096C553.335 222.205 555.98 223.827 557.943 225.96C559.906 228.008 561.314 230.568 562.167 233.64C563.02 236.627 563.447 239.997 563.447 243.752V279.592C561.143 280.104 557.73 280.701 553.207 281.384C548.684 282.067 543.607 282.408 537.975 282.408C534.135 282.408 530.636 282.067 527.479 281.384C524.407 280.701 521.762 279.592 519.543 278.056C517.324 276.435 515.618 274.387 514.423 271.912C513.228 269.352 512.631 266.237 512.631 262.568C512.631 259.069 513.314 256.125 514.679 253.736C516.044 251.347 517.879 249.427 520.183 247.976C522.487 246.525 525.132 245.501 528.119 244.904C531.106 244.221 534.22 243.88 537.463 243.88C541.559 243.88 545.186 244.221 548.343 244.904V242.984C548.343 239.997 547.404 237.523 545.527 235.56C543.65 233.512 540.407 232.488 535.799 232.488C532.812 232.488 529.911 232.701 527.095 233.128C524.364 233.555 522.146 234.067 520.439 234.664L518.263 221.992C520.226 221.309 522.999 220.712 526.583 220.2C530.167 219.603 533.879 219.304 537.719 219.304Z" />
        <path class="letter" d="M630.775 278.44C630.519 278.611 629.922 278.909 628.983 279.336C628.13 279.763 626.978 280.232 625.527 280.744C624.076 281.171 622.284 281.555 620.151 281.896C618.103 282.237 615.756 282.408 613.111 282.408C605.858 282.408 600.567 280.275 597.239 276.008C593.911 271.656 592.247 265.341 592.247 257.064V205.992H575.607V192.936H607.991V258.216C607.991 262.312 608.802 265.085 610.423 266.536C612.044 267.987 614.092 268.712 616.567 268.712C619.724 268.712 622.37 268.285 624.503 267.432C626.636 266.579 628.045 266.024 628.727 265.768L630.775 278.44Z" />
        <path class="letter" d="M695.415 250.792C695.415 255.571 694.732 259.923 693.367 263.848C692.002 267.688 690.082 271.016 687.607 273.832C685.132 276.648 682.146 278.824 678.647 280.36C675.234 281.896 671.394 282.664 667.127 282.664C662.86 282.664 658.978 281.896 655.479 280.36C652.066 278.824 649.079 276.648 646.519 273.832C644.044 271.016 642.124 267.688 640.759 263.848C639.394 259.923 638.711 255.571 638.711 250.792C638.711 246.099 639.394 241.832 640.759 237.992C642.21 234.067 644.172 230.739 646.647 228.008C649.207 225.192 652.237 223.059 655.735 221.608C659.234 220.072 663.031 219.304 667.127 219.304C671.308 219.304 675.106 220.072 678.519 221.608C682.018 223.059 685.004 225.192 687.479 228.008C690.039 230.739 692.002 234.067 693.367 237.992C694.732 241.832 695.415 246.099 695.415 250.792ZM654.711 250.92C654.711 256.296 655.65 260.648 657.527 263.976C659.49 267.304 662.604 268.968 666.871 268.968C670.967 268.968 674.039 267.304 676.087 263.976C678.22 260.648 679.287 256.296 679.287 250.92C679.287 245.544 678.306 241.235 676.343 237.992C674.466 234.664 671.394 233 667.127 233C663.031 233 659.916 234.664 657.783 237.992C655.735 241.235 654.711 245.544 654.711 250.92Z" />
        <path class="letter" d="M719.223 249C719.223 253.949 720.119 257.747 721.911 260.392C723.703 262.952 726.519 264.232 730.359 264.232C732.066 264.232 733.644 264.019 735.095 263.592C736.631 263.165 737.996 262.611 739.191 261.928V233C737.996 232.744 736.93 232.573 735.991 232.488C735.052 232.403 734.071 232.36 733.047 232.36C723.831 232.36 719.223 237.907 719.223 249ZM755.063 273.704C755.063 283.517 752.674 290.771 747.895 295.464C743.202 300.157 735.607 302.504 725.111 302.504C721.356 302.504 717.73 302.12 714.231 301.352C710.818 300.584 707.532 299.688 704.375 298.664L707.319 285.352C709.794 286.291 712.396 287.144 715.127 287.912C717.858 288.765 721.271 289.192 725.367 289.192C728.098 289.192 730.359 288.851 732.151 288.168C733.943 287.571 735.351 286.717 736.375 285.608C737.399 284.499 738.124 283.176 738.551 281.64C738.978 280.189 739.191 278.611 739.191 276.904V274.472C736.972 275.325 734.924 275.965 733.047 276.392C731.255 276.819 729.292 277.032 727.159 277.032C719.308 277.032 713.335 274.557 709.239 269.608C705.228 264.659 703.223 257.789 703.223 249C703.223 239.101 705.954 231.72 711.415 226.856C716.876 221.992 724.3 219.56 733.687 219.56C740.258 219.56 747.383 220.627 755.063 222.76V273.704Z" />
        <path class="letter" d="M819.063 278.952C816.162 279.72 812.62 280.488 808.439 281.256C804.343 282.024 799.863 282.408 794.999 282.408C790.05 282.408 785.996 281.725 782.839 280.36C779.682 278.995 777.165 277.075 775.287 274.6C773.495 272.04 772.258 269.053 771.575 265.64C770.892 262.227 770.551 258.472 770.551 254.376V220.84H786.295V252.328C786.295 257.875 786.935 262.013 788.215 264.744C789.58 267.389 792.183 268.712 796.023 268.712C798.412 268.712 800.802 268.499 803.191 268.072V220.84H819.063V278.952Z" />
        <path class="letter" d="M830.967 251.432C830.967 246.141 831.778 241.491 833.399 237.48C835.021 233.469 837.154 230.141 839.799 227.496C842.444 224.765 845.474 222.717 848.887 221.352C852.3 219.987 855.799 219.304 859.383 219.304C868.258 219.304 874.999 221.949 879.607 227.24C884.215 232.445 886.519 240.083 886.519 250.152C886.519 251.176 886.476 252.243 886.391 253.352C886.391 254.461 886.348 255.357 886.263 256.04H847.223C847.223 259.965 848.844 263.08 852.087 265.384C855.33 267.603 859.511 268.712 864.631 268.712C867.789 268.712 870.775 268.371 873.591 267.688C876.492 267.005 878.924 266.323 880.887 265.64L883.063 279.08C880.333 280.019 877.431 280.787 874.359 281.384C871.287 282.067 867.831 282.408 863.991 282.408C858.871 282.408 854.263 281.768 850.167 280.488C846.156 279.123 842.7 277.16 839.799 274.6C836.983 271.955 834.807 268.712 833.271 264.872C831.735 261.032 830.967 256.552 830.967 251.432ZM871.287 245.16C871.287 243.539 871.074 242.003 870.647 240.552C870.22 239.016 869.538 237.651 868.599 236.456C867.66 235.261 866.466 234.323 865.015 233.64C863.564 232.872 861.772 232.488 859.639 232.488C857.591 232.488 855.799 232.829 854.263 233.512C852.812 234.195 851.575 235.133 850.551 236.328C849.612 237.523 848.844 238.888 848.247 240.424C847.735 241.96 847.394 243.539 847.223 245.16H871.287Z" />
        <path class="letter" d="M960.631 250.92C960.631 246.568 961.314 242.472 962.679 238.632C964.044 234.792 966.135 231.464 968.951 228.648C971.767 225.747 975.308 223.485 979.575 221.864C983.927 220.157 989.09 219.304 995.063 219.304C998.647 219.304 1001.89 219.56 1004.79 220.072C1007.69 220.584 1010.64 221.437 1013.62 222.632L1010.17 235.304C1008.46 234.707 1006.54 234.195 1004.41 233.768C1002.36 233.256 999.714 233 996.471 233C992.716 233 989.559 233.469 986.999 234.408C984.524 235.261 982.519 236.499 980.983 238.12C979.447 239.656 978.338 241.533 977.655 243.752C976.972 245.971 976.631 248.36 976.631 250.92C976.631 256.467 978.167 260.819 981.239 263.976C984.396 267.133 989.73 268.712 997.239 268.712C999.714 268.712 1002.27 268.541 1004.92 268.2C1007.65 267.859 1010.12 267.304 1012.34 266.536L1014.65 279.464C1012.43 280.317 1009.74 281 1006.58 281.512C1003.43 282.109 999.714 282.408 995.447 282.408C989.303 282.408 984.012 281.597 979.575 279.976C975.223 278.355 971.639 276.136 968.823 273.32C966.007 270.504 963.916 267.176 962.551 263.336C961.271 259.496 960.631 255.357 960.631 250.92Z" />
        <path class="letter" d="M1051.13 269.736C1052.83 269.736 1054.5 269.736 1056.12 269.736C1057.74 269.651 1059.15 269.523 1060.34 269.352V255.528C1059.32 255.357 1058.08 255.229 1056.63 255.144C1055.18 254.973 1053.86 254.888 1052.66 254.888C1051.04 254.888 1049.46 255.016 1047.93 255.272C1046.39 255.443 1045.03 255.784 1043.83 256.296C1042.72 256.808 1041.83 257.533 1041.14 258.472C1040.46 259.411 1040.12 260.648 1040.12 262.184C1040.12 264.915 1041.14 266.877 1043.19 268.072C1045.24 269.181 1047.88 269.736 1051.13 269.736ZM1049.72 219.304C1054.67 219.304 1058.76 219.901 1062.01 221.096C1065.34 222.205 1067.98 223.827 1069.94 225.96C1071.91 228.008 1073.31 230.568 1074.17 233.64C1075.02 236.627 1075.45 239.997 1075.45 243.752V279.592C1073.14 280.104 1069.73 280.701 1065.21 281.384C1060.68 282.067 1055.61 282.408 1049.98 282.408C1046.14 282.408 1042.64 282.067 1039.48 281.384C1036.41 280.701 1033.76 279.592 1031.54 278.056C1029.32 276.435 1027.62 274.387 1026.42 271.912C1025.23 269.352 1024.63 266.237 1024.63 262.568C1024.63 259.069 1025.31 256.125 1026.68 253.736C1028.04 251.347 1029.88 249.427 1032.18 247.976C1034.49 246.525 1037.13 245.501 1040.12 244.904C1043.11 244.221 1046.22 243.88 1049.46 243.88C1053.56 243.88 1057.19 244.221 1060.34 244.904V242.984C1060.34 239.997 1059.4 237.523 1057.53 235.56C1055.65 233.512 1052.41 232.488 1047.8 232.488C1044.81 232.488 1041.91 232.701 1039.1 233.128C1036.36 233.555 1034.15 234.067 1032.44 234.664L1030.26 221.992C1032.23 221.309 1035 220.712 1038.58 220.2C1042.17 219.603 1045.88 219.304 1049.72 219.304Z" />
        <path class="letter" d="M1101.3 233.896H1087.61V220.84H1101.3V205.736L1117.05 203.176V220.84H1142.26V233.896H1117.05V258.216C1117.05 260.435 1117.26 262.227 1117.69 263.592C1118.11 264.957 1118.71 266.024 1119.48 266.792C1120.25 267.56 1121.19 268.072 1122.3 268.328C1123.4 268.584 1124.64 268.712 1126.01 268.712C1127.46 268.712 1128.78 268.669 1129.98 268.584C1131.26 268.499 1132.45 268.371 1133.56 268.2C1134.75 267.944 1135.95 267.603 1137.14 267.176C1138.42 266.749 1139.79 266.195 1141.24 265.512L1143.42 279.08C1140.51 280.275 1137.36 281.128 1133.94 281.64C1130.62 282.152 1127.37 282.408 1124.22 282.408C1120.55 282.408 1117.3 282.109 1114.49 281.512C1111.67 280.915 1109.28 279.763 1107.32 278.056C1105.36 276.349 1103.86 273.96 1102.84 270.888C1101.82 267.731 1101.3 263.635 1101.3 258.6V233.896Z" />
        <path class="letter" d="M1179.13 269.736C1180.83 269.736 1182.5 269.736 1184.12 269.736C1185.74 269.651 1187.15 269.523 1188.34 269.352V255.528C1187.32 255.357 1186.08 255.229 1184.63 255.144C1183.18 254.973 1181.86 254.888 1180.66 254.888C1179.04 254.888 1177.46 255.016 1175.93 255.272C1174.39 255.443 1173.03 255.784 1171.83 256.296C1170.72 256.808 1169.83 257.533 1169.14 258.472C1168.46 259.411 1168.12 260.648 1168.12 262.184C1168.12 264.915 1169.14 266.877 1171.19 268.072C1173.24 269.181 1175.88 269.736 1179.13 269.736ZM1177.72 219.304C1182.67 219.304 1186.76 219.901 1190.01 221.096C1193.34 222.205 1195.98 223.827 1197.94 225.96C1199.91 228.008 1201.31 230.568 1202.17 233.64C1203.02 236.627 1203.45 239.997 1203.45 243.752V279.592C1201.14 280.104 1197.73 280.701 1193.21 281.384C1188.68 282.067 1183.61 282.408 1177.98 282.408C1174.14 282.408 1170.64 282.067 1167.48 281.384C1164.41 280.701 1161.76 279.592 1159.54 278.056C1157.32 276.435 1155.62 274.387 1154.42 271.912C1153.23 269.352 1152.63 266.237 1152.63 262.568C1152.63 259.069 1153.31 256.125 1154.68 253.736C1156.04 251.347 1157.88 249.427 1160.18 247.976C1162.49 246.525 1165.13 245.501 1168.12 244.904C1171.11 244.221 1174.22 243.88 1177.46 243.88C1181.56 243.88 1185.19 244.221 1188.34 244.904V242.984C1188.34 239.997 1187.4 237.523 1185.53 235.56C1183.65 233.512 1180.41 232.488 1175.8 232.488C1172.81 232.488 1169.91 232.701 1167.1 233.128C1164.36 233.555 1162.15 234.067 1160.44 234.664L1158.26 221.992C1160.23 221.309 1163 220.712 1166.58 220.2C1170.17 219.603 1173.88 219.304 1177.72 219.304Z" />
        <path class="letter" d="M1270.78 278.44C1270.52 278.611 1269.92 278.909 1268.98 279.336C1268.13 279.763 1266.98 280.232 1265.53 280.744C1264.08 281.171 1262.28 281.555 1260.15 281.896C1258.1 282.237 1255.76 282.408 1253.11 282.408C1245.86 282.408 1240.57 280.275 1237.24 276.008C1233.91 271.656 1232.25 265.341 1232.25 257.064V205.992H1215.61V192.936H1247.99V258.216C1247.99 262.312 1248.8 265.085 1250.42 266.536C1252.04 267.987 1254.09 268.712 1256.57 268.712C1259.72 268.712 1262.37 268.285 1264.5 267.432C1266.64 266.579 1268.04 266.024 1268.73 265.768L1270.78 278.44Z" />
        <path class="letter" d="M1335.42 250.792C1335.42 255.571 1334.73 259.923 1333.37 263.848C1332 267.688 1330.08 271.016 1327.61 273.832C1325.13 276.648 1322.15 278.824 1318.65 280.36C1315.23 281.896 1311.39 282.664 1307.13 282.664C1302.86 282.664 1298.98 281.896 1295.48 280.36C1292.07 278.824 1289.08 276.648 1286.52 273.832C1284.04 271.016 1282.12 267.688 1280.76 263.848C1279.39 259.923 1278.71 255.571 1278.71 250.792C1278.71 246.099 1279.39 241.832 1280.76 237.992C1282.21 234.067 1284.17 230.739 1286.65 228.008C1289.21 225.192 1292.24 223.059 1295.74 221.608C1299.23 220.072 1303.03 219.304 1307.13 219.304C1311.31 219.304 1315.11 220.072 1318.52 221.608C1322.02 223.059 1325 225.192 1327.48 228.008C1330.04 230.739 1332 234.067 1333.37 237.992C1334.73 241.832 1335.42 246.099 1335.42 250.792ZM1294.71 250.92C1294.71 256.296 1295.65 260.648 1297.53 263.976C1299.49 267.304 1302.6 268.968 1306.87 268.968C1310.97 268.968 1314.04 267.304 1316.09 263.976C1318.22 260.648 1319.29 256.296 1319.29 250.92C1319.29 245.544 1318.31 241.235 1316.34 237.992C1314.47 234.664 1311.39 233 1307.13 233C1303.03 233 1299.92 234.664 1297.78 237.992C1295.74 241.235 1294.71 245.544 1294.71 250.92Z" />
        <path class="letter" d="M1359.22 249C1359.22 253.949 1360.12 257.747 1361.91 260.392C1363.7 262.952 1366.52 264.232 1370.36 264.232C1372.07 264.232 1373.64 264.019 1375.1 263.592C1376.63 263.165 1378 262.611 1379.19 261.928V233C1378 232.744 1376.93 232.573 1375.99 232.488C1375.05 232.403 1374.07 232.36 1373.05 232.36C1363.83 232.36 1359.22 237.907 1359.22 249ZM1395.06 273.704C1395.06 283.517 1392.67 290.771 1387.9 295.464C1383.2 300.157 1375.61 302.504 1365.11 302.504C1361.36 302.504 1357.73 302.12 1354.23 301.352C1350.82 300.584 1347.53 299.688 1344.38 298.664L1347.32 285.352C1349.79 286.291 1352.4 287.144 1355.13 287.912C1357.86 288.765 1361.27 289.192 1365.37 289.192C1368.1 289.192 1370.36 288.851 1372.15 288.168C1373.94 287.571 1375.35 286.717 1376.38 285.608C1377.4 284.499 1378.12 283.176 1378.55 281.64C1378.98 280.189 1379.19 278.611 1379.19 276.904V274.472C1376.97 275.325 1374.92 275.965 1373.05 276.392C1371.26 276.819 1369.29 277.032 1367.16 277.032C1359.31 277.032 1353.34 274.557 1349.24 269.608C1345.23 264.659 1343.22 257.789 1343.22 249C1343.22 239.101 1345.95 231.72 1351.42 226.856C1356.88 221.992 1364.3 219.56 1373.69 219.56C1380.26 219.56 1387.38 220.627 1395.06 222.76V273.704Z" />
        <path class="letter" d="M1459.06 278.952C1456.16 279.72 1452.62 280.488 1448.44 281.256C1444.34 282.024 1439.86 282.408 1435 282.408C1430.05 282.408 1426 281.725 1422.84 280.36C1419.68 278.995 1417.16 277.075 1415.29 274.6C1413.5 272.04 1412.26 269.053 1411.58 265.64C1410.89 262.227 1410.55 258.472 1410.55 254.376V220.84H1426.3V252.328C1426.3 257.875 1426.94 262.013 1428.22 264.744C1429.58 267.389 1432.18 268.712 1436.02 268.712C1438.41 268.712 1440.8 268.499 1443.19 268.072V220.84H1459.06V278.952Z" />
        <path class="letter" d="M1470.97 251.432C1470.97 246.141 1471.78 241.491 1473.4 237.48C1475.02 233.469 1477.15 230.141 1479.8 227.496C1482.44 224.765 1485.47 222.717 1488.89 221.352C1492.3 219.987 1495.8 219.304 1499.38 219.304C1508.26 219.304 1515 221.949 1519.61 227.24C1524.22 232.445 1526.52 240.083 1526.52 250.152C1526.52 251.176 1526.48 252.243 1526.39 253.352C1526.39 254.461 1526.35 255.357 1526.26 256.04H1487.22C1487.22 259.965 1488.84 263.08 1492.09 265.384C1495.33 267.603 1499.51 268.712 1504.63 268.712C1507.79 268.712 1510.78 268.371 1513.59 267.688C1516.49 267.005 1518.92 266.323 1520.89 265.64L1523.06 279.08C1520.33 280.019 1517.43 280.787 1514.36 281.384C1511.29 282.067 1507.83 282.408 1503.99 282.408C1498.87 282.408 1494.26 281.768 1490.17 280.488C1486.16 279.123 1482.7 277.16 1479.8 274.6C1476.98 271.955 1474.81 268.712 1473.27 264.872C1471.74 261.032 1470.97 256.552 1470.97 251.432ZM1511.29 245.16C1511.29 243.539 1511.07 242.003 1510.65 240.552C1510.22 239.016 1509.54 237.651 1508.6 236.456C1507.66 235.261 1506.47 234.323 1505.02 233.64C1503.56 232.872 1501.77 232.488 1499.64 232.488C1497.59 232.488 1495.8 232.829 1494.26 233.512C1492.81 234.195 1491.58 235.133 1490.55 236.328C1489.61 237.523 1488.84 238.888 1488.25 240.424C1487.74 241.96 1487.39 243.539 1487.22 245.16H1511.29Z" />
        <path class="cursor" d="M1559 192H1611V283H1559V192Z" />
    </svg>
    <button disabled>loading...</button>
</div>
`;

export default class LoadingScreen extends HTMLElement {
    // declare timeline: gsap.core.Timeline;
    btn: HTMLButtonElement;

    constructor() {
        super();
        this.innerHTML = innerHTML;

        this.btn = this.querySelector('button') as HTMLButtonElement;
        this.btn.addEventListener('click', this.handleOnStart);
    }

    connectedCallback() {
        // gsap.set('svg#loading path', {
        //     opacity: 0,
        // });

        // this.timeline = gsap
        //     .timeline()
        //     .to('svg#loading path', {
        //         opacity: 1,
        //         stagger: 0.08,
        //         duration: 0,
        //     })
        //     .to('svg#loading path.cursor', {
        //         opacity: 0,
        //         duration: 0,
        //         delay: 0.5,
        //         repeatDelay: 0.5,
        //         yoyo: true,
        //         repeat: -1,
        //     });

        // if (window.location.pathname === '/minimal') this.destroy();
    }

    disconnectedCallback() {
        this.btn.removeEventListener('click', this.handleOnStart);
        // this.timeline.kill();
    }

    attributeChangedCallback(name: string) {
        if (name === 'ready') {
            this.btn.removeAttribute('disabled');
            this.btn.innerHTML = '&#60;start&#62;';
        }
    }

    static get observedAttributes() {
        return ['ready'];
    }

    handleOnStart = () => {
        const event = new Event('onstart');
        this.dispatchEvent(event);
        this.destroy();
    };

    destroy() {
        document.body.removeChild(this);
    }
}
