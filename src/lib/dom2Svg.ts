import { flatMap } from "lodash";

// canvas绘制图片元素方法
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')!;
const img2Base64 = function (img: InstanceType<typeof Image>) {

  const width = img.width, height = img.height;
  // canvas绘制
  canvas.width = width;
  canvas.height = height;
  // 画布清除
  context.clearRect(0, 0, width, height);
  // 绘制图片到canvas
  context.drawImage(img, 0, 0);
  return canvas.toDataURL();
};


const haveDirectionProperties = flatMap([
  'padding',
  'margin',
  'border',
].map(item => [`${item}-top`, `${item}-right`, `${item}-bottom`, `${item}-left`]));

const validKeys = [
  'color',
  'width',
  'height',
  'position',
  'color',
  'background',
  'background-color',
  'transform',
  'display',
  'font-size',
  'line-height',
  'flex-direction',
  'align-items',
  'justify-content',
  'text-align',
  'border-radius',
  'box-sizing',
  'opacity',
  'visibility',
  ...haveDirectionProperties
];

function cloneNodeWithInlineStyle(node: ChildNode) {
  const clone = node.cloneNode(true);
  if (!(clone instanceof HTMLElement && node instanceof HTMLElement))
    return clone;
  clone.removeAttribute('class');
  const style = window.getComputedStyle(node);
  validKeys.forEach((key) => {
    clone.style.setProperty(key, style.getPropertyValue(key));
  });


  clone.childNodes.forEach((child, i) => {
    clone.replaceChild(cloneNodeWithInlineStyle(node.childNodes[i]), child);
  });
  return clone;
}


export const dom2Svg = function (dom: HTMLElement, option: {
  width?: number;
  height?: number;
} = {}) {

  const width = option.width || dom.offsetWidth;
  const height = option.height || dom.offsetHeight;

  const cloneDom = cloneNodeWithInlineStyle(dom) as HTMLElement;
  cloneDom.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  cloneDom.classList.remove('outline');

  cloneDom.querySelectorAll('img').forEach(item => {
    item.src = img2Base64(item);
  });


  let htmlSvg = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '"><foreignObject x="0" y="0" width="100%" height="100%">' +
    new XMLSerializer().serializeToString(cloneDom) +
    '</foreignObject></svg>';

  htmlSvg = htmlSvg.replace(/\n/g, '').replace(/\t/g, '').replace(/#/g, '%23');

  return htmlSvg;
};