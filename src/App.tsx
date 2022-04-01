import { useRef, useState } from "react";
import { animationToGIF } from "./lib/animationToGIF";
import "./App.css";
import React from 'react';
import { dom2Svg , base64ToImage, generateGif} from "./lib";

function App() {
  const [url, setUrl] = useState<string>("");

  const onChange = (u: string) => {
    setUrl(u);
  };

  return (
    <div style={{ paddingTop: 100, paddingLeft: 100 }}>
      <div style={{ display: "flex" }}>
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

function TransformDemo({ onChange }: { onChange: (value: string) => void; }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  const onTestAnimation = async () => {
    const container = ref.current;
    if (!container) return;
    setLoading(true);
   
    const count = 60;
    const blobList = [];
    for (let i = 0; i < count; i++) {
      const img =  await base64ToImage(dom2Svg(
        container,
        {
          overwrite: [
            {
              selector: ".scaleText",
              style: {
                color:'red'
              },
              innerText: `text: ${i}`
            }
          ]
        }
      ));
      blobList.push(img);
    }

    const gifBlob = await generateGif({
      images: blobList,
      perFrameTime: 1000,
    })

   
    const url = URL.createObjectURL(gifBlob);
    onChange(url);
    setLoading(false);
  };

  return (
    <div>
      <div ref={ref} onClick={onTestAnimation} className="App-header ">
        <h1 className="scaleText">Awesome GIF</h1>
        <img
          crossOrigin="anonymous"
          src={
            "https://easy-email-m-ryan.vercel.app/images/06ca521d-9728-4de6-a709-1b75a828bfc3-2a9b1224-3d71-43b8-b52f-e7cdcdc9107b.png"
          }
          className="logo"
          alt="logo"
        />
      </div>
      {loading && <div>loading...</div>}
    </div>
  );
}

function TypingDemo({ onChange }: { onChange: (value: string) => void; }) {

  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const text = 'Typing effect for text';
  const onTestAnimation = async () => {
    const container = ref.current;
    if (!container) return;
    const ele = container.querySelector(".typing-effect") as HTMLElement;
    if (!ele) return;
    setLoading(true);
    const totalTime = 2000;
    const gifBlob = await animationToGIF(
      [
        {
          selector: ".typing-effect",
          keyframes: [
            {
              width: 0
            },
            {
              width: `${text.length}ch`
            },
          ],
          options: {
            duration: totalTime,
            easing: `steps(${text.length})`,
          },
        },
        {
          selector: ".typing-effect",
          keyframes: [
            {
              borderColor: '#000',
              offset: 0
            },
            {
              borderColor: 'transparent',
              offset: 0.5
            },
            {
              borderColor: '#000',
              offset: 1
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
          display: "flex",
          fontFamily: 'monospace',
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: '#fff'
        }}
      >
        <div
          className="typing-effect"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontSize: "2em",
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
