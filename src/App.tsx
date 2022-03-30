import { useRef, useState } from 'react';
import logo from './logo.svg';
import html2canvas from 'html2canvas';
import './App.css';
import { camelCase, flatMap } from 'lodash';
import beautify from 'js-beautify'

function App() {
  const [url, setUrl] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);
  const imgRef =useRef<HTMLImageElement | null>(null);

  const openGif = () => {
    if (!imgRef.current) return
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(imgRef.current, 0, 0);
    canvas.toBlob(blob=> {
      if (!blob) return;
      window.open(URL.createObjectURL(blob))
    });
   
  }
  const onMakeGif = () => {
    if (!ref.current) return;
    ref.current.querySelector('.App-logo')?.classList.add('stop');
    // html2canvas(ref.current, {useCORS: true}).then((canvas) => canvas.toBlob((blob)=> {
    //   if (!blob) return;
    //   setUrl(URL.createObjectURL(blob))
    // }, 'png', 1));
    // console.log('ref.current', ref.current)
    const html = cloneNodeWithInlineStyle(ref.current).outerHTML.replace(/(<img.*?[^\/])\>/mg,'$1/>')

    setUrl(html);
    openGif()
  };



  return (
    <div style={{ display: 'flex' }}>
      <header onClick={onMakeGif} ref={ref} className='App-header'>
        111
        <img
        crossOrigin="anonymous"
          src={
            'https://easy-email-m-ryan.vercel.app/images/06ca521d-9728-4de6-a709-1b75a828bfc3-2a9b1224-3d71-43b8-b52f-e7cdcdc9107b.png'
          }
          className='App-logo'
          alt='logo'
        />
      </header>
      <div style={{ padding: 30 }}>

      <img ref={imgRef}   crossOrigin="anonymous"  width="300" height="150" src={`
data:image/svg+xml;charset=utf-8,<svg width="300" height="305" xmlns="http://www.w3.org/2000/svg"><foreignObject width="100%" height="100%"><body xmlns="http://www.w3.org/1999/xhtml">
${url}
</body></foreignObject></svg>
      `} />
        <svg width="300" height="305" xmlns="http://www.w3.org/2000/svg">
          <foreignObject width="100%" height="100%" dangerouslySetInnerHTML={{__html: `<body xmlns="http://www.w3.org/1999/xhtml">
${url}
</body>`}}></foreignObject></svg>
      </div>
    </div>
  );
}

const haveDirectionProperties = flatMap([
  'padding',
  'margin',
  'border',
].map(item=> [`${item}-top`, `${item}-right`, `${item}-bottom`, `${item}-left`]))

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
 ... haveDirectionProperties
]


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

export default App;
