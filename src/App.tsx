import { useRef, useState } from "react";
import { animationToGIF } from "./lib/animationToGIF";
import "./App.css";

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
          <TypingDemo onChange={onChange} />
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
    const ele = container.querySelector(".App-logo") as HTMLElement;
    if (!ele) return;
    setLoading(true);
    const totalTime = 1000;
    const gifBlob = await animationToGIF(
      [
        {
          selector: ".App-logo",
          keyframes: [
            {
              transform: "rotate(0deg)",
              borderRadius: "0%",
              backgroundColor: "red",
            },
            {
              transform: "rotate(360deg)",
              borderRadius: "50%",
              backgroundColor: "blue",
            },
          ],
          options: {
            duration: 500,
            iterations: 2,
          },
        },
        {
          selector: ".scaleText",
          keyframes: [
            {
              transform: "scale(1)",
              color: "red",
              offset: 0,
            },
            {
              transform: "scale(2)",
              color: "blue",
              offset: 0.5,
            },
            {
              transform: "scale(1)",
              color: "red",
              offset: 1,
            },
          ],
          options: {
            duration: 1000,
          },
        },
      ],
      {
        totalTime: totalTime,
        container: container,
        frames: 24,
      }
    );
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
          className="App-logo"
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


function WelcomeDemo({ onChange }: { onChange: (value: string) => void; }) {

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

        }}
      >
        <div className="background background0"></div>
        <div className="background background1"></div>
        <div className="background background2"></div>
        <div className="background background3"></div>
        <div className="background background4"></div>
        <div className="background background5"></div>
        <div className="background background6"></div>
        <div className="background background7"></div>
        <div className="criterion">
          <div className="text text0">W</div>
          <div className="text text1">e</div>
          <div className="text text2">l</div>
          <div className="text text3">c</div>
          <div className="text text4">o</div>
          <div className="text text5">m</div>
          <div className="text text6">e</div>
          <div className="text text7">: )</div>
          <div className="frame frame0"></div>
          <div className="frame frame1"></div>
          <div className="frame frame2"></div>
          <div className="frame frame3"></div>
          <div className="frame frame4"></div>
          <div className="frame frame5"></div>
          <div className="frame frame6"></div>
          <div className="frame frame7"></div>
          <div className="particle particle00"></div>
          <div className="particle particle01"></div>
          <div className="particle particle02"></div>
          <div className="particle particle03"></div>
          <div className="particle particle04"></div>
          <div className="particle particle05"></div>
          <div className="particle particle06"></div>
          <div className="particle particle07"></div>
          <div className="particle particle08"></div>
          <div className="particle particle09"></div>
          <div className="particle particle010"></div>
          <div className="particle particle011"></div>
          <div className="particle particle10"></div>
          <div className="particle particle11"></div>
          <div className="particle particle12"></div>
          <div className="particle particle13"></div>
          <div className="particle particle14"></div>
          <div className="particle particle15"></div>
          <div className="particle particle16"></div>
          <div className="particle particle17"></div>
          <div className="particle particle18"></div>
          <div className="particle particle19"></div>
          <div className="particle particle110"></div>
          <div className="particle particle111"></div>
          <div className="particle particle20"></div>
          <div className="particle particle21"></div>
          <div className="particle particle22"></div>
          <div className="particle particle23"></div>
          <div className="particle particle24"></div>
          <div className="particle particle25"></div>
          <div className="particle particle26"></div>
          <div className="particle particle27"></div>
          <div className="particle particle28"></div>
          <div className="particle particle29"></div>
          <div className="particle particle210"></div>
          <div className="particle particle211"></div>
          <div className="particle particle30"></div>
          <div className="particle particle31"></div>
          <div className="particle particle32"></div>
          <div className="particle particle33"></div>
          <div className="particle particle34"></div>
          <div className="particle particle35"></div>
          <div className="particle particle36"></div>
          <div className="particle particle37"></div>
          <div className="particle particle38"></div>
          <div className="particle particle39"></div>
          <div className="particle particle310"></div>
          <div className="particle particle311"></div>
          <div className="particle particle40"></div>
          <div className="particle particle41"></div>
          <div className="particle particle42"></div>
          <div className="particle particle43"></div>
          <div className="particle particle44"></div>
          <div className="particle particle45"></div>
          <div className="particle particle46"></div>
          <div className="particle particle47"></div>
          <div className="particle particle48"></div>
          <div className="particle particle49"></div>
          <div className="particle particle410"></div>
          <div className="particle particle411"></div>
          <div className="particle particle50"></div>
          <div className="particle particle51"></div>
          <div className="particle particle52"></div>
          <div className="particle particle53"></div>
          <div className="particle particle54"></div>
          <div className="particle particle55"></div>
          <div className="particle particle56"></div>
          <div className="particle particle57"></div>
          <div className="particle particle58"></div>
          <div className="particle particle59"></div>
          <div className="particle particle510"></div>
          <div className="particle particle511"></div>
          <div className="particle particle60"></div>
          <div className="particle particle61"></div>
          <div className="particle particle62"></div>
          <div className="particle particle63"></div>
          <div className="particle particle64"></div>
          <div className="particle particle65"></div>
          <div className="particle particle66"></div>
          <div className="particle particle67"></div>
          <div className="particle particle68"></div>
          <div className="particle particle69"></div>
          <div className="particle particle610"></div>
          <div className="particle particle611"></div>
          <div className="particle particle70"></div>
          <div className="particle particle71"></div>
          <div className="particle particle72"></div>
          <div className="particle particle73"></div>
          <div className="particle particle74"></div>
          <div className="particle particle75"></div>
          <div className="particle particle76"></div>
          <div className="particle particle77"></div>
          <div className="particle particle78"></div>
          <div className="particle particle79"></div>
          <div className="particle particle710"></div>
          <div className="particle particle711"></div>
        </div>
      </div>
      {loading && <div>loading...</div>}
    </div>
  );
}



export default App;
