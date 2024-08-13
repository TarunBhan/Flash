import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Text } from "../../Styles/index.styles";
import baseTheme from "../Theme/baseTheme";
import { ResponseText } from "../constant /constant";
import Input from "../Input/Input";
import LeftArrow from "../../Assets/Svg/LeftArrowIcon";
import {
  HeadingContainer,
  InputWrapper,
  RecentSection,
  SendButtonWrapper,
} from "./index.style";
import Loader from "./Loader";
import BottomSuggestionBar from "./SuggestedPrompt";
import Notes from "../Notes/Notes";

const GeminiAi = () => {
  const [text, setText] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [showPromtWritten, setShowPromtWritten] = useState<boolean>(false);
  const [hideSuggestion, setHideSuggestion] = useState<boolean>(true);
  const inputRef = useRef<any>();

  const apiKey = process.env.GEMINI_API_KEY!;

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDQ2yAH4OfvsQYoHlTGjlBtLj2Ub_4bMOQ"
  );

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setText((prev) => prev + nextWord);
    }, 100 * index);
    console.log("val>>>");
  };

  const handleAiResponse = (responseText: string) => {
    const response1 = responseText.split("**");
    let response2 = "";
    for (let i = 0; i < response1.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        response2 += response1[i];
      } else {
        response2 += "<b>" + response1[i] + "</b>";
      }
    }
    let formattedResponse = response2.split("*").join("</br>");
    let formattedResponse2 = formattedResponse?.split(" ");
    for (let i = 0; i < formattedResponse2.length; i++) {
      delayPara(i, formattedResponse2[i] + " ");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  function myFunction(event: any) {
    var x = event.code;
    if (x === "Enter") {
      letTheAiRun();
      setShowPromtWritten(true);
      setText("");
    }
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const letTheAiRun = async (promptText?: string) => {
    inputRef.current.value = "";
    setText("");
    const content = prompt !== "" ? prompt : promptText!;
    setHideSuggestion(false);
    setLoader(true);
    setShowPromtWritten(true);
    const result = await model.generateContent(content);
    const response = await result.response;
    const text = response.text();
    setLoader(false);
    handleAiResponse(text);
  };

  const setPromptCallBack = (promptText: string) => {
    setPrompt(promptText);
    letTheAiRun(promptText);
  };

  return (
    <div
      style={{
        height: "90%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        paddingInline: "18px",
      }}
    >
      <HeadingContainer>
        Benefit from{" "}
        <span style={{ color: "#009b7b" }}>AI-driven suggestions</span> and tips
        tailored to your spending habits and financial goals.
      </HeadingContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "90%",
          gap: 10,
        }}
      >
        {/* SideBar */}
        {/* <RecentSection
          style={{
            display: "flex",
            width: "30%",
            justifyContent: "center",
            borderRight: `1px solid ${baseTheme.colors.blacks[4]}`,
          }}
        >
          <h3>Recent </h3>
        </RecentSection> */}
        {/* chatSystem */}
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "330px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {hideSuggestion && (
              <BottomSuggestionBar callBack={setPromptCallBack} />
            )}
            <div
              style={{
                width: "80%",
                justifyContent: "center",
                overflow: "scroll",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {showPromtWritten && (
                <div
                  style={{
                    padding: "10px",
                    background: "#ebebeb",
                    borderRadius: "12px",
                    alignSelf: "end",
                  }}
                >
                  <Text>{prompt}</Text>
                </div>
              )}
              {loader && <Loader />}

              {text !== "" && (
                <p
                  style={{
                    overflow: "scroll",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                />
              )}
            </div>
          </div>

          {/* input */}
          <div
            style={{
              width: "100%",
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <InputWrapper
              style={{
                width: "80%",
                height: "49px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "row",
                background: baseTheme.colors.blacks[3],
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <input
                onChange={handleInputChange}
                ref={inputRef}
                disabled={loader}
                onKeyPress={myFunction}
                style={{
                  width: "80%",
                  height: "100%",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "transparent",
                  outline: "none",
                  paddingInline: "10px",
                }}
                placeholder="How Much Red Wine Cost,Which is the best fruit to eat?"
              />{" "}
              <SendButtonWrapper
                onClick={letTheAiRun as any}
                style={{
                  background: "rgb(0 86 255)",
                  height: "30px",
                  width: "30px",
                  borderRadius: "100px",
                  borderColor: "white",
                  border: "2px solid white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              >
                <LeftArrow width="15px" height={"15px"} />
              </SendButtonWrapper>
            </InputWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiAi;
