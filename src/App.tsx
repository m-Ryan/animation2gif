import { useRef, useState } from 'react';
import { animationToGIF } from './lib/animationToGIF';
import './App.css';
import React from 'react';
import { dom2Svg, urlToImage, generateGif } from './lib';

function App() {
  const [url, setUrl] = useState<string>('');

  const onChange = (u: string) => {
    setUrl(u);
  };

  return (
    <div style={{ paddingTop: 100, paddingLeft: 100 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 30 }}>
          <TransformDemo onChange={onChange} />
        </div>
        <div style={{ marginRight: 30 }}>
          {/* <TypingDemo onChange={onChange} /> */}
        </div>
      </div>

      <div style={{ marginTop: 30 }}>{url && <img src={url} />}</div>
    </div>
  );
}

function TransformDemo({ onChange }: { onChange: (value: string) => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  const onTestAnimation = async () => {
    const container = ref.current;
    if (!container) return;
    setLoading(true);

    const arr = [
      'https://img14.360buyimg.com/n0/jfs/t1/192574/40/16263/485972/6107c93aE88ce7e93/bc1454f156e61432.png',
      'https://img14.360buyimg.com/n1/s546x546_jfs/t1/183840/13/17326/419956/6107c931E5d21808b/ea073fc4e9eb5311.png',
      'https://img14.360buyimg.com/n1/s546x546_jfs/t1/197241/22/3624/533264/611b505eEed189075/fce6864e6e7b4f05.png',
    ];

    const blobList = [];
    for (let i = 0; i < arr.length; i++) {
      const img = await urlToImage(
       await dom2Svg(container, {
          overwrite: [
            {
              selector: '.logo',
              attrs: {
                src:arr[i],
              },
            },
          ],
        })
      );
      blobList.push(img);
    }

    const gifBlob = await generateGif({
      images: blobList,
      perFrameTime: 1000,
    });

    const url = URL.createObjectURL(gifBlob);
    onChange(url);
    setLoading(false);
  };

  return (
    <div>
      <div ref={ref} onClick={onTestAnimation} className='App-header '>
        <img
          width={300}
          className="logo"
          crossOrigin='anonymous'
          src={
            'https://img14.360buyimg.com/n0/jfs/t1/192574/40/16263/485972/6107c93aE88ce7e93/bc1454f156e61432.png'
          }
          alt='logo'
        />
      </div>
      {loading && <div>loading...</div>}
    </div>
  );
}

function TypingDemo({ onChange }: { onChange: (value: string) => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const text = 'Typing effect for text';
  const onTestAnimation = async () => {
    const container = ref.current;
    if (!container) return;
    const ele = container.querySelector('.typing-effect') as HTMLElement;
    if (!ele) return;
    setLoading(true);
    const totalTime = 2000;
    const gifBlob = await animationToGIF(
      [
        {
          selector: '.typing-effect',
          keyframes: [
            {
              width: 0,
            },
            {
              width: `${text.length}ch`,
            },
          ],
          options: {
            duration: totalTime,
            easing: `steps(${text.length})`,
          },
        },
        {
          selector: '.typing-effect',
          keyframes: [
            {
              borderColor: '#000',
              offset: 0,
            },
            {
              borderColor: 'transparent',
              offset: 0.5,
            },
            {
              borderColor: '#000',
              offset: 1,
            },
          ],
          options: {
            duration: 500,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'steps(2)',
          },
        },
      ],
      {
        totalTime: totalTime,
        container: container,
        frames: 12,
        debug: true,
      }
    );
    const url = URL.createObjectURL(gifBlob);
    onChange(url);
    setLoading(false);
  };

  return (
    <div>
      <div
        onClick={onTestAnimation}
        ref={ref}
        style={{
          height: 100,
          display: 'flex',
          fontFamily: 'monospace',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <div
          className='typing-effect'
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontSize: '2em',
            width: `${text.length}ch`,
            borderRight: '3px solid #000',
          }}
        >
          {text}
        </div>
      </div>
      {loading && <div>loading...</div>}
    </div>
  );
}

export default App;
