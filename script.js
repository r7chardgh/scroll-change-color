const scrollToChangeBgC = (() => {
  const allRGB = [];
  const diff = [];
  const eTAB = [];
  const eles = document.querySelectorAll(`section[class*="container color-b"]`);
  const target = document.querySelector("div.color-bg");
  const tTop = target.offsetTop;
  const tBottom = target.offsetTop + target.offsetHeight;

  //helpers
  function hexToRGB(hex) {
    const [r, g, b] = [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];
    return { r, g, b };
  }
  function getColorHex(ele) {
    const eStyle = getComputedStyle(ele);
    const rgb = hexToRGB(eStyle.getPropertyValue("--bg"));
    return rgb;
  }
  function getAllRGB(eles) {
    eles.forEach((e) => {
      allRGB.push(getColorHex(e));
    });
  }
  function getDiffRGB(rgbs) {
    getAllRGB(eles);
    rgbs.map((rgb, i, rgbs) => {
      if (!!rgbs[i + 1]) {
        diff.push({
          r: rgbs[i + 1].r - rgb.r,
          g: rgbs[i + 1].g - rgb.g,
          b: rgbs[i + 1].b - rgb.b,
        });
      }
    });
  }
  function getEleTopAndBottom(ele) {
    return {
      top: ele.offsetTop,
      bottom: ele.offsetTop + ele.offsetHeight,
      height: ele.offsetHeight,
    };
  }
  function getAlleTAB(eles) {
    if (eTAB.length > 0) {
      eTAB.length = 0;
    }
    eles.forEach((e) => {
      eTAB.push(getEleTopAndBottom(e));
    });
  }
  function setCurrentColor() {
    let Y = window.scrollY;
    if (Y >= tTop && Y <= tBottom) {
      eTAB.forEach((e, i, a) => {
        if (Y >= e.top && Y <= e.bottom) {
          if (i < a.length - 1) {
            let p = ((Y - e.top) / e.height).toPrecision(2);
            target.style.background = `rgb(${allRGB[i].r + diff[i].r * p},${
              allRGB[i].g + diff[i].g * p
            },${allRGB[i].b + diff[i].b * p})`;
          } else {
            target.style.background = `rgb(${allRGB[i].r},${allRGB[i].g},${allRGB[i].b})`;
          }
        }
      });
    }
  }
  function init() {
    //eventlistener
    window.addEventListener("load", () => {
      getDiffRGB(allRGB);
      getAlleTAB(eles);
      target.style.background = `rgb(${allRGB[0].r},${allRGB[0].g},${allRGB[0].b})`;
      setCurrentColor();
    });
    window.addEventListener("resize", () => {
      getAlleTAB(eles);
      setCurrentColor();
    });

    window.addEventListener("scroll", () => {
      setCurrentColor();
    });
  }

  return { init };
})();

scrollToChangeBgC.init();
