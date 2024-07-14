export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const getErrorMessage = (code: string) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-email":
      return "The email address is invalid.";
    case "auth/weak-password":
      return "The password is too weak.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled.";
    case "auth/too-many-requests":
      return "You’ve tried logging in too many times. Please take a break and try again later.";
    case "auth/invalid-credential":
      return "Invalid Email/password";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

export const ResponseText = `It's impossible to definitively say which is "better" - **Gemini and ChatGPT are both large language models (LLMs) with different strengths and weaknesses.** They excel in different areas and have been trained on different data sets, leading to distinct capabilities. Here's a breakdown: **Gemini:** * **Strengths:** * **Multimodal:** It can process and generate text, code, images, audio, and video. This makes it incredibly versatile and capable of handling complex tasks. * **Advanced reasoning and problem-solving:** Gemini excels at complex reasoning and problem-solving tasks. It can understand context and apply logic to answer questions and complete tasks. * **More recent training data:** Gemini is trained on more recent data than ChatGPT, allowing it to access and process information from a broader range of sources. * **Weaknesses:** * **Limited public availability:** Gemini is currently in limited public beta, and access is restricted. * **Less mature than ChatGPT:** Being a newer model, Gemini is still under development and may not be as reliable or refined as ChatGPT in some areas. **ChatGPT:** * **Strengths:** * **Widely accessible:** ChatGPT is freely available and has a large user base. * **Mature and reliable:** It's been extensively tested and refined, making it a reliable tool for a variety of tasks. * **Strong text-based capabilities:** ChatGPT excels at generating creative text formats like poems, code, scripts, musical pieces, email, letters, etc. * **Weaknesses:** * **Limited to text:** ChatGPT is primarily a text-based model, limiting its capabilities compared to Gemini's multimodal nature. * **Limited reasoning and problem-solving:** While capable, ChatGPT's reasoning and problem-solving abilities are less advanced than Gemini's. * **Outdated information:** ChatGPT's knowledge cutoff is limited to its training data, which might not be up-to-date. **Ultimately, the best choice for you depends on your specific needs.** * **If you need a versatile model capable of working with various data types and tackling complex problems, Gemini is a strong contender.** * **If you require a reliable text-based model with wide accessibility, ChatGPT remains a solid option.** Both are powerful tools with different strengths, and the best choice depends on your specific requirements.`;

export const promptArray = [
  "Can you write some tips for keeping track of my daily home expenses?",
  "Can you please write grocery items under 5000 for a month?",
  "How can i reduce my electricity bills",
];
