import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [response, setResponse] = useState();
  const fileInput = useRef();
  const onGet = () => {
    setResponse("");
    (async function() {
      setResponse(await fetchTest("GET"));
    })();
  };

  const onPost = () => {
    setResponse("");
    (async function() {
      setResponse(await fetchTest("POST"));
    })();
  };
  
  const onUpload = () => {
    setResponse("");
    (async function() {
      setResponse(await uploadFile(fileInput.current.files.item(0)));
    })();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

          <fieldset>
            <legend>Tests</legend>
            <ul>
              <li>                
                <button type="button" onClick={onGet}>GET</button>
              </li>
              <li>
                <button type="button" onClick={onPost}>POST</button>
              </li>
              <li>                
                <input type="file" ref={fileInput} />
                <button type="button" onClick={onUpload}>Upload</button>
              </li>          
            </ul>
          </fieldset>

          <fieldset>
            <legend>Result</legend>
            <span>{response}</span>
          </fieldset>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

async function fetchTest(method) {
  const response = await fetch("/bunk-url", {method: method});
  if(!response.ok) {
    return response.status;
  }
  return await response.text();
}

async function uploadFile(file) {
  const data = new FormData();
  data.append("test", file);
  const response = await fetch("/bunk-url", {method: "POST", body: data});
  console.log(response.ok);
  const responseText = await response.text();
  console.log(responseText);
  return responseText;
}
